import React from 'react'
import { connect } from 'dva'
import { Table, Pagination, Popconfirm } from 'antd'
import styles from './Users.css'
// import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../constants'

function Users ({ list: dataSource, dispatch, loading, total, page: current }) {
  function deleteHandler (id) {
    dispatch({ type: 'users/remove', payload: id })
  }

  function pageChangeHandler (page) {
    console.log(page)
    // document.location.href = `#/users?page=${page}`;
    return new Promise((resolve, reject) => {
      reject({ message: '123' })//eslint-disable-line
    })
  }
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href='javascript:;'>{text}</a>
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website'
  },
  {
    title: 'Operation',
    key: 'operation',
    render: (text, { id }) => (
      <span className={styles.operation}>
        <Popconfirm title='Confirm to delete?' onConfirm={deleteHandler.bind(null, id)}>
          <a href='javascript:;'>Delete</a>
        </Popconfirm>
      </span>
      )
  }
  ]
  return (
    <div className={styles.normal}>
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className='ant-table-pagination'
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  const { list, total, page } = state.users
  const loading = state.loading.models.users
  return {
    list,
    total,
    page,
    loading
  }
}

export default connect(mapStateToProps)(Users)
