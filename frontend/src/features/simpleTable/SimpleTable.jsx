import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import sortObjectArray from 'sort-objects-array';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import DirectionSort from '../../components/DirectionSort';
import { useGetSimpleTableQuery } from './simpleTableApi';
import {
  setDirectionOrder,
  setColumnName,
  selectDirection,
  selectColumnName,
} from './simpleTableSlice';

const SimpleTable = (props) => {
  const { rowAmount } = props;
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useGetSimpleTableQuery(rowAmount);

  const direction = useSelector(selectDirection);
  const columnName = useSelector(selectColumnName);

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
      {isLoading && <Loader />}
      {data && sortObjectArray(data, 'id', 'asc') && (
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
              {sortObjectArray(data, columnName, direction).map((row) => (
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
