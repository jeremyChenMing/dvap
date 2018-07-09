import React from 'react' // PureComponent
import { Layout } from 'antd'
import {
  Route,
  Switch,
  // Link,
  Redirect,
  // Prompt,
  NavLink
} from 'dva/router'
import {
  Home,
  Manage,
  Setting
} from './Demo'
import l from './IndexPage.less'
// const { Content } = Layout

class Son extends React.Component {
  // 构造函数 class 创建的组件不会自动帮我们绑定作用域，一种是在方法中绑定this，二是在构造函数中绑定this 三是es7箭头函数自动绑定this
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  handle = () => {
    console.log('123')
  }
  del = () => {
    document.location.href = '/'
  }
  render () {
    return (
      <div onClick={this.handle}>
        son 666 {this.props.name} {this.props.match.params.id}
        <p>{this.props.match.url}</p>
        <p onClick={this.del}>{this.props.match.path}</p>
        {/* <Prompt  message="数据尚未保存，确定离开？" /> */}
      </div>
    )
  }
}
Son.propTypes = {
  // es6
  name: React.PropTypes.string
}

Son.defaultProps = {
  // es6
  name: 'jeremy'
}

class Pravite extends React.Component {
  // 构造函数 class 创建的组件不会自动帮我们绑定作用域，一种是在方法中绑定this，二是在构造函数中绑定this 三是es7箭头函数自动绑定this
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div>
        Pravite ---
      </div>
    )
  }
}

class HeaderNav extends React.Component {
  render () {
    const navs = [
      {link: '/lay/home/list', name: '首页'},
      {link: '/lay/manage/sale', name: '业务管理'},
      {link: '/lay/setting/att', name: '设置'}
    ]
    return (
      <div className={l.navs}>
        {
          navs.map((item, index) => {
            return (
              <NavLink key={index} to={item.link} className={l.nav} activeClassName={l.headActive}>{item.name}</NavLink>
            )
          })
        }
      </div>
    )
  }
}

class Lay extends React.Component {
  static defaultProps = {
    // es7
  };
  static propTypes = {
    // es7  es6写在外侧
  };
  state = {
    a: 0
  };

  render () {
    const { location, match, history } = this.props //eslint-disable-line
    const PrivateRoute = ({ component: Component, match, ...rest }) => { // ...props  ==  computedMatch location path
      // console.log(rest, '#######')
      return (
        <Route {...rest} render={(props) => this.renderTabPane(Component, match, props)} />
      )
    }

    const Homes = (props) => {
      console.log(props)
      return (
        <div>
          <Route path={`${props.computedMatch.path}/list`} render={() => <span>123123</span>} />
        </div>
      )
    }

    return (
      <Layout className={l.home}>
        <div className={l.header}>
          <Pravite />
          <HeaderNav />
        </div>
        <Switch>
          <Route path='/lay/home' component={Home} />
          <Route path='/lay/manage' component={Manage} />
          <Route path='/lay/setting' component={Setting} />
          <Homes />
          {/**/} <Route path='/lay/setting' exact render={() => <Redirect to='/lay/setting/0' />} />
          <PrivateRoute path={`/lay/setting/:name`} match={match} component={Pravite} />
        </Switch>
      </Layout>
    )
  }
}

export default Lay
