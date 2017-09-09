import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const cardSpanStyle = { display: 'inline-block', width: '250px' };
const Logs = (
  {
    dataSource: { logs },
  },
  ) => (
    <div style={{ padding: '15px' }}>
      {
        logs.map(({ id, user_name, content, last_update_time }) => (
          <div key={id} className={style.payLog}>
            <span style={cardSpanStyle}>{last_update_time}</span>
            <span style={cardSpanStyle}>{user_name}</span>
            <span style={cardSpanStyle}>{content}</span>
          </div>
    ))
  }
    </div>
);
Logs.propTypes = {
  dataSource: PropTypes.shape(),
};
export default Logs;
