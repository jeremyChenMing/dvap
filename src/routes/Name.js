import React from 'react';
import { connect } from 'dva';
import l from './Name.less';
import MainLayout from '../components/MainLayout/MainLayout';
import { Button, Input} from 'antd';
import { Field, reduxForm } from 'redux-form';
import cx from 'classnames';
import { routerRedux } from 'dva/router';


class Name extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value:'666'
		}
	}
	handleclick = (e) => {
		console.log('11')
		e.preventDefault()
	};
	handle = (values) => {
		console.log(values)
	};
	link = () => {
		const {dispatch} = this.props;
		// dispatch(routerRedux.push('/users'))
		dispatch(routerRedux.push({
			pathname: '/users',
			search: '?page=2'
		}))
	};
	render() {
		const {value} = this.state;
		const {handleSubmit} = this.props;
		const renderField = ({ input, label, type, meta: { touched, error, warning }}) => (
		  <div>
		    <label>{label}</label>
		    <div>
		      <Input {...input} placeholder={label} type={type} />
		      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
		    </div>
		  </div>
		)
		return(
			<MainLayout location={this.props.location}>
				<div className={l.normal} onClick={this.handleclick}>
			      Route Component: Name{value}
			      <span className={l.dot}>66</span>
			    </div>
			    <form className={cx(l.formbox,l.pad)}>
			      <Field name="username" type="text" component={renderField} label="Username" />
			      <Field name="email" type="email" component={renderField} label="Email" />
			      <Field name="age" type="number" component={renderField} label="Age" />
			      <div>
			        <Button type="primary" onClick={handleSubmit(this.handle)}> Submit </Button>
			      </div>
			    </form>
			    <Button type="primary" onClick={this.link} ghost>跳转页面</Button>		
			</MainLayout>
		)
	}
}


const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}
const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}
Name = reduxForm({
	form: 'name',
	validate,
	warn
})(Name)

const mapStateToProps = state => {
	return{}
}

export default connect(mapStateToProps)(Name);
