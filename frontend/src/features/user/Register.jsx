import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useCreateUserMutation } from './userApi';
import { setCredentials } from '../authorization/authorizationSlice';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';

const Register = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [createUser, { isLoading }] = useCreateUserMutation();

  const reset = () => {
    setUser({ name: '', email: '', password: '' });
  };

  const handleInputName = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
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
      <Form onSubmit={handleRegistration}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name Surname</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            placeholder="Name Surname"
            onChange={handleInputName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter email"
            onChange={handleInputName}
          />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
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

export default Register;
