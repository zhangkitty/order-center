import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Input } from 'antd';
import { subchange } from './action';
import style from './style.css';

const spanWidth = {
  margin: '0 5px',
};

const star = (<span style={{ color: 'red' }}>*</span>);

const Price = ({ submitValue, dispatch }) => {
  return (
    <div className={style.spaceBg}>
      <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_price')}{star}:</span>
      <div>
        {
          submitValue.recordList.map((v, i) => (
            <div className={style.flex_center}>
              <div className={style.flex_left}>
                <span className={style.flex_name}>{v.refundPathName}</span>
                <span style={spanWidth}>$</span>
              </div>
              <div>
                <Input
                  style={{ width: '150px' }}
                  value={v.refundAmount}
                  onChange={e => dispatch(subchange('recordList', [
                    ...submitValue.recordList.slice(0, i),
                    assign({}, submitValue.recordList[i], {
                      refundAmount: e.target.value,
                      refundAmount2: Number(Number(e.target.value) * v.rate).toFixed(2),
                    }),
                    ...submitValue.recordList.slice(i + 1),
                  ]))}
                />
                <span style={spanWidth}>{v.currency}</span>
                <Input
                  style={{ width: '150px' }}
                  value={v.refundAmount2}
                  onChange={e => dispatch(subchange('recordList', [
                    ...submitValue.recordList.slice(0, i),
                    assign({}, submitValue.recordList[i], {
                      refundAmount: Number(Number(e.target.value) * v.rate2).toFixed(2),
                      refundAmount2: e.target.value,
                    }),
                    ...submitValue.recordList.slice(i + 1),
                  ]))}
                />
                <span className={style.titleBg}>{__('order.goodsRefund.no_over_price')}${v.max}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

Price.propTypes = {
  submitValue: PropTypes.shape(),
  dispatch: PropTypes.func,
};
export default Price;
