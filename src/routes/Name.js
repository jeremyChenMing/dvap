import React from 'react';
import { connect } from 'dva';
import { Button, Input, Select } from 'antd';
import { Field, reduxForm } from 'redux-form';
import cx from 'classnames';
import { routerRedux } from 'dva/router';
import l from './Name.less';
import MainLayout from '../components/MainLayout/MainLayout';
const Option = Select.Option
const organization = [{
    "status":"created",
    "uuid":"77e0dc17-1292-11e7-81b9-00163e007053",
    "name":"测试部",
    "tenant_id":"5575b57d-aafa-4441-8806-3298d5ae24e1",
    "parent_organization":"上迅",
    "parent_organization_ID":"a87d5001-103f-11e7-8186-00163e007053"
},{
    "status":"created",
    "uuid":"3d3028b9-4b61-11e7-8c0e-00163e007053",
    "name":"产品部",
    "tenant_id":"5575b57d-aafa-4441-8806-3298d5ae24e1",
    "parent_organization":"上迅",
    "parent_organization_ID":"a87d5001-103f-11e7-8186-00163e007053"
},{
    "status":"created",
    "uuid":"a87d5001-103f-11e7-8186-00163e007053",
    "name":"上迅",
    "tenant_id":"5575b57d-aafa-4441-8806-3298d5ae24e1",
    "parent_organization":"",
    "parent_organization_ID":""
},{
    "status":"created",
    "uuid":"a87fd092-103f-11e7-8186-00163e007053",
    "name":"研发部",
    "tenant_id":"5575b57d-aafa-4441-8806-3298d5ae24e1",
    "parent_organization":"上迅",
    "parent_organization_ID":"a87d5001-103f-11e7-8186-00163e007053"
},{
    "status":"created",
    "uuid":"614c9a3e-7ccd-11e7-8fd2-00163e007053",
    "name":"一个",
    "tenant_id":"5575b57d-aafa-4441-8806-3298d5ae24e1",
    "parent_organization":"上迅",
    "parent_organization_ID":"a87d5001-103f-11e7-8186-00163e007053"
}];


const employee = [{
    "mobile":"15066665555","name":"32131","organization":"一个",
    "organization_ID":"614c9a3e-7ccd-11e7-8fd2-00163e007053",
    "status":"probation","uuid":"6368b825-153a-11e7-8b98-00163e007053"
},{
    "mobile":"13522225555","name":"654654","organization":"一个",
    "organization_ID":"614c9a3e-7ccd-11e7-8fd2-00163e007053",
    "status":"probation","uuid":"ecfa800f-147c-11e7-9c46-00163e007053"
},{
    "mobile":"15210363842","name":"常赛龙","organization":"一个",
    "organization_ID":"614c9a3e-7ccd-11e7-8fd2-00163e007053",
    "status":"in-service","uuid":"601c3f8d-66d0-11e7-a7e2-00163e007053"
},{
    "mobile":"13102906468","name":"dandan","organization":"研发部",
    "organization_ID":"a87fd092-103f-11e7-8186-00163e007053",
    "status":"in-service","uuid":"d47b4ae0-30a5-11e7-b843-00163e007053"
},{
    "mobile":"13100000560","name":"dda","organization":"产品部",
    "organization_ID":"3d3028b9-4b61-11e7-8c0e-00163e007053",
    "status":"in-service","uuid":"9170cc1b-4b63-11e7-8c0e-00163e007053"
},{
    "mobile":"13718220294","name":"邓斌","organization":"一个",
    "organization_ID":"614c9a3e-7ccd-11e7-8fd2-00163e007053",
    "status":"in-service","uuid":"8718eef8-33a6-11e7-b843-00163e007053"
},{
    "mobile":"15321896785","name":"杜豪","organization":"一个",
    "organization_ID":"614c9a3e-7ccd-11e7-8fd2-00163e007053",
    "status":"in-service","uuid":"dafa6e6f-12d1-11e7-807c-00163e007053"
},{
    "mobile":"17600661889","name":"杜豪新","organization":"研发部",
    "organization_ID":"a87fd092-103f-11e7-8186-00163e007053",
    "status":"in-service","uuid":"9388b17d-4c10-11e7-8c0e-00163e007053"
},{
    "mobile":"18501068035","name":"范文华","organization":"一个",
    "organization_ID":"614c9a3e-7ccd-11e7-8fd2-00163e007053",
    "status":"in-service","uuid":"57ea2d6f-729d-11e7-81b1-00163e007053"
},{
    "mobile":"18519190662","name":"高仁军","organization":"产品部",
    "organization_ID":"3d3028b9-4b61-11e7-8c0e-00163e007053",
    "status":"in-service","uuid":"ac94f216-33c6-11e7-b843-00163e007053"
},{
    "mobile":"13311208163","name":"刘枫","organization":"研发部",
    "organization_ID":"a87fd092-103f-11e7-8186-00163e007053",
    "status":"in-service","uuid":"4e0eef83-6229-11e7-87f1-00163e007053"
},{
    "mobile":"15901090176","name":"刘李","organization":"研发部",
    "organization_ID":"a87fd092-103f-11e7-8186-00163e007053",
    "status":"in-service","uuid":"faec4d47-4c25-11e7-8c0e-00163e007053"
},{
    "mobile":"13200000000","name":"李伟","organization":"产品部",
    "organization_ID":"3d3028b9-4b61-11e7-8c0e-00163e007053",
    "status":"probation","uuid":"699c2813-2fb8-11e7-968c-00163e007053"
},{
    "mobile":"13300000000","name":"nihao","organization":"研发部",
    "organization_ID":"a87fd092-103f-11e7-8186-00163e007053",
    "status":"in-service","uuid":"15bf5b0a-1543-11e7-9027-00163e007053"
},{
    "mobile":"13300000091","name":"你好的额鹅鹅鹅","organization":"一个",
    "organization_ID":"614c9a3e-7ccd-11e7-8fd2-00163e007053",
    "status":"in-service","uuid":"677b77b6-30b0-11e7-b843-00163e007053"
},{
    "mobile":"18679131464","name":"王猛","organization":"一个",
    "organization_ID":"614c9a3e-7ccd-11e7-8fd2-00163e007053",
    "status":"in-service","uuid":"e8cd92fc-2983-11e7-b79d-00163e007053"
},{
    "mobile":"17610290532","name":"王萌","organization":"研发部",
    "organization_ID":"a87fd092-103f-11e7-8186-00163e007053",
    "status":"probation","uuid":"38b93610-b31e-11e7-8793-5254001aba5d"
},{
    "mobile":"18618193168","name":"徐恒堂","organization":"研发部",
    "organization_ID":"a87fd092-103f-11e7-8186-00163e007053",
    "status":"in-service","uuid":"57ef67e6-729d-11e7-81b1-00163e007053"
},{
    "mobile":"13522226666","name":"xxxx","organization":"产品部",
    "organization_ID":"3d3028b9-4b61-11e7-8c0e-00163e007053","status":"probation",
    "uuid":"45def1e3-147c-11e7-9c46-00163e007053"
},{
    "mobile":"18910271863","name":"展丹丹","organization":"产品部",
    "organization_ID":"3d3028b9-4b61-11e7-8c0e-00163e007053",
    "status":"in-service","uuid":"a88cb899-103f-11e7-8186-00163e007053"
},{
    "mobile":"13200000058","name":"zhanddn","organization":"一个",
    "organization_ID":"614c9a3e-7ccd-11e7-8fd2-00163e007053",
    "status":"probation","uuid":"dc44f7e4-4b62-11e7-8c0e-00163e007053"
},{
    "mobile":"18612786667","name":"张海涛","organization":"一个",
    "organization_ID":"614c9a3e-7ccd-11e7-8fd2-00163e007053",
    "status":"in-service","uuid":"5f827950-24d3-11e7-878e-00163e007053"
},{
    "mobile":"15210579620","name":"庄宝军","organization":"研发部",
    "organization_ID":"a87fd092-103f-11e7-8186-00163e007053",
    "status":"in-service","uuid":"a88e426a-103f-11e7-8186-00163e007053"
}]








