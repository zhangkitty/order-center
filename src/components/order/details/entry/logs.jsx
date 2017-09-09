import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

// const data = [
//  {
//    id: '5511',
//    user_name: '林祯',
//    content: '订单 PPC900004 已抓取',
//    last_update_time: '2017-08-25 09:16:30',
//  },
//  {
//    id: '5562',
//    user_name: '林祯',
//    content: '礼品卡退款$1,成功',
//    last_update_time: '2017-08-25 17:00:36',
//  },
//  {
//    id: '5563',
//    user_name: '林祯',
//    content: '礼品卡退款$18.81,成功',
//    last_update_time: '2017-08-25 17:01:33',
//  },
//  {
//    id: '5564',
//    user_name: '林祯',
//    content: '钱包退款$1.19,成功',
//    last_update_time: '2017-08-25 17:01:33',
//  },
// ];
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
