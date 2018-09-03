import React from 'react'
import { connect } from 'dva'
import l from './Users.less'
import cx from 'classnames';
import UsersComponent from '../components/Users'
import MainLayout from '../components/MainLayout/MainLayout'
// import Cropper from 'cropperjs'
// import 'cropperjs/dist/cropper.css'

import { Form, Input, Icon, Button, notification, Spin, essage, Modal, Row, Col, Tooltip } from 'antd';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

let uuid = 0;
class DynamicFieldSet extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    console.log(keys)
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'Passengers' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`name_${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            }],
          })(
            <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);




class Box extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };
  static defaultProps = {
    name: 'jeremy'
  };
  constructor(props) {
    super(props);
    this.state = {
      num : 1
    }
  }
  handle = () => {
    this.setState((prevState, props) => {
      console.log(prevState, props)
      return {num: prevState.num + 1}
    })
  }
  render() {
    const { num } = this.state;
    return (
      <div>
       {num}{this.props.name}
        <Button onClick={this.handle}>box</Button>
      </div>
    );
  }
}


function widthConnect(WrappedComponent, data) {
  class WithComponent  extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      }
    }
    componentDidMount() {
      this.setState({
        data: data
      })
    }
    noti = (msg) => {
      notification.error({
        message: `${msg}`
      })
    }

    render() {
      const { data } = this.state
      return <WrappedComponent data={data} error={this.noti} {...this.props}/>
    }
  }
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  WithComponent.displayName = `width_${getDisplayName(WrappedComponent)}`; //displayName 方便调试查找
  return WithComponent
  
}

class Noti extends React.Component {
  constructor(props) {
    super(props);
  }
  handle = () => {
    this.props.error('错误的信息')
  }
  render() {
    return (
      <div>
        <Button onClick={this.handle}>noti</Button>
      </div>
    );
  }
}

Noti = widthConnect(Noti, [1,2,3])




// let count = 0;
class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      spinning: false,
      SRC: null,
      iconType: 'file',
    }
  }
  static defaultProps = {
    loadFile: () => {},
    extendDom: <a>支持扩展名：.jpg .png</a>,
    type: "TEXT", 
    spin: true,
  }
  showIconType = (str) => {
    console.log(str)
    let temp = 'file';
    if (str.indexOf('image') !== -1) {
      temp = 'picture'
    }else if (str.indexOf('pdf') !== -1) {
      temp = 'file-pdf'
    }else if (str.indexOf('sheet') !== -1) {
      temp = 'file-excel'
    }
    return temp
  }
  handleFileChange = (e) => {
    const {type, loadFile} = this.props;
    const that = this;
    const file = e.target.files[0];
    if (typeof FileReader !== undefined) {
      const reader = new FileReader();
      if (type && type === 'URL') {
        reader.readAsDataURL(file);//发起异步请求
      }else{
        reader.readAsText(file,"utf-8");//发起异步请求
      }
      reader.onload = function(){
        // console.log("加载成功", file)
        if (type === 'URL') {
          if (file.type.indexOf('image') !== -1) {
            that.setState({
              SRC: this.result,
              iconType: that.showIconType(file.type),
              file
            }, () => loadFile(file))
          }else{
            notification.info({
              message: '文件格式不对，请重新上传！'
            })
          }
        }else{
          that.setState({
            file,
            iconType: that.showIconType(file.type)
          }, () => loadFile(file))
        }
      }
      reader.onloadstart = function(){
        that.setState({spinning: true})
        // console.log("开始加载")
      }
      reader.onloadend= function(){
        that.setState({spinning: false})
        // console.log("加载结束")
      }
      reader.onprogress = function(){
        // count++;
        // console.log("加载中"+count)
      }
    }else{
      console.log('浏览器不支持 FileReader')
      this.setState({
        file
      })
    }

  };
  render() {
    const { file, spinning, SRC, iconType } = this.state
    const { extendDom, type, spin } = this.props;
    return (
      <Spin tip="正在上传..." spinning={spin ? spinning : false}>
        <div className={l.file_upload}>
          {
            file ?
            <div className={l.wrapper}>
              {
                type === 'TEXT' ?
                <div className={l.wrapper_name}>
                  <Icon type={iconType} style={{fontSize: '18px', marginRight: '5px'}}/>
                  {file ? file.name : ''}
                </div>
                :
                <img src={SRC} className={l.wrapper_img} />
              }
              <div className={l.btnBox}>
                  <Button type="primary">重新上传</Button>
                  <form>
                    <input type='file'  onChange={this.handleFileChange.bind(this)}/>
                    <input type='reset' ref={(input) => this.reset=input} className={l.reset} />
                  </form>
              </div>
            </div>
            :
            <div className={l.wrapper}>
              <Icon className={l.wrapper_icons}  type="cloud-upload-o" /> 
              <p>点击或将文件拖拽到这里上传</p>
              {extendDom}
              <form>
                <input type='file'  onChange={this.handleFileChange.bind(this)}/>
                <input type='reset' ref={(input) => this.reset=input} className={l.reset} />
              </form>
            </div>
          }
        </div>
      </Spin>
    );
  }
}




class Avarts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SRC: '/images/yay.jpg',
      url: null,
      visible: true,
      udbool: true,
      lrbool: true
    }
  }


  handleFileChange = (e) => {
    const that = this;
    const file = e.target.files[0];
    if (typeof FileReader !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = function(){
        console.log("加载成功", file)
        
        if (file.type.indexOf('image') !== -1) {
          const dataRul = this.result
          that.setState({
            // SRC: this.result,
            visible: true
          }, () => {
            that.setState({
              SRC: dataRul
            })
          })
        }else{
          notification.info({
            message: '文件格式不对，请重新上传！'
          })
        }
       
      }
      reader.onloadstart = function(){
        // that.setState({spinning: true})
        // console.log("开始加载")
      }
      reader.onloadend= function(){
        // that.setState({spinning: false})
        // console.log("加载结束")
      }
      reader.onprogress = function(){
        // count++;
        // console.log("加载中"+count)
      }
    }else{
      console.log('浏览器不支持 FileReader')
    }
  }


  componentDidMount() {
    setTimeout(this.setCropper, 1000)
  }

  setCropper = () => {
    this.cropper = new Cropper(this.img, {
      viewMode: 1,
      autoCrop: true,
      aspectRatio: 1 / 1,
      preview: ".small",
      autoCropArea: 0.5,
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  blobToDataURL = (blob, callback) => {
      var a = new FileReader();
      a.onload = function (e) { callback(e.target.result); }
      a.readAsDataURL(blob);
  }
  handleOk = () => {
    // const imgs = this.cropper.getCropBoxData();
    const imgs = this.cropper.getCroppedCanvas();
    console.log(imgs)
    // this.setState({
    //   visible: false
    // })
    imgs.toBlob( (blob) => {
      this.blobToDataURL(blob, this.callback)
    })
  }
  callback = (data) => {
    this.setState({
      visible: false,
      url: data
    })
  }



  handleRotate = (type) => {
    console.log(type)
    this.cropper.rotate(type === 'left' ? -45 : 45)
  }

  handlePosition = (bool, type) => {
    console.log(type)
    if (type === 'ud') {
      this.cropper.scaleY(bool ? -1 : 1);
      this.setState({
        udbool: !bool
      })
    }else{
      this.cropper.scaleX(bool ? -1 : 1);
      this.setState({
        lrbool: !bool
      })
    }
  }
  render() {
    const { SRC, url, visible, udbool, lrbool } = this.state;
    return (
      <div>
        <div className={l.avartBox}>
          <div className={l.imgs}>
            {url && <img src={url} alt=""/>}
          </div>
          <form>
            <input type='file'  onChange={this.handleFileChange}/>
            <input type='reset' ref={(input) => this.reset=input} className={l.reset} />
          </form>
         {/*<Icon type="edit" className={l.editIcon} />*/}
        </div>


        <Modal
          visible={visible}
          width={900}
          maskClosable={false}
          closable={false}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          <div className={cx(l.modalBox)}>
            <div className={cx(l.priewImg)}>
              <div className={cx('small')}>
                
              </div>
            </div>
            <div className={cx(l.imgBox)}>
              {SRC && <img src={SRC} ref={(img) => this.img = img} alt=""/>}
              <div style={{padding: '10px 0'}}>
                <ButtonGroup >
                  <Tooltip title="左转45" placement="bottom"> 
                    <Button onClick={this.handleRotate.bind(null, 'left')} type="primary" icon="reload" className={cx('reload')} />
                  </Tooltip>
                  <Tooltip title="右转45" placement="bottom">
                    <Button onClick={this.handleRotate.bind(null, 'right')} type="primary" icon="reload" />
                  </Tooltip>
                </ButtonGroup>

                &nbsp;&nbsp;&nbsp;&nbsp;

                <ButtonGroup >
                  <Tooltip title="上下颠倒" placement="bottom"> 
                    <Button onClick={this.handlePosition.bind(null, udbool, 'ud')} type="primary" icon="swap" className={cx('swap')} />
                  </Tooltip>
                  <Tooltip title="左右颠倒" placement="bottom">
                    <Button onClick={this.handlePosition.bind(null, lrbool, 'lr')} type="primary" icon="swap" />
                  </Tooltip>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}


class Users extends React.Component {
  constructor(props) {
    super(props);
  }
  fileChange = (file) => {
    console.log(file, '11111')
  }
  render() {
    const {location} = this.props;
    return (
      <MainLayout location={location}>
        <Avarts />
        <div>
          <Box name="jeremy"/>
          <Noti {...this.props} />
        </div>

        <FileUpload loadFile={this.fileChange} spin={false}/>
      </MainLayout>
    );
  }
}
const mapState = state => {
  const { user: {page} } = state;
  return {
    page,
  }
}

export default connect(mapState)(Users)
