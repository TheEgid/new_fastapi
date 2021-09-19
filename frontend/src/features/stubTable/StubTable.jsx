import React from 'react';
import { useSelector } from 'react-redux';
import sortObjectArray from 'sort-objects-array';
import Loader from '../../components/Loader';
import { useGetStubTableQuery } from './stubTableApi';
import { selectRowQuantity } from '../tumbler/tumblerSlice';
import OnlyTable from '../onlyTable/OnlyTable';

const StubTable = () => {
  const rowAmount = useSelector(selectRowQuantity);
  const { data, isError, isLoading, isSuccess } = useGetStubTableQuery(rowAmount);

  return (
    <div className="text-center">
      {isLoading && <Loader />}
      {isSuccess && <OnlyTable data={sortObjectArray(data, 'id', 'desc')} />}
      {isError && <h3>Something went wrong ...</h3>}
    </div>
  );
};

export default StubTable;
