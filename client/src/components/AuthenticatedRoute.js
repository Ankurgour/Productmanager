import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};
const getUserRole = () => {
  return localStorage.getItem('role');
};

const AuthenticatedElement = ({ children }) => {
  const authenticated = isAuthenticated();
  console.log(getUserRole());
  return authenticated ? children: <Navigate to="/login" />;
};

export default AuthenticatedElement;
