import querystring from 'querystring';
// import pathToRegexp from 'path-to-regexp';
import * as usersService from '../services/users';
// import key from 'keymaster'
export default {
  namespace: 'users',
  state: {
    list: [],
    total: 0,
    page: 1,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, parseInt(page));
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: {id, values}}, {call, put, select}) {
      yield call(usersService.patch, id, values);
      const page = yield select( state =>  state.users.page)
      yield put({type: 'fetch', payload: {page}});
    }
    // call 请求异步 yield将异步同步  类似于async await
    // select 选择当前state中的值
    // put用来发action
  },
  subscriptions: {
    setup({ dispatch, history }, done) {
      // done({message:'44'}) 用来抛出错误的
      return history.listen((a) => {
        const query = querystring.parse(a.search.substring(1));
        // const match = pathToRegexp('/users/:id').exec(a.pathname);
        // if (match) {
        //   const userId = match[1];
        // }
        if (a.pathname.indexOf('/users') !== -1) {
          dispatch({ type: 'fetch', payload: query });
          
        }
      });
    },
    // keyboardWatcher({ dispatch }) {
    //   key('⌘+up, ctrl+up',() => { dispatch({ type: 'fetch', payload: {page:3} })})
    // }
    // 需要插件帮助
  },
};
