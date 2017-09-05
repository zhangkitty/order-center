import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox } from 'antd';
import { subchange, activation } from './action';
import style from './style.css';

const Rg = Radio.Group;

const space = {
  display: 'flex',
  marginTop: '15px',
};
const inline = {
  width: '90px',
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
  4: __('order.diffRefund.overflow'),
};

const star = (<span style={{ color: 'red' }}>*</span>);

const Price = ({ dataSource, submitValue, dispatch, active }) => (
  <div style={{ marginBottom: '15px' }}>
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
                  <div
                    style={i === 0 ? { display: 'flex', alignItems: 'center' } : { display: 'flex', marginTop: '5px', alignItems: 'center' }}
                    key={v.refundTypeId}
                  >
                    {
                    v.refundTypeId == 2 || v.refundTypeId == 3 ?
                      <Radio value={v.refundTypeId} />
                      :
                      <Checkbox
                        defaultChecked={false}
                        style={v.refundTypeId == 1 ? { display: '' } : { display: 'none' }}
                        onChange={(e) => {
                          dispatch(subchange('refundPaths', [
                            ...submitValue.refundPaths.slice(0, i),
                            assign({}, submitValue.refundPaths[i], { check: e.target.checked }),
                            ...submitValue.refundPaths.slice(i + 1),
                          ]));
                        }}
                      />
                    }

                    <span style={inline}>{types[v.refundTypeId]}</span>
                    {
                      v.refundTypeId !== 4 ?
                        <span style={spanWidth}>$</span>:<span style={{margin:"0 37px"}}>$</span>
                    }

                    {
                      v.refundTypeId !== 4 ?
                        <Input
                          style={{ width: '150px' }}
                          value={v.refundAmount}
                          disabled={!submitValue.refundPaths[i].check}
                          onChange={(e) => {
                            dispatch(subchange('refundPaths', [
                              ...submitValue.refundPaths.slice(0, i),
                              assign({}, submitValue.refundPaths[i], {
                                refundAmount: e.target.value,
                                refundAmount2: Number(Number(e.target.value) * v.rate).toFixed(2),
                              }),
                              ...submitValue.refundPaths.slice(i + 1),
                            ]));
                          }}
                          onBlur={
                            (e) => {
                              if (e.target.value == v.max && v.refundTypeId == 3) {
                                dispatch(activation(false));
                              }
                            }
                          }
                        />
                        :
                        <Input
                          style={{ width: '150px' ,marginLeft:'-23px'}}
                          value={v.refundAmount}
                          disabled={active}
                          onChange={(e) => {
                            dispatch(subchange('refundPaths', [
                              ...submitValue.refundPaths.slice(0, i),
                              assign({}, submitValue.refundPaths[i], {
                                refundAmount: e.target.value,
                                refundAmount2: Number(Number(e.target.value) * v.rate).toFixed(2),
                              }),
                              ...submitValue.refundPaths.slice(i + 1),
                            ]));
                          }}
                          onBlur={
                            (e) => {
                              if (e.target.value == v.max && v.refundTypeId == 3) {
                                dispatch(activation(false));
                              }
                            }
                          }
                        />
                    }

                    <span style={spanWidth}>{v.symbol}</span>
                    {
                      v.refundTypeId !== 4 ?
                        <Input
                          disabled={!submitValue.refundPaths[i].check}
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
                        :
                        <Input
                          disabled={active}
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
                    }

                    <Input
                      disabled={active}
                      type="text"
                      style={v.refundTypeId == 4 ? { display: '', width: '150px', marginLeft: '20px' } : { display: 'none' }}
                      placeholder={__('order.diffRefund.placeholder')}
                    />
                    <span style={tipStyle}>{__('order.goodsRefund.no_over_price')}${v.max}</span>
                  </div>
                </Rg>
                : null

            ))

        }

      </div>
    </div>
  </div>
  );

Price.propTypes = {
  dataSource: PropTypes.shape(),
  submitValue: PropTypes.shape(),
  dispatch: PropTypes.func,
  max: PropTypes.number,
};
export default Price;
