import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';

const Spinner = ({ height, width }) => (
  <div className="spinner">
    <p>Загружаем...</p>
    <Loader type="Circles" color="#000000" height={height} width={width} />
  </div>
);

Spinner.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

Spinner.defaultProps = {
  height: 15,
  width: 15,
};

export default Spinner;
