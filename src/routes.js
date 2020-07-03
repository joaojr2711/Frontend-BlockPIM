import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Login from './Pages/Login/index'
import Register from './Pages/Register/index'
import ForgotPassword from './Pages/ForgotPassword/index'

import DashboardClient from './Pages/Client/Dashboard'
import PerfilClient from './Pages/Client/Profile'
import PaymentClient from './Pages/Client/Payments'

import DashboardAdmin from './Pages/Admin/Dashboard'

export default props => (
    <BrowserRouter>
        <Switch>
          
          <Route exact path='/' component={ Login } />
          <Route exact path='/Login' component={ Login } />
          <Route exact path='/Register' component={ Register } />
          <Route exact path='/ForgotPassword' component={ ForgotPassword } />

          {/* Rotas de client */}
          <Route exact path='/Painel' component={ DashboardClient } />
          <Route exact path='/Perfil' component={ PerfilClient } />
          <Route exact path='/Payment' component={ PaymentClient } />
          {/* Rotas de Admin */}
          <Route exact path='/Dashboard' component={ DashboardAdmin } />
        </Switch>
    </BrowserRouter>
  )