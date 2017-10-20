import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import { message } from 'antd';
import { reducer as formReducer } from 'redux-form'
import * as obj from 'dva/router'
import createHistory from 'history/createBrowserHistory'

const historys = createHistory()
console.log(historys)

// 1. Initialize
const app = dva({
  history: historys,
  extraReducers: {
    form: formReducer,
  },
  onError: (e) => {
  	message.error('错误：' + e.message, 3)
  }
});

// const app = dva();
app.use(createLoading());
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require("./models/users"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
