/**
 *  Create by liufeng on 2017/9/20
 *  提现退款 金额
 *  以 下单币种为准，美金金额是通过下单币种算过来的。
 *  提交也主要是  下单币种的金额。
 */
import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Input, InputNumber } from 'antd';
import { subchange, changeAmount, changeCurrency } from './action';
import style from './style.css';

const star = (<span style={{ color: 'red' }}>*</span>);

const Price = ({ submitValue, dispatch, dataSource }) => (
  <div className={style.space}>
    <span className={style.descWidth}>{__('order.entry.cash_content5')}{star}:</span>

    <div className={style.flex_center}>
      <span className={style.flex_span}>$</span>
      <div>
        <Input
          type="number"
          className={style.flex_input}
          value={submitValue.refundAmount}
          disabled={!dataSource.isUsd}
          onChange={(e) => {
            dispatch(subchange('refundAmount', e.target.value));
            dispatch(subchange('refundCurrency', Number(Number(e.target.value) * submitValue.rate2).toFixed(2))); // 取消，美元填写
            dispatch(changeAmount());
          }}
        />
        <span
          className={style.flex_span}
          dangerouslySetInnerHTML={{ __html: submitValue.currency }}
        />
        <Input
          type="number"
          className={style.flex_input}
          value={submitValue.refundCurrency}
          disabled={!!dataSource.isUsd}
          onChange={(e) => {
            dispatch(subchange('refundAmount', Number(Number(e.target.value) / submitValue.rate2).toFixed(2)));
            dispatch(subchange('refundCurrency', e.target.value));
            dispatch(changeCurrency());
          }}
        />
        <span className={style.tipStyle}>
          {__('order.goodsRefund.no_over_price')}
          {
            dataSource.isUsd ? `$${Number(submitValue.max).toFixed(2)}` : `${submitValue.currency}${Number(submitValue.max).toFixed(2)}`
          }
        </span>
      </div>
    </div>
  </div>
  );

Price.propTypes = {
  submitValue: PropTypes.shape(),
  dispatch: PropTypes.func,
  dataSource: PropTypes.shape(),
};
export default Price;
