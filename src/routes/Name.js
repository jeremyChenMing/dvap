import React from 'react'
import { connect } from 'dva'
import { Button, Row, Col, Table, TreeSelect, notification } from 'antd'
import { reduxForm } from 'redux-form'
import cx from 'classnames'
import { routerRedux } from 'dva/router'
import l from './Name.less'
import MainLayout from '../components/MainLayout/MainLayout'
// import fetch from 'dva/fetch'
import InputField from './InputField'
import ScrollReveal from 'scrollreveal'
const TreeNode = TreeSelect.TreeNode
const lists = {
  item: [
    {
      uuid: '931739710bb84f26b3564a3ca0d3b95d',
      name: '想多',
      mobile: '13800000001',
      sale_amount_finish_percent_total: '2.00',
      area_list: [
        {
          detail_area_uuid: '991e4c75d612451784b4703aa6106ef9',
          name: '足丰',
          sale_amount_budget: '33.00',
          no_tax_sale_price_budget: '54.00',
          sale_budget_proportion: '12.0000',
          sale_amount_actual: '10.00',
          no_tax_sale_price_actual: '32.00',
          sale_amount_finish_percent: '22.00'
        }
      ]
    }, {
      uuid: '931739710bb84f26b3564a3ca0d3b95d',
      name: '中山',
      mobile: '13800000001',
      sale_amount_finish_percent_total: '2.00',
      area_list: [
        {
          detail_area_uuid: '991e4c75d612451784b4703aa6106ef9',
          name: '足丰',
          sale_amount_budget: '33.00',
          no_tax_sale_price_budget: '54.00',
          sale_budget_proportion: '12.0000',
          sale_amount_actual: '10.00',
          no_tax_sale_price_actual: '32.00',
          sale_amount_finish_percent: '22.00'
        }, {
          detail_area_uuid: '991e4c75d612451784b4703aa6106ef9',
          name: '足丰1',
          sale_amount_budget: '33.00',
          no_tax_sale_price_budget: '54.00',
          sale_budget_proportion: '12.0000',
          sale_amount_actual: '10.00',
          no_tax_sale_price_actual: '32.00',
          sale_amount_finish_percent: '22.00'
        }, {
          detail_area_uuid: '991e4c75d612451784b4703aa6106ef9',
          name: '足丰2',
          sale_amount_budget: '33.00',
          no_tax_sale_price_budget: '54.00',
          sale_budget_proportion: '12.0000',
          sale_amount_actual: '10.00',
          no_tax_sale_price_actual: '32.00',
          sale_amount_finish_percent: '22.00'
        }
      ]
    }, {
      uuid: '3a9f8f5912ab493bb26915e63308c6db',
      name: '陈坤',
      mobile: '13800000002',
      sale_amount_finish_percent_total: '23.00',
      area_list: [
        {
          detail_area_uuid: '991e4c75d612451784b4703aa6106ef9',
          name: '足丰熟料',
          sale_amount_budget: '12.00',
          no_tax_sale_price_budget: '11.00',
          sale_budget_proportion: '10.0000',
          sale_amount_actual: '90.00',
          no_tax_sale_price_actual: '10.00',
          sale_amount_finish_percent: '0.00'
        },
        {
          detail_area_uuid: 'b666f3adace540be8e36d207b9fbd4ff',
          name: '龙团',
          sale_amount_budget: '10.00',
          no_tax_sale_price_budget: '90.00',
          sale_budget_proportion: '34.0000',
          sale_amount_actual: '11.00',
          no_tax_sale_price_actual: '8.00',
          sale_amount_finish_percent: '3.00'
        }
      ]
    }, {
      uuid: '931739710bb84f26b3564a3ca0d3b95d',
      name: '夏雨',
      mobile: '13800000001',
      sale_amount_finish_percent_total: '2.00',
      area_list: [
        {
          detail_area_uuid: '991e4c75d612451784b4703aa6106ef9',
          name: '足丰熟料',
          sale_amount_budget: '33.00',
          no_tax_sale_price_budget: '54.00',
          sale_budget_proportion: '12.0000',
          sale_amount_actual: '10.00',
          no_tax_sale_price_actual: '32.00',
          sale_amount_finish_percent: '22.00'
        }
      ]
    }
  ]
}


