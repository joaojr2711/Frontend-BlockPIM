import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Login from './Pages/Login/index'
import Register from './Pages/Register/index'
import ForgotPassword from './Pages/ForgotPassword/index'

import DashboardClient from './Pages/Client/Dashboard'

export default props => (
    <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ Login } />
          <Route exact path='/Login' component={ Login } />
          
          <Route exact path='/Register' component={ Register } />
          <Route exact path='/ForgotPassword' component={ ForgotPassword } />

          <Route exact path='/Painel' component={ DashboardClient } />
        </Switch>
    </BrowserRouter>
  )