import React, { Component, PureComponent } from 'react';
import Draggable from 'react-draggable';
import { Button, Icon } from 'antd'
import l from './IndexPage.less'
import MainLayout from '../components/MainLayout/MainLayout';


class Content extends PureComponent {
  render () {
    console.log('render content!');
    return <div>Content{this.props.a}</div>
  }
}

class Dnd extends React.Component {
  state = {
    a: 0
  }
  handleClick = () => {
    this.setState({
      a: 1
    })
  }
  render() {
    const { location } = this.props
    const { a } = this.state
    console.log('render App!');
    return (
      <MainLayout location={location}>
        <div className="myself">
            <Button onClick={this.handleClick} type="primary">点击</Button>
            <Content a={a}/>
        </div>
        <span className="myself-icon">&#xe600;</span>
      </MainLayout>
    )
  }
}

export default Dnd
