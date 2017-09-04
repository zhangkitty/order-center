import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox } from 'antd';
import { subchange } from './action';
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
const tipStyle = {
  background: '#ffe9a7',
  margin: '0 10px',
  padding: '0 10px',
  borderRadius: '4px',
};
const types = {
  1: __('order.goodsRefund.giftcard'),
  2: __('order.goodsRefund.wallet'),
  3: __('order.goodsRefund.users'),
};

const star = (<span style={{ color: 'red' }}>*</span>);

const Price = ({ dataSource, submitValue, dispatch }) => {
  const RLPrice = dataSource.rlFee || [];
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex' }}>
        <span className={style.descWidth}>{__('order.goodsRefund.freight_price')}{star}</span>
        <Rg
          value={submitValue.shipping}
          onChange={e => dispatch(subchange('shipping', Number(e.target.value)))}
        >
          <Radio value={0}>{__('order.goodsRefund.no_no_back')}</Radio>
          <Radio value={1}>{__('order.goodsRefund.no_back')}</Radio>
        </Rg>
      </div>
      <div style={space}>
        <span className={style.descWidth}>{__('order.goodsRefund.RL_price')}{star}</span>
        <Rg
          value={submitValue.rlFee}
          onChange={e => dispatch(subchange('rlFee', Number(e.target.value)))}
        >
          {RLPrice.map(v => (<Radio value={Number(v)} key={v}>${v}</Radio>))}
        </Rg>
      </div>
      <div style={space}>
        <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_price')}{star}</span>
        <div>
          {
            submitValue.refundPaths.map((v, i) => (
              v.isShow ?
                <Rg
                  style={i === 0 ? { display: 'flex', alignItems: 'center' } : { display: 'flex', marginTop: '5px', alignItems: 'center' }}
                  key={v.refundTypeId}
                  value={submitValue.radiochoose}
                  onChange={(e) => {
                    const value = e.target.value;
                    const arr = submitValue.refundPaths.filter(d => d.refundTypeId > 1);
                    const radio = arr.map(d => (
                      d.refundTypeId === value ?
                        assign({}, d, { check: true }) : assign({}, d, { check: false })
                    ));
                    const result = submitValue.refundPaths
                                              .filter(d => d.refundTypeId < 2).concat(radio);
                    dispatch(subchange('radiochoose', value));
                    return dispatch(subchange('refundPaths', result));
                  }}
                >
                  {
                    v.refundTypeId > 1 ?
                      <Radio value={v.refundTypeId} />
                      :
                      <Checkbox
                        onChange={e => dispatch(subchange('refundPaths', [
                          ...submitValue.refundPaths.slice(0, i),
                          assign({}, submitValue.refundPaths[i], { check: e.target.checked }),
                          ...submitValue.refundPaths.slice(i + 1),
                        ]))}
                      />
                  }
                  <span style={inline}>{types[v.refundTypeId]}</span>
                  <span style={spanWidth}>$</span>
                  <Input
                    style={{ width: '150px' }}
                    value={v.refundAmount}
                    onChange={e => dispatch(subchange('refundPaths', [
                      ...submitValue.refundPaths.slice(0, i),
                      assign({}, submitValue.refundPaths[i], {
                        refundAmount: e.target.value,
                        refundAmount2: Number(Number(e.target.value) * v.rate).toFixed(2),
                      }),
                      ...submitValue.refundPaths.slice(i + 1),
                    ]))}
                  />
                  <span style={spanWidth}>{v.currency}</span>
                  <Input
                    style={{ width: '150px' }}
                    value={v.refundAmount2}
                    onChange={e => dispatch(subchange('refundPaths', [
                      ...submitValue.refundPaths.slice(0, i),
                      assign({}, submitValue.refundPaths[i], {
                        refundAmount: Number(Number(e.target.value) * v.rate2).toFixed(2),
                        refundAmount2: e.target.value,
                      }),
                      ...submitValue.refundPaths.slice(i + 1),
                    ]))}
                  />
                  <span style={tipStyle}>{__('order.goodsRefund.no_over_price')}${v.max}</span>
                </Rg>
                : null
            ))
          }
        </div>
      </div>
    </div>
  );
};

Price.propTypes = {
  dataSource: PropTypes.shape(),
  submitValue: PropTypes.shape(),
  dispatch: PropTypes.func,
};
export default Price;
