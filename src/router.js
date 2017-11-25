import React from 'react';
import { Router, Route, Switch } from 'dva/router';

// import IndexPage from './routes/IndexPage';
// import Users from './routes/Users.js';
// import Name from './routes/Name.js';


import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  
  const IndexPage = dynamic({
    app,
    models: () => [import('./models/example')],
    component: () => import('./routes/IndexPage')
  })

  const Users = dynamic({
    app,
    models: () => [import('./models/user')],
    component: () => import('./routes/Users')
  })

  const Name = dynamic({
    app,
    component: () => import('./routes/Name')
  })

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/users" component={Users} />
        <Route path="/name" component={Name} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