class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	   value: '66',
     orgValue:[]
    };
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
    console.log(this.filterEmp(this.state.orgValue,employee))
    return (
      <MainLayout location={this.props.location}>
        <div className={l.normal} >
		      Route Component: Name
          <span className={l.dot}>{value}</span>
          <Button onClick={this.handleclick.bind(null,'55')}>click-55</Button>
          <Button onClick={this.handleclick.bind(null,'88')}>click-88</Button>
          <Button onClick={this.handleclick.bind(null,'zz')}>click-zz</Button>
          <Button onClick={this.handleclick.bind(null,'66')}>click-66</Button>
        </div>
        <form className={cx(l.formbox, l.pad)}>
          <Field name="username" type="text" component={renderField} label="Username" />
          <Field name="email" type="email" component={renderField} label="Email" />
          <Field name="age" type="number" component={renderField} label="Age" />
          <div>
            <Button type="primary" onClick={handleSubmit(this.handle)}> Submit </Button>
          </div>
        </form>
        <Button type="primary" onClick={this.link} ghost>跳转页面</Button>

        {
          employee.map( (item,index) => {
            return(
              <div className={cx(l.name)} key={index}>
                <span>{item.name}</span>:
                <span>{item.organization}</span>
                <span>{item.organization_ID}</span>
              </div>
            )
          })
        }

        <div className={cx(l.box)}>
          <Select style={{width:600,marginBottom:'50px'}} mode='multiple' placeholder="请选择" onChange={this.chagneOrg}>
            {
              organization.map( (item,index) => {
                return(
                  <Option key={index} value={item.uuid}>{item.name}</Option>
                )
              })
            }
          </Select>


          {
            this.filterEmp(this.state.orgValue,employee).map( (item,index) => {
              return(
                <div className={cx(l.name)} key={index}>
                  <span>{item.name}</span>:
                  <span>{item.organization}</span>
                  <span>{item.organization_ID}</span>
                </div>
              )
            })
          }
        </div>
        
      </MainLayout>
    );
  }
}


const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.age) {
    errors.age = 'Required';
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number';
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old';
  }
  return errors;
};
const warn = (values) => {
  const warnings = {};
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...';
  }
  return warnings;
};
Name = reduxForm({
  form: 'name',
  validate,
  warn,
})(Name);

const mapStateToProps = (state) => {
  const { loading } = state;
  return {
    loading,
  };
};

export default connect(mapStateToProps)(Name);
