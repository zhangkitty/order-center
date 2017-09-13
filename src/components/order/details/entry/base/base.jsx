import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import style from '../style.css';

// TODO: lan
const lan = {
  下单日期: '下单日期',
  支付方式: '支付方式',
  来源站点: '来源站点',
  运输方式: '运输方式',
  花费时间: '花费时间',
  付款日期: '付款日期',
  来源国家: '来源国家',
  基本信息: '基本信息',
};
const info = {
  left: [
    { name: lan.下单日期, key: 'add_time' },
    { name: lan.支付方式, key: 'payment_method' },
    { name: lan.来源站点, key: 'site_from' },
    { name: lan.运输方式, key: 'shipping_method' },
    { name: lan.花费时间, key: 'spend_time' },

  ],
  right: [
    { name: lan.付款日期, key: 'pay_time' },
    { name: 'IP', key: 'ip' },
    { name: lan.来源国家, key: 'ip_country' },
  ],
};

const Base = ({ dataSource: { base: { order_info: { basic_info } } } }) => (
  <Card title={lan.基本信息} bodyStyle={{ display: 'flex', maxWidth: '1200px' }} style={{ width: '100%', margin: '20px 0' }}>
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
