import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'dva'
import cx from 'classnames';
import styles from './IndexPage.css'
import l from './IndexPage.less'
import MainLayout from '../components/MainLayout/MainLayout'
import _ from 'lodash'
import { Button, InputNumber, Input, Table, Popconfirm, Upload, Icon } from 'antd'

import {Collapse, UnmountClosed} from 'react-collapse';
import { getMessage, postMessage, delMessage, uploaderFile } from '../services/example'

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



function IndexPage ({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to JEREMY!</h1>
        {/* <div className={styles.welcome} /> */}
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        </ul>
        <div className={l.txt}>
          666
        </div>
        <Test />
      </div>
    </MainLayout>
  )
}


export default connect()(IndexPage)
