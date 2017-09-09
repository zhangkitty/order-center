import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import style from '../style.css';

const info = {
  left: [
    { name: '下单日期', key: 'add_time' },
    { name: '支付方式', key: 'payment_method' },
    { name: '来源站点', key: 'site_from' },
    { name: '运输方式', key: 'shipping_method' },
    { name: '花费时间', key: 'spend_time' },

  ],
  right: [
    { name: '付款日期', key: 'pay_time' },
    { name: 'IP', key: 'ip' },
    { name: '来源国家', key: 'ip_country' },
  ],
};
// TODO: lan
const Base = ({ dataSource: { base: { order_info: { basic_info } } } }) => (
  <Card title="基本信息" bodyStyle={{ display: 'flex', width: '100%' }} style={{ width: '100%', margin: '20px 0' }}>
    <div>
      {
        info.left.map(v => (
          <div key={v.key} >
            <span className={style.spanWidth}>{ v.name }: </span>
            <span>{basic_info[v.key]}</span>
          </div>
        ))
      }
    </div>
    <div style={{ marginLeft: '20px' }}>
      {
        info.right.map(v => (
          <div key={v.key}>
            <span className={style.spanWidth}>{ v.name }: </span>
            <span>{basic_info[v.key]}</span>
          </div>
        ))
      }
    </div>
  </Card>
);
Base.propTypes = {
  dataSource: PropTypes.shape(),
};
export default Base;
