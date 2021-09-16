import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { useGetStubTableQuery } from './stubTableApi';
import { selectRowQuantity } from '../tumbler/tumblerSlice';
import PaginationPanel from '../paginationPanel/PaginationPanel';

const StubTable = () => {
  const rowAmount = useSelector(selectRowQuantity);
  // eslint-disable-next-line no-unused-vars
  const { data, isError, isLoading, isSuccess } = useGetStubTableQuery(rowAmount);
  // const dispatch = useDispatch();
  // eslint-disable-next-line no-console

  return (
    <div className="text-center">
      {isLoading && <Loader />}
      {isSuccess && <PaginationPanel data={data} />}
      {isError && <h3>Something went wrong ...</h3>}
    </div>
  );
};

export default StubTable;
