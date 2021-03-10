import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Landing from './Landing/Landing'
import Authc from './Authentication/Authc'
import Dashboard from './Dashboard'
import Register from './Authentication/Register'

const Index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/Authc" component={Authc} />
        <Route path="/Register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch> 
    </Router>
  )
}

export default Index
