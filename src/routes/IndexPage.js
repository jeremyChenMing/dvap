import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'dva'
import cx from 'classnames';
import styles from './IndexPage.css'
import l from './IndexPage.less'
import MainLayout from '../components/MainLayout/MainLayout'
import _ from 'lodash'
import moment from 'moment'
import { Button, InputNumber, Input, Table, Popconfirm, Upload, Icon, Modal, Form, Select } from 'antd'

import {Collapse, UnmountClosed} from 'react-collapse';
import { getMessage, postMessage, delMessage, uploaderFile, getLocals, delLocals, postLocals, putLocals, tt  } from '../services/example'

const FormItem = Form.Item;
const Option = Select.Option;

class Test extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      dataSource: [],
      loading: false,
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      }],
      str : '[{"name":"部门","value":"公司领导"},{"name":"人数","value":"1"},{"name":"任职状态","value":"正常"},{"name":"月薪小计","value":"13500"},{"name":"基本工资","value":"3500"},{"name":"岗位工资","value":"9300"},{"name":"补贴","value":"700"},{"name":"职称津贴","value":"200"},{"name":"加班工资","value":"0"},{"name":"未出勤扣款","value":"0"},{"name":"迟到扣款","value":"0"},{"name":"外业津贴","value":"280"},{"name":"其他补款","value":"0"},{"name":"其他扣款","value":"0"},{"name":"养老（个人）","value":"360"},{"name":"医疗（个人）","value":"90"},{"name":"失业（个人）","value":"22.50"},{"name":"公积金（个人）","value":"540"},{"name":"应税额","value":"12967.50"},{"name":"税率","value":"0.25"},{"name":"速算扣除数","value":"1005"},{"name":"纳税","value":"1361.88"},{"name":"其他↵应扣款","value":"0"},{"name":"工伤（公司）","value":"18"},{"name":"生育（公司）","value":"22.50"},{"name":"养老（公司）","value":"855"},{"name":"失业（公司）","value":"22.50"},{"name":"医疗（公司）","value":"270"},{"name":"五险小计","value":"1188"},{"name":"公积金（公司）","value":"540"},{"name":"人工成本小计","value":"15708"},{"name":"应出勤","value":"22"},{"name":"实出勤","value":"22"},{"name":"平时加班","value":"0"},{"name":"周末加班","value":"0"},{"name":"法定节假日加班","value":"0"},{"name":"病假","value":"0"},{"name":"事假","value":"0"},{"name":"调休","value":"0"},{"name":"年假","value":"0"},{"name":"婚假","value":"0"},{"name":"丧假","value":"0"},{"name":"产假/陪产假","value":"0"},{"name":"迟到↵（15分钟内）","value":"0"},{"name":"早退↵（M）","value":"0"},{"name":"旷工","value":"0"},{"name":"缺勤（因入离职）","value":"0"},{"name":"产检假","value":"0"},{"name":"转正当月试用期天数","value":"0"},{"name":"入离职及转正日期","value":"0"},{"name":"备注","value":"0"}]',
      arr : [
        {"name":"部门","value":"公司领导"},
        {"name":"人数","value":"1"},
        {"name":"任职状态","value":"正常"},
        {"name":"月薪小计","value":"13500"},
        {"name":"基本工资","value":"3500"},
        {"name":"岗位工资","value":"9300"},
        {"name":"补贴","value":"700"},
        {"name":"职称津贴","value":"200"},
        {"name":"加班工资","value":"0"},
        {"name":"未出勤扣款","value":"0"},
        {"name":"迟到扣款","value":"0"},
        {"name":"外业津贴","value":"280"},
        {"name":"其他补款","value":"0"},
        {"name":"其他扣款","value":"0"},
        {"name":"养老（个人）","value":"360"},
        {"name":"医疗（个人）","value":"90"},
        {"name":"失业（个人）","value":"22.50"},
        {"name":"公积金（个人）","value":"540"},
        {"name":"应税额","value":"12967.50"},
        {"name":"税率","value":"0.25"},
        {"name":"速算扣除数","value":"1005"},
        {"name":"纳税","value":"1361.88"},
        {"name":"其他↵应扣款","value":"0"},
        {"name":"工伤（公司）","value":"18"},
        {"name":"生育（公司）","value":"22.50"},
        {"name":"养老（公司）","value":"855"},
        {"name":"失业（公司）","value":"22.50"},
        {"name":"医疗（公司）","value":"270"},
        {"name":"五险小计","value":"1188"},
        {"name":"公积金（公司）","value":"540"},
        {"name":"人工成本小计","value":"15708"},
        {"name":"应出勤","value":"22"},
        {"name":"实出勤","value":"22"},
        {"name":"平时加班","value":"0"},
        {"name":"周末加班","value":"0"},
        {"name":"法定节假日加班","value":"0"},
        {"name":"病假","value":"0"},
        {"name":"事假","value":"0"},
        {"name":"调休","value":"0"},
        {"name":"年假","value":"0"},
        {"name":"婚假","value":"0"},
        {"name":"丧假","value":"0"},
        {"name":"产假/陪产假","value":"0"},
        {"name":"迟到↵（15分钟内）","value":"0"},
        {"name":"早退↵（M）","value":"0"},
        {"name":"旷工","value":"0"},
        {"name":"缺勤（因入离职）","value":"0"},
        {"name":"产检假","value":"0"},
        {"name":"转正当月试用期天数","value":"0"},
        {"name":"入离职及转正日期","value":"0"},
        {"name":"备注","value":"0"}
      ]

    }
  }
  click = () => {
    this.setState({
      open: !this.state.open
    })
  }
  getList = async () => {
    this.setState({loading: true})
    try{
      const result = await getMessage()
      this.setState({loading: false})
      if (result && result.code) {

      }else{
        this.setState({
          dataSource: result.items
        })
      }
    }catch(err) {
      console.log(err)
    }
  }
  
  componentDidMount() {
    // this.getList()
  }
  handle = () => {
    postMessage({name: 'koa', phone: 12312312, addr: 'lkskdjjll', id: 3}).then( data => {
      console.log(data)
      this.getList()
    })
  }
  renderAction = (text, record, index) => {
    return <span>
      <a href="javascript:;">编辑</a>
      <span className="ant-divider" />
      <Popconfirm title="确认删除吗？" onConfirm={this.del.bind(null, record)}>
        <a href="javascript:;">删除</a>
      </Popconfirm>
    </span>
  }
  del = async(record) => {
    console.log(record)
    try{
      const result = await delMessage(record.id)
      if (result && result.code) {

      }else{
        this.getList()
      }
    }catch(err) {
      console.log(err)
    }
  }
  changeFile = (e) => {
    uploaderFile({file: e.target.files[0]}).then( data => {
      console.log(data)
    })
  }


  handle = () => {
    // console.log(this.state.str)
    console.log(JSON.parse(this.state.str))
  }
  handleChange = (info) => {
    console.log(info)
    let fileList = info.fileList;

    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.data.url;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        // return file.response.status === 'success';
        return file.response.success;
      }
      return true;
    });
    console.log(fileList)
    this.setState({ fileList });
  }
  render() {
    const { open } = this.state;
    const columns = [
      {title: '序号', dataIndex: 'num', key: 'num', render: (text, record, index) => <span>{index + 1}</span>},
      {title: '名称', dataIndex: 'name', key: 'name'},
      {title: '电话', dataIndex: 'phone', key: 'phone'},
      {title: '地址', dataIndex: 'addr', key: 'addr'},
      {title: '操作', dataIndex: 'action', key: 'action',render: this.renderAction}
    ]
    const option = {
      action: '/api/upload',
      // action: '//jsonplaceholder.typicode.com/posts/',
      onChange: this.handleChange,
      multiple: true,
    };
    return(
      <div>
        <Upload {...option} fileList={this.state.fileList}>
          <Button>
            <Icon type="upload" /> upload
          </Button>
        </Upload>
        <Button onClick={this.handle}>调试</Button>
        <input type="file" onChange={this.changeFile}/>
        <Table rowKey={record => record.id} columns={columns} dataSource={this.state.dataSource} loading={this.state.loading} />
        <Button onClick={this.click}>open</Button>
        <Button onClick={this.handle}>请求</Button>
        <Collapse isOpened={false}>
          <div>Random content</div>
          <div>Random content</div>
          <div>Random content</div>
          <div>Random content</div>
          <div>Random content</div>
          <div>Random content</div>
        </Collapse>



        <UnmountClosed isOpened={open} fixedHeight={100} springConfig={{stiffness: 100, damping: 20}}>
          <div>Randomt</div>
          <div>Randomt</div>
          <div>Randomt</div>
          <div>Randomt</div>
          <div>Randomt</div>
          <div>Randomt</div>
          <div>Randomt</div>
          <div>Randomt</div>
        </UnmountClosed>
        <div id="foo" className="foo"> Foo </div>
        <div id="bar" className="bar"> Bar </div>
      </div>
    )
  }
}



