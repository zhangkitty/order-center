import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import style from './style.css';

const Logs = (
  {
    dataSource: { logs },
  },
  ) => (
    <div className={style.contentPadding}>
      {
        logs.length > 0 ?
        logs.map(({ id, user_name, content, last_update_time }) => (
          <div key={id} className={style.payLog}>
            <span className={style.paymentInline}>{last_update_time}</span>
            <span className={style.paymentInline}>{user_name}</span>
            <span className={style.paymentInline}>{content}</span>
          </div>
        ))
          : <div style={{ textAlign: 'center', color: 'rgba(0,0,0, .8)' }}><Icon type="frown-o" /> {__('common.contentTitle')}</div>
      }
    </div>
);
Logs.propTypes = {
  dataSource: PropTypes.shape(),
};
export default Logs;
