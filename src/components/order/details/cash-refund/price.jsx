import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Input } from 'antd';
import { subchange } from './action';
import style from './style.css';

const space = {
  display: 'flex',
  marginTop: '15px',
  marginBottom: '20px',
};
const inline = {
  width: '70px',
  display: 'inline-block',
  padding: 0,
};
const spanWidth = {
  margin: '0 15px',
};
const tipStyle = {
  background: '#ffe9a7',
  margin: '0 10px',
  padding: '0 10px',
  borderRadius: '4px',
};

const star = (<span style={{ color: 'red' }}>*</span>);

const Price = ({ submitValue, dispatch }) => {
  return (
    <div style={space}>
      <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_price')}{star}:</span>
      <div>
        {
          submitValue.refundList.map((v, i) => (
            <div className={style.flex_center}>
              <div style={{ width: 150 }}>
                <span style={inline}>{v.refundPathName}</span>
                <span style={spanWidth}>$</span>
              </div>
              <div>
                <Input
                  style={{ width: '150px' }}
                  value={v.refundAmount}
                  onChange={e => dispatch(subchange('refundList', [
                    ...submitValue.refundList.slice(0, i),
                    assign({}, submitValue.refundList[i], {
                      refundAmount: e.target.value,
                      refundAmount2: Number(Number(e.target.value) * v.rate).toFixed(2),
                    }),
                    ...submitValue.refundList.slice(i + 1),
                  ]))}
                />
                <span style={spanWidth}>{v.currency}</span>
                <Input
                  style={{ width: '150px' }}
                  value={v.refundAmount2}
                  onChange={e => dispatch(subchange('refundList', [
                    ...submitValue.refundList.slice(0, i),
                    assign({}, submitValue.refundList[i], {
                      refundAmount: Number(Number(e.target.value) * v.rate2).toFixed(2),
                      refundAmount2: e.target.value,
                    }),
                    ...submitValue.refundList.slice(i + 1),
                  ]))}
                />
                <span style={tipStyle}>{__('order.goodsRefund.no_over_price')}${v.max}</span>
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