class ImagesTurn extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      // pos: [{"left":77,"top":20},{"left":336,"top":55},{"left":595,"top":20}]
      pos: ['pic1', 'pic2', 'pic3']
    }
  }
  next = () => {
    const shifts = this.state.pos.shift()
    this.state.pos.push(shifts);
    this.setState({})
  }
  prev = () => {
    const shifts = this.state.pos.pop()
    this.state.pos.unshift(shifts);
    this.setState({})
  }
  link = (item, index) => {
    console.log(index, item)
    if (item === 'pic1') {
      this.next()
    }else if (item === 'pic3') {
      this.prev()
    }
  }
  render() {
    return (
      <div className={cx(l.imgageBox)}>
        <Button onClick={this.prev}>上一步</Button>
        <Button onClick={this.next}>下一步</Button>
        <ul className={cx(l.znsRotatePic)}>
          {
            this.state.pos.map( (item,index) => {
              return(
                <li key={index} className={cx(l[item])} onClick={this.link.bind(null, item, index)}>
                  <a href="javascript:;" className={cx(l.con)}>{index + 1}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}



class Name extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '66',
      orgValue: [],
      list: []
    }
  }

  componentDidMount () {

    document.oncontextmenu=new Function("event.returnValue=false"); 
    document.onselectstart=new Function("event.returnValue=false"); 
    // console.log('123123', lists)
    // fetch('/dogs', {
      // method: 'POST',
      // data: { dog: '666' },
      // mode: 'cors',
      // credentials: 'include'
    // }).then(response => {
      // console.log(response)
      // response.json().then( data => {
      //   console.log('@@@',data)
      // })
    // }).catch(err => {
    //   console.log('---', err)
    // })
    const arr = []
    lists.item.map((item, index) => {
      item.area_list.map((k, j) => {
        const temp = {}
        temp.num = j
        temp.uuid = item.uuid
        temp.name = item.name
        temp.mobile = item.mobile
        temp.sale_amount_finish_percent_total = item.sale_amount_finish_percent_total
        temp.detail_area_uuid = k.detail_area_uuid
        temp.area_name = k.name
        temp.sale_amount_budget = k.sale_amount_budget
        temp.no_tax_sale_price_budget = k.no_tax_sale_price_budget
        temp.sale_budget_proportion = k.sale_budget_proportion
        temp.sale_amount_actual = k.sale_amount_actual
        temp.no_tax_sale_price_actual = k.no_tax_sale_price_budget
        temp.area_list = item.area_list
        arr.push(temp)
      })
    })
    this.setState({
      list: arr
    })

    // window.sr = ScrollReveal({ duration: 1200 });
    
    

    

    window.sr = ScrollReveal({ duration: 1200, reset: true });
    sr.reveal('.bar', { 
      duration: 1200,
      origin: 'left',
      distance: '200px', 
      scale: 1,
    });
    sr.reveal('.cell', { 
      duration: 1000,
      scale: 1,
      origin: 'left',
      distance: '10px' 
    }, 300);
    sr.reveal('.fooReveal', { 
      container: '.fooContainer', 
      duration: 2000,

      rotate: {z: 25} 
    });
  }

  handleclick = (value, e) => {
    // this.setState({value})
    // e.preventDefault();
    this.setState({ value })
    console.log('previous', this.state)
  };
  handle = (values) => {
    console.log(values)
  };
  link = () => {
    const { dispatch } = this.props
    // dispatch(routerRedux.push('/users'))
    dispatch(routerRedux.push({
      pathname: '/users',
      search: '?page=2'
    }))
  };

  chagneOrg = (value) => {
    console.log(value)
    this.setState({
      orgValue: value
    })
  };

  getIndex = (str, arr) => {
    const num = []
    arr.map((k, j) => {
      if (k.organization_ID === str) {
        num.push(j)
      }
    })
    return num
  };
  del = (arr, emp) => {
    arr.map((m) => {
      emp.splice(m, 1, 0)
    })
    return emp
  };
  filter = (need) => {
    const ex = []
    need.map((item, index) => {
      if (item) {
        ex.push(item)
      }
    })
    return ex
  };
  filterEmp = (org = [], emp) => {
    let cloneEmp = JSON.parse(JSON.stringify(emp))
    org.map((item, index) => {
      const orIndex = this.getIndex(item, cloneEmp)
      cloneEmp = this.del(orIndex, cloneEmp)
    })
    return this.filter(cloneEmp)
  };

  getColumns = () => {
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {}
      }
      if (row.area_list.length > 1 && row.num === 0) {
        // 需要合并
        obj.props.rowSpan = row.area_list.length
      } else if (row.num > 0) {
        obj.props.rowSpan = 0
      }
      return obj
    }
    let col = []
    col = [{
      title: '姓名',
      dataIndex: 'name',
      render: renderContent
      // render: (value, row, index) => {
      //   const obj = {
      //     children: value,
      //     props: {},
      //   };
      //   if (index === 0) {
      //     obj.props.rowSpan = 2
      //   }
      //   if (index === 1) {
      //     obj.props.rowSpan = 0
      //   }
      //   console.log(obj)
      //   return obj;
      // }
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      render: renderContent
    }, {
      title: '负责区域',
      dataIndex: 'area_name'
    }, {
      title: '销量【预算】',
      dataIndex: 'sale_amount_budget'
    }, {
      title: '无税单价【预算】',
      dataIndex: 'no_tax_sale_price_budget'
    }, {
      title: '销售收入【预算】',
      dataIndex: 'sale_budget_proportion'
    }, {
      title: '销量【实际值】',
      dataIndex: 'sale_amount_actual'
    }, {
      title: '无税单价【实际值】',
      dataIndex: 'no_tax_sale_price_actual'
    }, {
      title: '销售完成率',
      dataIndex: 'sale_amount_finish_percent_total',
      render: renderContent
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (text, row, index) => {
        return (
          <span>
            <a >修改</a>
            <span className='ant-divider' />
            <a >删除</a>
          </span>
        )
      }
    }]
    return col
  };

  click = () => {
    notification.success({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      duration: 1000000
    })
  }
  render () {
    const { value, list } = this.state
    // const { handleSubmit } = this.props
    // const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    //   <div>
    //     <label>{label}</label>
    //     <div>
    //       <Input {...input} placeholder={label} type={type} />
    //       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    //     </div>
    //   </div>
    // )
    // console.log(this.filterEmp(this.state.orgValue,employee))
    const optionsA = [{ name: '是', key: 'yes' }, { name: '否', key: 'no' }]
    const optionsB = [{ name: '启用', key: 'ok' }, { name: '停止', key: 'not' }]
    return (
      <MainLayout location={this.props.location}>
        <ImagesTurn />
        <div className={l.normal} >
          Route Component: Name
          <span>{value}</span>
          <Button onClick={this.handleclick.bind(null, '55')}>click-55</Button>
          <Button onClick={this.handleclick.bind(null, '88')}>click-88</Button>
          <Button onClick={this.handleclick.bind(null, 'zz')}>click-zz</Button>
          <Button onClick={this.handleclick.bind(null, '66')}>click-66</Button>
        </div>
        <div className="fooContainer">
          <div className="fooReveal"> Foo </div>
          <div className="fooReveal"> Foo </div>
          <div className="fooReveal"> Foo </div>
        </div>
        <Button onClick={this.click}>ok</Button>
        <Row>
          <Col span={12}>
            <InputField name='yan' type='radio' options={optionsA} placeholder='请输入' size='small' label='到期延续' validate={[]} />
          </Col>
          <Col span={12}>
            <InputField name='status' type='radio' options={optionsB} placeholder='请输入' size='small' label='状态' validate={[]} />
          </Col>
        </Row>
        <Button type='primary' onClick={this.link} ghost>跳转页面</Button>

        <Table columns={this.getColumns()} dataSource={list} bordered />
        <div className="box">box</div>
        <div className="bar">bar</div>
        <ul className="list">
          {
            [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map( (item,index) => {
              return <li key={index} className="cell">{item}</li>
            })
          }
        </ul>
      </MainLayout>
    )
  }
}
Name = reduxForm({ //eslint-disable-line
  form: 'name'
})(Name)
const mapStateToProps = (state) => {
  const { loading } = state
  return {
    loading
  }
}

export default connect(mapStateToProps)(Name)