import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

class ImagesComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'show'
    }
  }

  componentDidMount() {
    const image = document.getElementById('image');
    this.cropper = new Cropper(image, {
      viewMode: 1,
      autoCrop: false,
      aspectRatio: 16 / 9,
      preview: ".small",
      autoCropArea: 0.5,
      // background: false,
      crop(event) {
        // console.log(event.detail.x);
        // console.log(event.detail.y);
        // console.log(event.detail.width);
        // console.log(event.detail.height);
        // console.log(event.detail.rotate);
        // console.log(event.detail.scaleX);
        // console.log(event.detail.scaleY);
        // console.log(event)
      },
    });
  }
  handle = (type) => {
    // let temp = null
    // if (type == 'show') {
    //   temp = 'close'
    //   this.cropper = new Cropper(this.img, {
    //     aspectRatio: 16 / 9
    //   })
    // }else if (type == 'close') {
    //   temp = 'show'
    //   this.cropper.destroy()
    // }
    // this.setState({
    //   type: temp
    // })
  }


  getsImg = () => {
    // const imgs = this.cropper.getImageData();
    const imgs = this.cropper.getCropBoxData();
    console.log(imgs)
  }


  change = () => {
    this.cropper.rotate(10)
  }
  render() {
    const { type } = this.state;
    return (
      <div>
        <Button onClick={this.handle.bind(null, type)}>{type}</Button>
        <Button onClick={this.getsImg}>获取</Button>
        <Button onClick={this.change}>变化</Button>
        <div className={l.imgBox}>
          <img id="image" ref={(img) => this.img = img} src="/images/yay.jpg" />
        </div>
        <div className={cx(l.priewImg, 'small')}></div>
      </div>
    );
  }
}

