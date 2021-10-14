import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { Mailbox, EyeSlash, Eye } from 'react-bootstrap-icons';
import { useLoginUserMutation } from './userApi';
import { setCredentials } from '../authorization/authorizationSlice';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';

const schema = object().shape({
  email: string().email().required(),
  password: string().required().min(6).max(128),
});

const offeye = <EyeSlash width="26" height="26" />;
const eye = <Eye width="26" height="26" />;
const mailbox = <Mailbox width="26" height="26" />;

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({ resolver: yupResolver(schema) });
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [passwordShow, setPasswordShow] = useState(false);
  const togglePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

  const handleLogin = async (user) => {
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
    reset();
  };

  return (
    <Container>
      <ToastContainer />
      <Form.Label>
        <h2>Log in</h2>
      </Form.Label>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <InputGroup>
            <InputGroup.Text> {mailbox} </InputGroup.Text>
            <Form.Control
              placeholder="Email address"
              type="email"
              name="email"
              {...register('email', { required: true })}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <InputGroup.Text onClick={togglePasswordShow}>
              {passwordShow ? eye : offeye}
            </InputGroup.Text>
            <Form.Control
              placeholder="Password"
              type={passwordShow ? 'text' : 'password'}
              name="password"
              {...register('password', { required: true })}
            />
          </InputGroup>
        </Form.Group>
        <Button variant="secondary" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
