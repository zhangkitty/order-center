import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox, Select, message } from 'antd';
import { subchange, checkPath, usPriceChange, otherPriceChange, allback, copyPaymentMethod } from './action';
import style from './style.css';

const Rg = Radio.Group;
const Option = Select.Option;
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
const types = {
  1: __('order.goodsRefund.giftcard'),
  2: __('order.goodsRefund.wallet'),
  3: __('order.goodsRefund.users'),
};

const star = (<span style={{ color: 'red' }}>*</span>);

const Price = ({ dataSource, submitValue, dispatch }) => {
  const RLPrice = dataSource.rlFee || [];
  return (
    <div style={{ marginBottom: '20px' }}>
      <div className={style.flex}>
        <span className={style.descWidth}>{__('order.goodsRefund.freight_price')}{star}</span>
        <Rg
          value={submitValue.shipping}
          onChange={(e) => {
            const value = Number(e.target.value);
            const check = submitValue.refundPaths.find(v => v.refundTypeId > 1 && v.check);
            if (!check) {
              return message.warning(__('order.goodsRefund.Please_choose_pay_method'));
            }
            dispatch(subchange('shipping', Number(value)));
            return dispatch(allback(value, Number(submitValue.rlFee), check.refundTypeId));
          }}
        >
          <Radio value={0}>{__('order.goodsRefund.no_no_back')}</Radio>
          <Radio value={1}>{__('order.goodsRefund.no_back')}</Radio>
        </Rg>
      </div>
      <div className={style.space}>
        <span className={style.descWidth}>{__('order.goodsRefund.RL_price')}{star}</span>
        <Rg
          value={submitValue.rlFee}
          onChange={(e) => {
            const value = Number(e.target.value);
            const check = submitValue.refundPaths.find(v => v.refundTypeId > 1 && v.check);
            if (!check) {
              return message.warning(__('order.goodsRefund.Please_choose_pay_method'));
            }
            dispatch(subchange('rlFee', value));
            return dispatch(allback(Number(submitValue.shipping), value, check.refundTypeId));
          }}
        >
          {RLPrice.map(v => (<Radio value={Number(v)} key={v}>${v}</Radio>))}
        </Rg>
      </div>
      <div className={style.space}>
        <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_price')}{star}</span>
        <div>
          {
            submitValue.refundPaths.map((v, i) => (
              v.isShow ?
                <div
                  className={i === 0 ? style.flex_cloumn : style.flex_cloumn_top}
                  key={v.refundTypeId}
                >
                  <div className={style.flex_center}>
                    <div style={{ width: 150 }}>
                      {
                          v.refundTypeId > 1 ?
                            <Radio
                              checked={v.check}
                              value={v.check}
                              onChange={() => {
                                if (v.refundTypeId === 3) {
                                  dispatch(copyPaymentMethod());
                                } else {
                                  dispatch(checkPath(v.refundTypeId));
                                }
                              }}
                            />
                            :
                            <Checkbox disabled checked={v.check} />
                      }
                      <span style={inline}>{types[v.refundTypeId]}</span>
                      <span style={spanWidth}>$</span>
                    </div>
                    <div>
                      <Input
                        style={{ width: '150px' }}
                        value={v.refundAmount}
                        type={'number'}
                        step={0.1}
                        onChange={e => dispatch(usPriceChange(e.target.value, i, v.rate))}
                      />
                      <span style={spanWidth}>{v.currency}</span>
                      <Input
                        style={{ width: '150px' }}
                        value={v.refundAmount2}
                        type={'number'}
                        step={0.1}
                        onChange={e => dispatch(otherPriceChange(e.target.value, i, v.rate2))}
                      />
                      <span style={tipStyle}>{__('order.goodsRefund.no_over_price')}${v.max}</span>
                    </div>
                  </div>
                  {
                    !!v.refundAccountTypeList.length &&
                    <div style={{ margin: '10px 150px' }}>
                      <Select
                        allowClear
                        placeholder={__('order.goodsRefund.please_select_a_refund_account')}
                        style={{ width: 150 }}
                       // value={`${v.refund_method || ''}`}
                        onChange={(va) => {
                          dispatch(subchange('refundPaths', [
                            ...submitValue.refundPaths.slice(0, i),
                            assign({}, submitValue.refundPaths[i], {
                              refund_method: va,
                              refund_method_id: v.refundAccountTypeList.find(d => d.name === va).id,
                            }),
                            ...submitValue.refundPaths.slice(i + 1),
                          ]));
                        }
                        }
                      >
                        {
                          v.refundAccountTypeList.map(d => (
                            <Option key={d.id} value={d.name}>{d.name}</Option>
                          ))
                        }
                      </Select>
                      {
                        Number(v.refund_method_id) === 4 &&
                        <Input
                          placeholder={__('order.entry.cash_content8')}
                          style={{ width: 150, marginLeft: '5px' }}
                          value={v.refund_method2}
                          onChange={e => dispatch(subchange('refundPaths', [
                            ...submitValue.refundPaths.slice(0, i),
                            assign({}, submitValue.refundPaths[i],
                              { refund_method2: e.target.value }),
                            ...submitValue.refundPaths.slice(i + 1),
                          ]))}
                        />
                      }
                      <Input
                        placeholder={__('order.entry.cash_content7')}
                        style={{ width: 150, marginLeft: '5px' }}
                        value={v.account}
                        onChange={e => dispatch(subchange('refundPaths', [
                          ...submitValue.refundPaths.slice(0, i),
                          assign({}, submitValue.refundPaths[i], { account: e.target.value }),
                          ...submitValue.refundPaths.slice(i + 1),
                        ]))}
                      />
                    </div>
                  }
                </div>
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
