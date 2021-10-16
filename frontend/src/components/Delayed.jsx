import React from 'react';
import PropTypes from 'prop-types';

function Delayed({ mock, waitBeforeShow, children }) {
  const [hidden, setHidden] = React.useState(true);

  React.useEffect(() => {
    const delay = setTimeout(() => setHidden(false), waitBeforeShow);
    return () => clearTimeout(delay);
  }, [waitBeforeShow]);

  return hidden ? children : mock;
}

Delayed.propTypes = {
  mock: PropTypes.string.isRequired,
  waitBeforeShow: PropTypes.number.isRequired,
};

export default Delayed;
