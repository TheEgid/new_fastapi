import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectbaseViewCondition, switchView } from './baseViewSlice';
import Tumbler from '../tumbler/Tumbler';
import StubTable from '../stubTable/StubTable';

const BaseView = () => {
  const stateOnOff = useSelector(selectbaseViewCondition);
  const dispatch = useDispatch();

  return (
    <>
      <Button variant="info" onClick={() => dispatch(switchView())}>
        Посмотреть изменения базы данных
      </Button>
      <br />
      {stateOnOff === true && <Tumbler />}
      <br />
      {stateOnOff === true && <StubTable />}
    </>
  );
};

export default BaseView;
