import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'dva'
import cx from 'classnames';
import styles from './IndexPage.css'
import l from './IndexPage.less'
import MainLayout from '../components/MainLayout/MainLayout'
import _ from 'lodash'
import { Button, InputNumber, Input, Table } from 'antd'




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

      </div>
    </MainLayout>
  )
}

IndexPage.propTypes = {
}

export default connect()(IndexPage)
