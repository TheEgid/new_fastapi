import React from 'react';
import Table from 'react-bootstrap/Table';
import sortObjectArray from 'sort-objects-array';
import { useDispatch, useSelector } from 'react-redux';
import DirectionSort from '../../components/DirectionSort';

import {
  setDirectionOrder,
  setColumnName,
  selectDirection,
  selectColumnName,
} from './onlyTableSlice';

// eslint-disable-next-line react/prop-types
const OnlyTable = ({ indata }) => {
  const dispatch = useDispatch();
  const direction = useSelector(selectDirection);
  const columnName = useSelector(selectColumnName);

  // eslint-disable-next-line no-unused-vars
  const sortTable = (val) => {
    const defaultDirection = 'asc';
    if (columnName !== val) {
      dispatch(setDirectionOrder(defaultDirection)); // new target
    } else {
      const directionsMap = { asc: 'desc', desc: 'asc' }; // old target, just swap direction
      const newDirection = directionsMap[direction];
      dispatch(setDirectionOrder(newDirection === undefined ? defaultDirection : newDirection));
    }
    dispatch(setColumnName(val));
  };

  return (
    <div className="text-center">
      {indata && sortObjectArray(indata, 'id', 'asc') && (
        <>
          <Table striped bordered hover>
            <thead className="table-success">
              <tr>
                <th id="id" onClick={() => sortTable('id')}>
                  id
                  {columnName === 'id' ? <DirectionSort direction={direction} /> : null}
                </th>
                <th id="firstName" onClick={() => sortTable('firstName')}>
                  firstName
                  {columnName === 'firstName' ? <DirectionSort direction={direction} /> : null}
                </th>
                <th>Второй</th>
                <th>Третий</th>
                <th>Четвертый</th>
                <th>Пятый</th>
              </tr>
            </thead>
            <tbody>
              {sortObjectArray(indata, columnName, direction).map((row) => (
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
    </div>
  );
};

export default OnlyTable;
