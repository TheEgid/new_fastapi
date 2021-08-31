import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectRowQuantity } from './features/tumbler/tumblerSlice';
import { selectbaseViewCondition, switcher } from './features/baseView/baseViewSlice';
import Pokemon from './features/pokemon/Pokemon';
import FileInputForm from './features/fileInputForm/FileInputForm';
import Tumbler from './features/tumbler/Tumbler';
import SimpleTable from './features/simpleTable/SimpleTable';

import './custom.scss';

const BaseView = () => {
  const onOff = useSelector(selectbaseViewCondition);
  const dispatch = useDispatch();
  const tumblerRowAmount = useSelector(selectRowQuantity);

  return (
    <>
      <Button variant="info" onClick={() => dispatch(switcher())}>
        Посмотреть изменения базы данных
      </Button>
      <br />
      {onOff === true && <br />}
      {onOff === true && <Tumbler />}
      <br />
      {onOff === true && <SimpleTable rowAmount={tumblerRowAmount} />}
    </>
  );
};

const App = () => (
  <Container>
    <div>
      <FileInputForm />
      <BaseView />
      <Pokemon firstName="eevee" />
      <Pokemon firstName="rattata" />
    </div>
  </Container>
);

export default App;
