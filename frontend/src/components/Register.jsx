import { React, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useCreateUserMutation } from '../features/user/userApi';
import Loader from './Loader';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [createUser, { isLoading }] = useCreateUserMutation();

  const reset = () => {
    setUser({
      name: '',
      email: '',
      password: '',
    });
  };

  const handleInputName = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({ user })
      .unwrap()
      .then((payload) => {
        // eslint-disable-next-line no-console
        console.log(payload);
        toast.success('You have registered!', { autoClose: 2000 });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        toast.error('Registration canceled!', { autoClose: 2000 });
      });
    reset();
  };

  return (
    <Container>
      <ToastContainer />
      <h2 className="register-title">Registration form</h2>
      <Form onSubmit={handleSubmit}>
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
          {isLoading ? <Loader type="Circles" color="#383838" height={15} width={15} /> : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
