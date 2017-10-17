import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Input, InputNumber } from 'antd';
import { subchange } from './action';
import style from './style.css';

const star = (<span style={{ color: 'red' }}>*</span>);

const Price = ({ submitValue, dispatch }) => {
  return (
    <div className={style.space}>
      <span className={style.descWidth}>{__('order.entry.cash_content5')}{star}:</span>

      <div className={style.flex_center}>
        <span className={style.flex_span}>$</span>
        <div>
          <Input
            type="number"
            className={style.flex_input}
            value={submitValue.refundAmount}
            onChange={(e) => {
              dispatch(subchange('refundAmount', e.target.value));
              dispatch(subchange('refundAmount2', Number(Number(e.target.value) * submitValue.rate2).toFixed(2)));
            }}
          />
          <span
            className={style.flex_span}
            dangerouslySetInnerHTML={{ __html: submitValue.currency }}
          />
          <Input
            type="number"
            className={style.flex_input}
            value={submitValue.refundAmount2}
            onChange={(e) => {
              dispatch(subchange('refundAmount', Number(Number(e.target.value) / submitValue.rate2).toFixed(2)));
              dispatch(subchange('refundAmount2', e.target.value));
            }}
          />
          <span className={style.tipStyle}>
            {__('order.goodsRefund.no_over_price')}
            $
            { Number(submitValue.max).toFixed(2) }
          </span>
        </div>
      </div>
    </div>
  );
};

Price.propTypes = {
  submitValue: PropTypes.shape(),
  dispatch: PropTypes.func,
};
export default Price;
