import { React } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
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
  const { register, handleSubmit, reset } = useForm({ resolver: yupResolver(schema) });

  const handleRegistration = async (user) => {
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
      <h2 className="register-title">Registration form</h2>
      <Form onSubmit={handleSubmit(handleRegistration)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Name Surname</Form.Label>
          <Form.Control
            className="form-control"
            placeholder="Name Surname"
            name="name"
            type="text"
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
