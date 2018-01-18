import React from 'react' // PureComponent
import { Layout } from 'antd'
import l from './IndexPage.less'

const { Content, Sider } = Layout

class Son extends React.Component {
  // 构造函数 class 创建的组件不会自动帮我们绑定作用域，一种是在方法中绑定this，二是在构造函数中绑定this 三是es7箭头函数自动绑定this
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div>
        son 666 {this.props.name}
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
  handleClick = () => {
    this.setState({
      a: 1
    })
  }
  render () {
    // const { location } = this.props
    // const { a } = this.state
    console.log('render App!')
    return (
      <Layout className={l.home}>
        <div className={l.header}>header----</div>
        <Layout style={{ overflowY: 'auto' }}>
          <Sider width={200} style={{ color: '#fff', paddingTop: '10px' }}>
            <p>hahah</p>
            <p>hahah</p>
            <p>hahah</p>
            <p>hahah</p>
            <p>hahah</p>
            <p>hahah</p>
            <Son />
          </Sider>
          <Layout style={{ padding: '5px' }}>
            <Content style={{ background: '#fff' }}>
              <div style={{ overflowY: 'auto', height: '100%' }}>
                {
                        ['', '', '', '', '', '', '', '', '', '', '', ''].map((item, index) => {
                          return (
                            <div key={index} style={{ height: 200, background: '#ccf' }}>
                              {index}
                            </div>
                          )
                        })
                      }
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Lay
