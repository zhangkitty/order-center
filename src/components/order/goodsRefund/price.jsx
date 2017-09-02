import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Input } from 'antd';
import style from './style.css';

const Rg = Radio.Group;

const space = {
  display: 'flex',
  marginTop: '15px',
};
const inline = {
  width: '70px',
  display: 'inline-block',
};
const spanWidth = {
  margin: '0 15px',
};
const types = {
  1: __('order.goodsRefund.giftcard'),
  2: __('order.goodsRefund.wallet'),
  3: __('order.goodsRefund.users'),
};
const star = (<span style={{ color: 'red' }}>*</span>);
const Price = ({ dataSource }) => {
  const priceType = dataSource.orderRefundPathList;
  const RLPrice = dataSource.rlFee || [];
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex' }}>
        <span className={style.descWidth}>{__('order.goodsRefund.freight_price')}{star}</span>
        <Rg>
          <Radio value="noback">均不退</Radio>
          <Radio value="back">均退</Radio>
        </Rg>
      </div>
      <div style={space}>
        <span className={style.descWidth}>{__('order.goodsRefund.RL_price')}{star}</span>
        <Rg>
          {RLPrice.map(v => (<Radio value={v.id} key={v.id}>${v.value}</Radio>))}
        </Rg>
      </div>
      <div style={space}>
        <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_price')}{star}</span>
        <Rg>
          {
            priceType.map((v, i) => (
              v.isShow ?
                <div
                  style={i === 0 ? { display: 'flex', alignItems: 'center' } : { display: 'flex', marginTop: '5px', alignItems: 'center' }}
                  key={v.refundPathName}
                >
                  <Radio value={v.refundPathId}>
                    <span style={inline}>{types[v.refundPathId]}</span>
                  </Radio>
                  <span style={spanWidth}>$</span>
                  <Input width="100px" />
                  <span style={spanWidth}>{v.priceWithExchangeRate.symbol}</span>
                  <Input width="100px" />
                </div>
                : null
            ))
          }
        </Rg>
      </div>
    </div>
  );
};

Price.propTypes = {
  dataSource: PropTypes.shape(),
};
export default Price;
