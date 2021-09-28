import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getIsLoggedIn } from '../features/authorization/authorizationSlice';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, ...routeProps }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return <Route {...routeProps}>{isLoggedIn ? children : <Redirect to="/login" />}</Route>;
};
export default PrivateRoute;
