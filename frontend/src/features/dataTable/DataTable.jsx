import React from 'react';
import { useSelector } from 'react-redux';
import sortObjectArray from 'sort-objects-array';
import { useGetDTableQuery } from './dataTableApi';
import { selectRowQuantity } from '../tumbler/tumblerSlice';
import TableView from '../tableView/TableView';
import Spinner from '../../components/Spinner';

const DataTable = () => {
  const rowAmount = useSelector(selectRowQuantity);
  const { data, isError, isLoading, isSuccess } = useGetDTableQuery(rowAmount);

  return (
    <div className="text-center">
      {isLoading && <Spinner height={100} width={100} />}
      {isSuccess && <TableView data={sortObjectArray(data, 'id', 'desc')} />}
      {isError && <h3>Something went wrong ...</h3>}
    </div>
  );
};

export default DataTable;
