import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { rowQuantity, selectRowQuantity } from './tumblerSlice';

const Tumbler = () => {
  const tumblerRowAmount = useSelector(selectRowQuantity);
  const dispatch = useDispatch();

  return (
    <Container>
      <Form>
        <Form.Group controlId="rowQuantity">
          <Form.Check
            value="3"
            type="radio"
            aria-label="radio 1"
            label="количество строк: 3"
            onChange={(e) => dispatch(rowQuantity(e.target.value))}
            checked={tumblerRowAmount === '3'}
          />
          <Form.Check
            value="7"
            type="radio"
            aria-label="radio 2"
            label="количество строк: 7"
            onChange={(e) => dispatch(rowQuantity(e.target.value))}
            checked={tumblerRowAmount === '7'}
          />
          <Form.Check
            value="10"
            type="radio"
            aria-label="radio 3"
            label="количество строк: 10"
            onChange={(e) => dispatch(rowQuantity(e.target.value))}
            checked={tumblerRowAmount === '10'}
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Tumbler;
