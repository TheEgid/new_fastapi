import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import sortObjectArray from 'sort-objects-array';
import { useGetSimpleTableQuery } from './simpleTableSlice';
import Loader from '../../components/Loader';
import DirectionSort from '../../components/DirectionSort';

const SimpleTable = (props) => {
  const { rowAmount } = props;
  const { data, isError, isLoading } = useGetSimpleTableQuery(rowAmount);

  const [targetValue, setTargetValue] = useState('id');
  const [direction, setDirection] = useState('asc');

  const sortTable = (val) => {
    if (targetValue !== val) {
      setDirection('asc');
      setTargetValue(val);
      return;
    }
    if (direction === '' || direction === 'desc') {
      setDirection('asc');
    }
    if (direction === 'asc') {
      setDirection('desc');
    }
    setTargetValue(val);
  };

  return (
    <div className="text-center">
      {isLoading && <Loader />}
      {data && sortObjectArray(data, 'id', 'asc') && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th id="id" onClick={() => sortTable('id')}>
                  id
                  {targetValue === 'id' ? <DirectionSort direction={direction} /> : null}
                </th>
                <th id="firstName" onClick={() => sortTable('firstName')}>
                  firstName
                  {targetValue === 'firstName' ? <DirectionSort direction={direction} /> : null}
                </th>
                <th>Второй</th>
                <th>Третий</th>
                <th>Четвертый</th>
                <th>Пятый</th>
              </tr>
            </thead>
            <tbody>
              {sortObjectArray(data, targetValue, direction).map((row) => (
                <tr key={row.email}>
                  <td>{row.id}</td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.email}</td>
                  <td>{row.address.streetAddress}</td>
                  <td>{row.address.city}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {isError && <h3>Something went wrong ...</h3>}
    </div>
  );
};

SimpleTable.propTypes = {
  rowAmount: PropTypes.string,
};

SimpleTable.defaultProps = {
  rowAmount: '30',
};

export default SimpleTable;
