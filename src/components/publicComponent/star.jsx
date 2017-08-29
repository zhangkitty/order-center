/**
 * Created by brook on 2017/1/11.
 */
import React from 'react';
import PropTypes from 'prop-types';

const StarSpan = ({ color, text, style = {}, className = '' }) => {
  const colora = { color: color || 'red' };
  return (
    <span className={className} style={style}>
      <span style={colora}>*</span>
      {text}
    </span>
  );
};
StarSpan.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({
    color: PropTypes.string,
  }),
};

export default StarSpan;
