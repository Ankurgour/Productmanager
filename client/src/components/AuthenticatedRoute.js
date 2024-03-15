import React from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from './auth';
const navigate  = useNavigate();
const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() && getUserRole() === 'admin' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default AuthenticatedRoute;
