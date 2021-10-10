import { React, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateUserMutation } from './userApi';
import { setCredentials } from '../authorization/authorizationSlice';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';

const schema = object().shape({
  name: string().required(),
  email: string().required().email(),
  password: string().required().min(6).max(128),
});

const Register = () => {
  const dispatch = useDispatch();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const { register, watch, reset, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.email && value.password) {
        setUser(value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleRegistration = async () => {
    try {
      createUser({ user })
        .unwrap()
        .then((payload) => {
          toast.success('You have registered!', { autoClose: 2000 });
          dispatch(setCredentials({ ...payload }));
          return payload;
        })
        .catch((error) => {
          if (error.data.detail === 'Email already registered') {
            toast.error('Email already registered!', { autoClose: 2000 });
          } else {
            toast.error('Registration canceled!', { autoClose: 2000 });
          }
        });
    } catch (err) {
      toast.error('Registration canceled!', { autoClose: 2000 });
    }
    reset();
  };

  return (
    <Container>
      <ToastContainer />
      <Form.Label>
        <h2>Log in</h2>
      </Form.Label>
      <Form onSubmit={handleSubmit(handleRegistration)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Name Surname</Form.Label>
          <Form.Control
            className="form-control"
            placeholder="Name Surname"
            name="name"
            type="name"
            {...register('name', { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="form-control"
            placeholder="Email address"
            name="email"
            type="email"
            {...register('email', { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="form-control"
            placeholder="Password"
            name="password"
            type="password"
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

export default Register;