class Ok extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}



class Back extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      visible: false,
      title: 'add'
    }
  }
  locals = async() => {
    try{
      const result = await getLocals();
      if (result && !result.code) {
        this.setState({
          list: result.items
        })
      }
    }catch(err) {
      console.log(err)
    }
  }
  componentDidMount() {
    // this.locals()
    // setInterval(this.getCode, 5000)
    this.getCode()
  }
  getCode = async() => {
    const data = [
      'https://www.51bricks.com',
      'https://www.51bricks.com/#/us',
      'https://www.51bricks.com/#/main/hot',
      'https://www.51bricks.com/#/main/view',
      'https://www.51bricks.com/#/main/author',
      'https://www.51bricks.com/#/person/203',
      'https://www.51bricks.com/#/main/detail?id=24',
    ]

    try{
      const result = await tt(data.join('\n'));
      console.log(result)
      if (result && !result.code) {
        
      }
    }catch(err) {
      console.log(err)
    }
  }
  renderAction = (text, record, index) => {
    return <span>
      <a href="javascript:;" onClick={this.edit.bind(null, record)}>编辑</a>
      <span className="ant-divider" />
      <Popconfirm title="确认删除吗？" onConfirm={this.del.bind(null, record)}>
        <a href="javascript:;">删除</a>
      </Popconfirm>
    </span>
  }
  edit = (record) => {
    this.setState({
      visible: true,
      title: 'edit',
      id: record.id
    },() => {
      this.props.form.setFieldsValue({
        title: record.title,
        content: record.content,
      });  
    })
    
  }
  del = async(record) => {
    try{
      const result = await delLocals(record.id)
      if (result && !result.code) {
        this.locals()
      }
    }catch(err){
      console.log(err)
    }
  }

  show = () => {
    this.props.form.resetFields()
    this.setState({
      visible: true,
      title: 'add'
    })
  }
  cancle = () => {
    this.setState({
      visible: false,
      id: ''
    })
  }
  handleSubmit = (e) => {
    const { title, id } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (title === 'add') {
          postLocals(values).then( data => {
            if (data && !data.code) {
              this.setState({
                visible: false,
                id: ''
              }, this.locals)
            }
          }).catch(err => {
            console.log(err)
          })  
        }else{
          // 编辑
          putLocals(id, values).then(data => {
            console.log(data, '8******8')
            if (data && !data.code) {
              this.setState({
                visible: false,
                id: ''
              }, this.locals)
            }
          })
        }
        
      }
    });
  }


  change = (value,e) => {
    console.log(value)
    // console.log(e)
  }
  selectf = (value, options) => {
    // console.log(options)
  }
  clickIcon = () => {
    console.log('Icon===')
  }
  render() {
    const { visible, title} = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {title: '序号', dataIndex: 'num', key: 'num', render: (text, record, index) => <span>{index + 1}</span>},
      {title: '名称', dataIndex: 'title', key: 'title'},
      {title: '内容', dataIndex: 'content', key: 'content'},
      {title: '时间', dataIndex: 'create_time', key: 'create_time', render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')},
      {title: '操作', dataIndex: 'action', key: 'action',render: this.renderAction}
    ]
    return (
      <div>
        <Table rowKey={record => record.id} columns={columns} dataSource={this.state.list} />
        <Button onClick={this.show} type="primary">添加</Button>
        
        <Select onChange={this.change} onSelect={this.selectf}style={{ width: 120 }} allowClear>
          <Option value="1">Lucy111  <Icon onClick={this.clickIcon} type="close-circle-o" /></Option>
          <Option value="2">Lucy222 <Icon type="close-circle-o" /></Option>
          <Option value="3">Lucy333 <Icon type="close-circle-o" /></Option>
        </Select>


        <Modal visible={visible} title={title === 'add' ? '添加' : '编辑'} footer={null} onCancel={this.cancle}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="名称" >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '必填项！',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="内容" >
              {getFieldDecorator('content', {
                rules: [{
                  required: true, message: '必填项！',
                }],
              })(
                <Input type="textarea" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">确定</Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
const WrappedRegistrationForm = Form.create()(Back);

function IndexPage ({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        {/*<WrappedRegistrationForm />
         <div className={styles.welcome} /> 
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        </ul>
        <div className={l.txt}>
          666
        </div>
        <Test />
        <ImagesComponents />
        */}
        
      </div>
    </MainLayout>
  )
}


@connect(({example}) => (
  example
))

class IndexPages extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // const xml = new XMLHttpRequest()
    // xml.open('GET','http://127.0.0.1:8000/blog/example', true)
    // xml.onreadystatechange = function () {
    //   if (xml.readyState === 4) {
    //     if (xml.status === 200) {
    //       console.log(JSON.parse(xml.responseText))
    //     }
    //   }
    // }
    // xml.send(null)
  }
  render() {
    const { page } = this.props;
    console.log(this.props)
    return (
      <MainLayout location={this.props.location}>
        <div className={styles.normal}>
          132323
          page: {page}
        </div>
      </MainLayout>
    );
  }
}

export default IndexPages

