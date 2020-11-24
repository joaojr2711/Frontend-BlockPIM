import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Login from './Pages/Login/index'
import Register from './Pages/Register/index'
import ForgotPassword from './Pages/ForgotPassword/index'

import DashboardClient from './Pages/Client/Dashboard'
import PerfilClient from './Pages/Client/Profile'
import PaymentClient from './Pages/Client/Payments'
import HistoryClient from './Pages/Client/History'
import InvestmentClient from './Pages/Client/Investment'

import DashboardAdmin from './Pages/Admin/Dashboard'
import HistoryAdmin from './Pages/Admin/History'

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
          <Route exact path='/Investment' component={ InvestmentClient } />
          
          {/* Rotas de Histórico */}
          <Route exact path='/History' component={ HistoryClient } />

          {/* Rotas de Admin */}
          <Route exact path='/Dashboard' component={ DashboardAdmin } />
          <Route exact path='/Dashboard/History' component={ HistoryAdmin } />

        </Switch>
    </BrowserRouter>
  )