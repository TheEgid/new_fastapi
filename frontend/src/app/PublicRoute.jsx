import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getIsLoggedIn } from '../features/authorization/authorizationSlice';

const PublicRoute = ({
  component: Component,
  restricted = false,
  redirectTo = '/',
  children,
  ...routeProps
}) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return <Route {...routeProps}>{shouldRedirect ? <Redirect to={redirectTo} /> : children}</Route>;
};

PublicRoute.propTypes = {
  component: PropTypes.element,
  restricted: PropTypes.bool,
  redirectTo: PropTypes.string,
  children: PropTypes.instanceOf(Object),
};

PublicRoute.defaultProps = {
  component: null,
  restricted: false,
  redirectTo: '/',
  children: null,
};

export default PublicRoute;
