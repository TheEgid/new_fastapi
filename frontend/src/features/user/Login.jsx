// eslint-disable-next-line no-unused-vars
import { React, useState, useEffect  } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars
import { string, object } from 'yup';
// eslint-disable-next-line no-unused-vars
import { yupResolver } from '@hookform/resolvers/yup';
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from 'react-toastify';
import { Container, Form, Button } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { useLoginUserMutation } from './userApi';
// eslint-disable-next-line no-unused-vars
import { setCredentials } from '../authorization/authorizationSlice';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';


const schema = object().shape({
  email: string().email().required(),
  password: string().required(),
});


const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit }  = useForm({ resolver: yupResolver(schema) }
  );

  const [user, setUser] = useState({ email: '', password: '' });

  const reset = () => {
    setUser({ email: '', password: '' });
  };

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleInputName = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
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

  return(
    <Container>
      <ToastContainer />
      <Form.Label><h2>Log in</h2></Form.Label>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="form-control"
            placeholder="Email address"
            type="email"
            name="email"
            {...register('email', { required: true })}
            onChange={handleInputName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="form-control"
            placeholder="Password"
            type="password"
            name="password"
            {...register('password', { required: true })}
            onChange={handleInputName}
          />
        </Form.Group>

        <Button variant="secondary" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>

      </Form>



    </Container>
  )
}


export default Login;


