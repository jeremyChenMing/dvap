import React from 'react';
import { connect } from 'dva';
import { Button, Input, Select, Row, Col } from 'antd';
import { Field, reduxForm } from 'redux-form';
import cx from 'classnames';
import { routerRedux } from 'dva/router';
import l from './Name.less';
import MainLayout from '../components/MainLayout/MainLayout';
import fetch from 'dva/fetch';
import InputField from './InputField'
class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	   value: '66',
     orgValue:[]
    };
  }

  componentDidMount() {
    console.log('123123')
    fetch('/dogs',{
      method:'POST',
      data: {dog: '666'},
      mode: 'cors',
      credentials: 'include'
    }).then( response => {
      console.log(response)
      // response.json().then( data => {
      //   console.log('@@@',data)
      // })
    }).catch( err => {
      console.log('---',err)
    })
  }

  handleclick = (value,e) => {
    // this.setState({value})
    // e.preventDefault();
    this.setState({value})
    console.log('previous',this.state)
  };
  handle = (values) => {
    console.log(values);
  };
  link = () => {
    const { dispatch } = this.props;
	// dispatch(routerRedux.push('/users'))
    dispatch(routerRedux.push({
      pathname: '/users',
      search: '?page=2',
    }));
  };




  chagneOrg = (value) => {
    console.log(value)
    this.setState({
      orgValue:value
    })
  };

  getIndex = (str, arr) => {
    let num = [];
    arr.map( (k,j) => {
      if (k.organization_ID === str) {
        num.push(j)
      }
    })
    return num;
  };
  del = (arr,emp) => {
    arr.map( m => {
      emp.splice(m,1,0)
    })
    return emp
  };
  filter = (need) => {
    let ex = [];
    need.map( (item,index) => {
      if (item) {
        ex.push(item)
      }
    })
    return ex
  };
  filterEmp = (org = [], emp ) => {
    let cloneEmp = JSON.parse(JSON.stringify(emp));
    org.map( (item,index) => {
        let orIndex = this.getIndex(item,cloneEmp)
        cloneEmp = this.del(orIndex,cloneEmp)
    })
    return this.filter(cloneEmp)
  }
  render() {

    const { value } = this.state;
    const { handleSubmit } = this.props;
    const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
      <div>
        <label>{label}</label>
        <div>
          <Input {...input} placeholder={label} type={type} />
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      </div>
		);
    // console.log(this.filterEmp(this.state.orgValue,employee))
    const optionsA = [{name:'是',key:'yes'},{name:'否',key:'no'}]
    const optionsB = [{name:'启用',key:'ok'},{name:'停止',key:'not'}]
    return (
      <MainLayout location={this.props.location}>
        <div className={l.normal} >
		      Route Component: Name
          <span className={l.dot,l.font}>{value}</span>
          <Button onClick={this.handleclick.bind(null,'55')}>click-55</Button>
          <Button onClick={this.handleclick.bind(null,'88')}>click-88</Button>
          <Button onClick={this.handleclick.bind(null,'zz')}>click-zz</Button>
          <Button onClick={this.handleclick.bind(null,'66')}>click-66</Button>
        </div>


        <Row>
          <Col span={12}>
            <InputField name="yan" type="radio"  options={optionsA} placeholder="请输入" size="small" label="到期延续" validate={[]} />
          </Col>
          <Col span={12}>
            <InputField name="status" type="radio"  options={optionsB} placeholder="请输入" size="small" label="状态" validate={[]} />
          </Col>
        </Row>
        <Button type="primary" onClick={this.link} ghost>跳转页面</Button>
      </MainLayout>
    );
  }
}


Name = reduxForm({
  form: 'name',
})(Name);

const mapStateToProps = (state) => {
  const { loading } = state;
  return {
    loading,
  };
};

export default connect(mapStateToProps)(Name);
