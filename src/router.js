import React from 'react'
import { Router, Route, Switch, BrowserRouter } from 'dva/router'

// import IndexPage from './routes/IndexPage';
// import Users from './routes/Users.js';
// import Name from './routes/Name.js';
import Dnd from './routes/Dnd.js'
import Lay from './routes/Lay.js'

import dynamic from 'dva/dynamic'

class Tys extends React.Component {
  pushs = () => {
    const {history: {push}} = this.props
    push('/lay/123')
  }
  render () {
    // console.log(this.props)
    return (
      <div onClick={this.pushs}>hello name</div>
    )
  }
}

function RouterConfig ({ history, app }) {
  const IndexPage = dynamic({
    app,
    // models: () => [import('./models/example')],
    component: () => import('./routes/IndexPage')
  })

  const Users = dynamic({
    app,
    // models: () => [import('./models/user')],
    component: () => import('./routes/Users')
  })

  const Name = dynamic({
    app,
    component: () => import('./routes/Name')
  })

  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={IndexPage} />
        <Route path='/users' component={Users} />
        <Route path='/name' component={Name} />
        <Route path='/test' component={Dnd} />
        <Route path='/lay' component={Lay} />
        <Route path='/else' render={(arg) => <Tys {...arg} />} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
