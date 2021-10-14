import { React } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Form, Button } from 'react-bootstrap';
import { useLoginUserMutation } from './userApi';
import { setCredentials } from '../authorization/authorizationSlice';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';

const schema = object().shape({
  email: string().email().required(),
  password: string().required().min(6).max(128),
});

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({ resolver: yupResolver(schema) });
  const [loginUser, { isLoading }] = useLoginUserMutation();

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
          <Form.Control
            placeholder="Email address"
            type="email"
            name="email"
            {...register('email', { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Password"
            type="password"
            name="password"
            {...register('password', { required: true })}
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
