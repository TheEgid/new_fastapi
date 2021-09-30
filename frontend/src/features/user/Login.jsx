import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useLoginUserMutation } from './userApi';
import { setCredentials } from '../authorization/authorizationSlice';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: '', password: '' });
  const reset = () => {
    setUser({ email: '', password: '' });
  };

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleInputName = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser({ user })
        .unwrap()
        .then((payload) => {
          if (payload.access_token) {
            toast.success('You are logged in!', { autoClose: 2000 });
            return payload;
          }
          return undefined;
        })
        .catch(() => {
          toast.error('Login canceled. Check your username or password', { autoClose: 2000 });
          reset();
        });
      if (result) {
        dispatch(setCredentials({ ...result, ...user }));
      }
    } catch (err) {
      toast.error('Login canceled. Check your username or password', { autoClose: 2000 });
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h2 className="login-title">Log in</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter email"
            onChange={handleInputName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleInputName}
          />
        </Form.Group>

        <Button variant="secondary" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
