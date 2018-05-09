import React from 'react' // PureComponent
import { Layout, Tabs } from 'antd'
import { Route, Switch, Link, Redirect, Prompt, NavLink } from 'dva/router'
import l from './Demo.less'
const TabPane = Tabs.TabPane
const { Content, Sider } = Layout

export class Home extends React.Component {
  // 构造函数 class 创建的组件不会自动帮我们绑定作用域，一种是在方法中绑定this，二是在构造函数中绑定this 三是es7箭头函数自动绑定this
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    const { match } = this.props
    console.log(this.props, '-----')
    const arr = [
      { name: '员工列表', link: 'list' },
      { name: '组织架构', link: 'org' },
      { name: '岗位管理', link: 'mng' }
    ]
    return (
      <Layout style={{ overflowY: 'auto' }}>
        <Sider width={200} style={{ color: '#fff', paddingTop: '10px' }}>
          {
            arr.map((item, index) => {
              return (
                <NavLink activeClassName={l.actives} className={l.link} key={index} to={`${match.url}/${item.link}`}>{item.name}</NavLink>
              )
            })
          }
        </Sider>
        <Layout style={{ padding: '5px' }}>
          <Content style={{ background: '#fff' }}>
            <div style={{ overflowY: 'auto', height: '100%' }}>
              {/* <Route path='/lay/home' exact render={() => <Redirect to='/lay/home/list' />}/>  会导致走两遍上面的打印  */}
              <Route path='/lay/home/list' render={() => <span>list</span>} />
              <Route path='/lay/home/org' render={() => <span>org</span>} />
              <Route path='/lay/home/mng' exact render={() => <span>mng</span>} />
              <Route path='/lay/home/mng/:id' render={(props) => <span>mng                                                                                                                                                                                                          {props.match.params.id}</span>} />
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export class Manage extends React.Component {
  // 构造函数 class 创建的组件不会自动帮我们绑定作用域，一种是在方法中绑定this，二是在构造函数中绑定this 三是es7箭头函数自动绑定this
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    const { match } = this.props
    const arr = [
      { name: '销售管理', link: 'sale' },
      { name: '生产管理', link: 'product' },
      { name: '采购管理', link: 'bug' }
    ]
    return (
      <Layout style={{ overflowY: 'auto' }}>
        <Sider width={200} style={{ color: '#fff', paddingTop: '10px' }}>
          {
            arr.map((item, index) => {
              return (
                <NavLink activeClassName={l.actives} className={l.link} key={index} to={`${match.url}/${item.link}`}>{item.name}</NavLink>
              )
            })
          }
        </Sider>
        <Layout style={{ padding: '5px' }}>
          <Content style={{ background: '#fff' }}>
            <div style={{ overflowY: 'auto', height: '100%' }}>
              <Route path='/lay/manage' exact render={() => <Redirect to='/lay/manage/sale' />} />
              <Route path='/lay/manage/sale' render={() => <span>sale</span>} />
              <Route path='/lay/manage/product' render={() => <span>product</span>} />
              <Route path='/lay/manage/bug' render={() => <span>bug</span>} />
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export class Setting extends React.Component {
  // 构造函数 class 创建的组件不会自动帮我们绑定作用域，一种是在方法中绑定this，二是在构造函数中绑定this 三是es7箭头函数自动绑定this
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    const { match } = this.props
    const arr = [
      { name: '考勤设置', link: 'att' },
      { name: '系统设置', link: 'sys' }
    ]
    return (
      <Layout style={{ overflowY: 'auto' }}>
        <Sider width={200} style={{ color: '#fff', paddingTop: '10px' }}>
          {
            arr.map((item, index) => {
              return (
                <NavLink activeClassName={l.actives} className={l.link} key={index} to={`${match.url}/${item.link}`}>{item.name}</NavLink>
              )
            })
          }
        </Sider>
        <Layout style={{ padding: '5px' }}>
          <Content style={{ background: '#fff' }}>
            <div style={{ overflowY: 'auto', height: '100%' }}>
              <Route path='/lay/setting' exact render={() => <Redirect to='/lay/setting/att' />} />
              <Route path='/lay/setting/att' render={() => <span>att</span>} />
              <Route path='/lay/setting/sys' render={() => <span>sys</span>} />
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
