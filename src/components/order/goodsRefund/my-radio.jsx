import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox, Select, message } from 'antd';
import { change, changeShipingAndInsurance,changeRlFee } from './action';
import style from './style.css';

const Rg = Radio.Group;
const star = (<span style={{ color: 'red' }}>*</span>);
const myRadio = ({ shipping, dispatch, dataSource, rlFee }) => (<div>
  <div className={style.flex}>
    <span className={style.descWidth}>{__('order.goodsRefund.freight_price')}{star}</span>
    <Rg
      value={shipping}
      onChange={(e) => {
        dispatch(change('shipping', e.target.value));
        // 运费和运费险的行为
        dispatch(changeShipingAndInsurance(e.target.value));
      }}
    >
      <Radio value={0}>{__('order.goodsRefund.no_no_back')}</Radio>
      <Radio value={1}>{__('order.goodsRefund.no_back')}</Radio>
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

