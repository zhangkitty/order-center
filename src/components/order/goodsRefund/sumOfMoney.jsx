import React from 'react';
import { Alert } from 'antd';
import style from './style.css';

const infoStyle = {
  fontSize: '13px',
  margin: '5px 15px',
};
const infoStyle2 = {
  fontSize: '13px',
  margin: '5px 15px',
  color: 'red',
};
const SumOfMoney = () => (
  <div style={{ display: 'flex' }}>
    <span className={style.descWidth}>{__('order.diffRefund.order_amount')}:</span>
    <div className={style.sumofmoney_left} >
      <Alert message="实付金额: $90.00   EUR: 91.10" type="warning" style={infoStyle} />
      <Alert message="礼品卡：50.00" type="warning" style={infoStyle} />
      <Alert message="钱包：$10.00" type="warning" style={infoStyle} />
      <Alert message="worldpay：$30" type="warning" style={infoStyle} />
      <Alert message="运费：$5.99" type="warning" style={infoStyle} />
      <Alert message="运费险：$0.99" type="warning" style={infoStyle} />
      <Alert message="积分：-$4.00" type="warning" style={infoStyle} />
      <Alert message="优惠券抵扣金额：-$20.00" type="warning" style={infoStyle} />
    </div>
    <span className={style.descWidth}>{__('order.diffRefund.refund_amount')}:</span>
    <div className={style.sumofmoney_left}>
      <Alert message="订单剩余可退金额：$63.00    EUR 64.00" type="error" style={infoStyle2} />
      <Alert message="礼品卡可退金额：$30.00     EUR33.00" type="error" style={infoStyle2} />
      <Alert message="钱包或用户可退金额：$33.00    EUR35.00" type="error" style={infoStyle2} />
      <Alert message="待退金额：$30.00  EUR 30.00" type="error" style={infoStyle2} />
    </div>
  </div>
);
export default SumOfMoney;
