import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox, Select, message } from 'antd';
import { change, changeShipping, changeRlFee, changeShippingInsurance } from './action';
import style from './style.css';

const lan = {
  运费险: '运费险',
  运费: '运费',
  不退: '不退',
  退: '退',
  运费已退: '运费已退',
  运费险已退: '运费险已退',
};
const Rg = Radio.Group;
const star = (<span style={{ color: 'red' }}>*</span>);
const myRadio =
    ({
       shipping,
       dispatch,
       dataSource,
       rlFee,
       shippingInsurance,
       hasShippingInsurancePriceRefunded,
       hasShippingPriceRefunded,
    }) => (<div>
      <div className={style.flex}>
        <span className={style.descWidth}>{lan.运费}{star}</span>
        <Rg
          value={shipping}
          onChange={(e) => {
            if (hasShippingPriceRefunded && shipping === 0) {
              return message.warning(lan.运费已退);
            }
            dispatch(change('shipping', e.target.value));
            // 改变运费
            dispatch(changeShipping(e.target.value));
          }}
        >
          <Radio value={0}>{lan.不退}</Radio>
          <Radio value={1}>{lan.退}</Radio>
        </Rg>
      </div>
      <div className={style.flex} style={{ marginTop: 5 }}>
        <span className={style.descWidth}>{lan.运费险}{star}</span>
        <Rg
          value={shippingInsurance}
          onChange={
          (e) => {
            if (hasShippingInsurancePriceRefunded && shippingInsurance === 0) {
              return message.warning(lan.运费险已退);
            }
            dispatch(change('shippingInsurance', e.target.value));
            // 改变运费险
            dispatch(changeShippingInsurance(e.target.value));
          }
        }
        >
          <Radio value={0}>{lan.不退}</Radio>
          <Radio value={1}>{lan.退}</Radio>
        </Rg>
      </div>
      <div className={style.space}>
        <span className={style.descWidth}>{__('order.goodsRefund.RL_price')}{star}</span>
        <Rg
          value={rlFee}
          onChange={(e) => {
            dispatch(change('rlFee', e.target.value));
        // rl费用的行为
            dispatch(changeRlFee(e.target.value));
          }}
        >
          {dataSource.rlFee.map(v => (<Radio value={v.amount} key={v.amount}>{v.amountWithSymbol}</Radio>))}
        </Rg>
      </div>

    </div>);

export default myRadio;

