import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { PersonBadge, Eye, EyeSlash, Mailbox } from 'react-bootstrap-icons';
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

const offeye = <EyeSlash width="26" height="26" />;
const eye = <Eye width="26" height="26" />;
const mailbox = <Mailbox width="26" height="26" />;
const person = <PersonBadge width="26" height="26" />;

const Register = () => {
  const dispatch = useDispatch();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const { register, handleSubmit, reset } = useForm({ resolver: yupResolver(schema) });

  const [passwordShow, setPasswordShow] = useState(false);
  const togglePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

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
      <Form.Label>
        <h2>Registration form</h2>
      </Form.Label>
      <Form onSubmit={handleSubmit(handleRegistration)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Name Surname</Form.Label>
          <InputGroup>
            <InputGroup.Text> {person} </InputGroup.Text>
            <Form.Control
              className="form-control"
              placeholder="Name Surname"
              name="name"
              type="text"
              {...register('name', { required: true })}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <InputGroup>
            <InputGroup.Text> {mailbox} </InputGroup.Text>
            <Form.Control
              className="form-control"
              placeholder="Email address"
              name="email"
              type="email"
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
              className="form-control"
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

export default Register;
