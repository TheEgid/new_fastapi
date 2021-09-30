import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getIsLoggedIn } from '../features/authorization/authorizationSlice';

const PrivateRoute = ({ children, ...routeProps }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return <Route {...routeProps}>{isLoggedIn ? children : <Redirect to="/login" />}</Route>;
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

PrivateRoute.defaultProps = {
  children: null,
};

export default PrivateRoute;
