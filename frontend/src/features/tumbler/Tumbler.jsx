import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { changeRowQuantity, selectRowQuantity } from './tumblerSlice';

const Tumbler = () => {
  const tumblerRowAmount = useSelector(selectRowQuantity);
  const dispatch = useDispatch();

  return (
    <Container>
      <Form>
        <Form.Group controlId="rowQuantity">
          <Form.Check
            value="30"
            type="radio"
            aria-label="radio 1"
            label="количество строк: 30"
            onChange={(e) => dispatch(changeRowQuantity(e.target.value))}
            checked={tumblerRowAmount === '30'}
          />
          <Form.Check
            value="70"
            type="radio"
            aria-label="radio 2"
            label="количество строк: 70"
            onChange={(e) => dispatch(changeRowQuantity(e.target.value))}
            checked={tumblerRowAmount === '70'}
          />
          <Form.Check
            value="100"
            type="radio"
            aria-label="radio 3"
            label="количество строк: 100"
            onChange={(e) => dispatch(changeRowQuantity(e.target.value))}
            checked={tumblerRowAmount === '100'}
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Tumbler;
