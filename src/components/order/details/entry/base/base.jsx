import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import style from '../style.css';

const lan = {
  下单日期: __('order.entry.buy_date'),
  支付方式: __('order.entry.pay_method'),
  来源站点: __('order.entry.source_site'),
  运输方式: __('order.entry.track_method'),
  花费时间: __('order.entry.waist_time'),
  付款日期: __('order.entry.pay_date'),
  来源国家: __('order.entry.source_country'),
  基本信息: __('order.entry.base_desc'),
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
  <Card
    title={lan.基本信息}
   // bodyStyle={{ display: 'flex', maxWidth: '1200px' }}
    className={style.baseBg}
  >
    <div className={style.baseContent}>
      <div className={style.baseRight}>
        {
          info.left.map(v => (
            <div key={v.key} >
              <span className={style.spanWidth}>{ v.name }: </span>
              <span>{basic_info[v.key]}</span>
            </div>
          ))
        }
      </div>
      <div className={style.baseRight}>
        {
          info.right.map(v => (
            <div key={v.key}>
              <span className={style.spanWidth}>{ v.name }: </span>
              <span>{basic_info[v.key]}</span>
            </div>
          ))
        }
      </div>
    </div>
  </Card>
);
Base.propTypes = {
  dataSource: PropTypes.shape(),
};
export default Base;
