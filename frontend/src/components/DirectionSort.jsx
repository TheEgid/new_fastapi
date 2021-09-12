import React from 'react';
import PropTypes from 'prop-types';
import { SortDown, SortUpAlt } from 'react-bootstrap-icons';

const DirectionSort = (props) => {
  const { direction } = props;
  return direction === 'desc' ? (
    <>
      {' '}
      <SortDown />{' '}
    </>
  ) : (
    <>
      {' '}
      <SortUpAlt />{' '}
    </>
  );
};

DirectionSort.propTypes = {
  direction: PropTypes.string,
};

DirectionSort.defaultProps = {
  direction: 'asc',
};

export default DirectionSort;
