import React from 'react';
import Container from 'react-bootstrap/Container';
import FileInputForm from './features/fileInputForm/FileInputForm';
import BaseView from './features/baseView/BaseView';

import './custom.scss';

const App = () => (
  <Container>
    <div>
      <FileInputForm />
      <BaseView />
    </div>
  </Container>
);

export default App;
