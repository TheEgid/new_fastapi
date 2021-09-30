import { React, lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import FileInputForm from './features/fileInputForm/FileInputForm';
import BaseView from './features/baseView/BaseView';
import Spinner from './components/Spinner';
import PublicRoute from './app/PublicRoute';
// import PrivateRoute from './app/PrivateRoute';
import './custom.scss';

const Register = lazy(() => import('./components/Register' /* webpackChunkName: "Register" */));
const Login = lazy(() => import('./components/Login' /* webpackChunkName: "Login" */));

const App = () => (
  <>
    <Container>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <PublicRoute path="/" exact>
            <FileInputForm />
            <BaseView />
          </PublicRoute>

          <PublicRoute path="/login" redirectTo="/" restricted>
            <Login />
          </PublicRoute>

          <PublicRoute path="/register" redirectTo="/" restricted>
            <Register />
          </PublicRoute>
        </Switch>
      </Suspense>
    </Container>
  </>
);

export default App;
