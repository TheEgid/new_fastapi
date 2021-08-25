import React from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Pokemon from './features/pokemon/Pokemon';
import { selectbaseViewCondition, switcher } from './features/baseView/baseViewSlice';
import SimpleTable from './features/simpleTable/SimpleTable';
import Tumbler from './features/tumbler/Tumbler';
import { selectRowQuantity } from './features/tumbler/tumblerSlice';

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
      <BaseView />
      <Pokemon firstName="eevee" />
      <Pokemon firstName="rattata" />
    </div>
  </Container>
);

export default App;
