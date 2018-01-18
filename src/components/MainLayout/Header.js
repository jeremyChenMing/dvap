import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

function Header ({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode='horizontal'
      theme='dark'
    >
      <Menu.Item key='/users'>
        <Link to='/users'><Icon type='bars' />Users</Link>
      </Menu.Item>
      <Menu.Item key='/'>
        <Link to='/'><Icon type='home' />Home</Link>
      </Menu.Item>
      <Menu.Item key='/name'>
        <Link to='/name'><Icon type='user' />Name</Link>
      </Menu.Item>
      <Menu.Item key='/test'>
        <Link to='/test'><Icon type='user' />test</Link>
      </Menu.Item>
      <Menu.Item key='/lay'>
        <Link to='/lay'><Icon type='user' />lay</Link>
      </Menu.Item>
    </Menu>
  )
}
export default Header
