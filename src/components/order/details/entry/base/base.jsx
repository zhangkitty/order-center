import React  from 'react';
import { Card } from 'antd';

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
export default ({ order_info: { basic_info } }) => (
  <Card>
    <div>
      {
        info.left.map(v => (
          <div key={v.key}>
            <span>{ v.name }:</span>
            <span>{basic_info[v.key]}</span>
          </div>
        ))
      }
    </div>
    <div>
      {
        info.right.map(v => (
          <div key={v.key}>
            <span>{ v.name }:</span>
            <span>{basic_info[v.key]}</span>
          </div>
        ))
      }
    </div>
  </Card>
)