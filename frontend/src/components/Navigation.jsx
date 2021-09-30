import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query/react';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Loader from './Loader';
import { useFetchCurrentUserQuery, useLogoutUserMutation } from '../features/user/userApi';
import {
  getIsLoggedIn,
  getUserName,
  getUserToken,
  setCurrentUser,
  removeCredetials,
} from '../features/authorization/authorizationSlice';
import 'react-toastify/dist/ReactToastify.css';

const Navigation = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn);
  const token = useSelector(getUserToken);
  const name = useSelector(getUserName);

  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const { data, isSuccess } = useFetchCurrentUserQuery(token ?? skipToken);
  const currentUser = isSuccess === true ? data : 'nodata';

  useEffect(() => {
    if (token === null) {
      return;
    }
    dispatch(setCurrentUser(currentUser));
  }, [dispatch, currentUser, token]);

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      dispatch(removeCredetials(result.data));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <div className="header">
      <ToastContainer />
      <Container>
        <Navbar expand="lg" bg="nav">
          <Navbar.Brand as={NavLink} to="/">
            СайтеГ
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {isLoggedIn && (
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/contacts">
                  Контакты
                </Nav.Link>
              </Nav>
            )}
            {isLoggedIn ? (
              <Nav>
                <Navbar.Text className="nav-title">
                  Вы вошли как <strong>{name}</strong>
                </Navbar.Text>
                <Button type="button" variant="light" onClick={handleLogout} disabled={isLoading}>
                  {isLoading ? <Loader /> : 'Exit'}
                </Button>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link as={NavLink} to="/login">
                  Войти
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Зарегистрироваться
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default Navigation;
