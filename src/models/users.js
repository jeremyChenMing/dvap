import * as usersService from '../services/users';
import querystring from 'querystring';
import pathToRegexp from 'path-to-regexp';

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
    *fetch({ payload: { page=1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, parseInt(page));
      yield put({ 
        type: 'save', 
        payload: { 
          data, 
          total: parseInt(headers['x-total-count'], 10) ,
          page: parseInt(page, 10) 
        } 
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },


  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((a) => {
        const query = querystring.parse(a.search.substring(1))

        const match = pathToRegexp('/users/:id').exec(a.pathname)
        if (match) {
          const userId = match[1]
        }
        if (a.pathname.indexOf('/users') !== -1 ) {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};