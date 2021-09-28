import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getIsLoggedIn } from '../features/authorization/authorizationSlice';

const PublicRoute = ({
  // eslint-disable-next-line react/prop-types
  component: Component,
  // eslint-disable-next-line react/prop-types
  restricted = false,
  // eslint-disable-next-line react/prop-types
  redirectTo = '/',
  // eslint-disable-next-line react/prop-types
  children,
  ...routeProps
}) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return <Route {...routeProps}>{shouldRedirect ? <Redirect to={redirectTo} /> : children}</Route>;
};

export default PublicRoute;
