import { React, lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import FileInputForm from './features/fileInputForm/FileInputForm';
import BaseView from './features/baseView/BaseView';
import Navigation from './features/navigation/Navigation';
import PublicRoute from './app/PublicRoute';
import PrivateRoute from './app/PrivateRoute';
import Spinner from './components/Spinner';
import Contact from './components/Contact';
import './custom.scss';

const Register = lazy(() => import('./features/user/Register'));
const Login = lazy(() => import('./features/user/Login'));

const App = () => (
  <>
    <Container>
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <PublicRoute path="/" exact>
          <FileInputForm />
          <BaseView />
        </PublicRoute>

        <Switch>
          <PrivateRoute path="/contacts" redirectTo="/contacts" restricted>
            <Contact />
          </PrivateRoute>

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
