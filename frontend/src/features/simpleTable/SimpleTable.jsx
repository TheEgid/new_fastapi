import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import { useGetSimpleTableQuery } from './simpleTableSlice';
import Loader from '../../components/Loader';

const SimpleTable = (props) => {
  const { rowAmount } = props;
  const { data, isError, isLoading } = useGetSimpleTableQuery(rowAmount);
  return (
    <div className="text-center">
      {isLoading && <Loader />}
      {data && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Нулевой</th>
                <th>Первый</th>
                <th>Второй</th>
                <th>Третий</th>
                <th>Четвертый</th>
                <th>Пятый</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.email}>
                  <td>{row.id}</td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.email}</td>
                  <td>
                    {row.address.streetAddress} {row.address.state}
                  </td>
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
  rowAmount: '3',
};

export default SimpleTable;
