import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => (
  <div>
    <p>Загружаем...</p>
    <Spinner animation="border" variant="info" />
  </div>
);

export default Loader;
