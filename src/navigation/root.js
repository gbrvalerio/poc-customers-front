import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Login } from '../pages/Login';
import { CustomerList } from '../pages/CustomerList';
import { PrivateRoute } from './PrivateRoute';
import { Layout } from './Layout';
import { NewCustomer } from '../pages/NewCustomer';
import { EditCustomer } from '../pages/EditCustomer';

export const RootNavigation = ({  }) => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/customers">
            <CustomerList />
          </PrivateRoute>
          <PrivateRoute path="/editcustomer/:id">
            <EditCustomer />
          </PrivateRoute>
          <PrivateRoute path="/newcustomer">
            <NewCustomer />
          </PrivateRoute>
          <Route path="/">
            <Redirect to={{ pathname: "/customers" }} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}