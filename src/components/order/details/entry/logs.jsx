import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const Logs = (
  {
    dataSource: { logs },
  },
  ) => (
    <div style={{ padding: '15px' }}>
      {
        logs.map(({ id, user_name, content, last_update_time }) => (
          <div key={id} className={style.payLog}>
            <span className={style.paymentInline}>{last_update_time}</span>
            <span className={style.paymentInline}>{user_name}</span>
            <span className={style.paymentInline}>{content}</span>
          </div>
    ))
  }
    </div>
);
Logs.propTypes = {
  dataSource: PropTypes.shape(),
};
export default Logs;
