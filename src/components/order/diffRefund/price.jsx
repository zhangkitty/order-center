import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox, Select } from 'antd';
import { changeChannelValue, change } from './action';
import style from './style.css';

const inline = {
  width: '100px',
  display: 'inline-block',
  padding: '0',
};
const tipStyle = {
  background: '#ffe9a7',
  margin: '0 10px',
  padding: '0 10px',
  borderRadius: '4px',
};
const Option = Select.Option;
const star = (<span style={{ color: 'red' }}>*</span>);

const RefundChannelGroup = ({ channels, dispatch, maxTips, isUsd }) => {
  let Chan;
  if (channels.length === 1) {
    Chan = Checkbox;
  } else {
    Chan = Radio;
  }
  return (<div className={style.space}>
    {
      channels.map(({
        refundPathId,
        checked,
        refundPathName: name,
        refundAmount,
        refundCurrency,
        priceWithExchangeRate,
        refundAccountTypeList,
        account,
        refund_method,
      //  refund_method1,
        isShow,
        bank_code,
        customer,
        issuing_city,
        card_number,   // refund_method === 'yes bank', 银行卡号
      }) => (
        <div key={refundPathId} style={{ display: !isShow ? 'none' : 'block' }}>
          <div className={style.spaceCon}>
            <div className={style.moneyName}>
              { refundPathId !== 4 ?
                <Chan
                  checked={checked}
                  onChange={(e) => {
                    if (refundPathId === 2) {
                      dispatch(changeChannelValue(refundPathId, 'checked', e.target.checked));
                      dispatch(changeChannelValue(4, 'checked', false));
                      dispatch(changeChannelValue(3, 'checked', false));
                    } else {
                      dispatch(changeChannelValue(refundPathId, 'checked', e.target.checked));
                    }
                    if (refundPathId === 3) {
                      dispatch(changeChannelValue(2, 'checked', false));
                    }
                    if (refundPathId === 3 && (isUsd ? refundAmount : refundCurrency) == Number(maxTips[3])) {
                      dispatch(changeChannelValue(4, 'checked', true));
                    }
                  }}
                /> :
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

              }
              <span style={inline}>{name}</span>
              $
            </div>
            <div>
              <Input
                style={{ width: '150px' }}
                type="number"
                required
                disabled={checked ? (isUsd !== 1) : true}
                value={Number(refundAmount).toFixed(2)}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(change('maxTips', assign({}, maxTips, { disabled: Number(value) })));
                  dispatch(changeChannelValue(refundPathId, 'refundAmount', Number(value).toFixed(2)));
                  dispatch(changeChannelValue(refundPathId, 'refundCurrency', Number(value * priceWithExchangeRate.rate).toFixed(2)));
                  if (refundPathId === 3 && Number(value).toFixed(2) === Number(maxTips[3]).toFixed(2)) {
                    dispatch(changeChannelValue(4, 'checked', true));
                  }
                  if (refundPathId === 3 && Number(value).toFixed(2) !== Number(maxTips[3]).toFixed(2)) {
                    dispatch(changeChannelValue(4, 'checked', false));
                  }
                  if (value < 0) {
                    dispatch(changeChannelValue(refundPathId, 'refundAmount', 0));
                    dispatch(changeChannelValue(refundPathId, 'refundCurrency', 0));
                  }
                }}
              />
              <span className={style.spanMargin}>{priceWithExchangeRate.symbol}</span>
              <Input
                style={{ width: '150px' }}
                type="number"
                disabled={checked ? (isUsd !== 0) : true}
                value={Number(refundCurrency).toFixed(2)}
                onChange={(e) => {
                  dispatch(changeChannelValue(refundPathId, 'refundCurrency', Number(e.target.value).toFixed(2)));
                  dispatch(changeChannelValue(refundPathId, 'refundAmount', Number(e.target.value / priceWithExchangeRate.rate).toFixed(2)));
                  if (refundPathId === 3 && Number(e.target.value).toFixed(2) === Number(maxTips[3]).toFixed(2)) {
                    dispatch(changeChannelValue(4, 'checked', true));
                  }
                  if (refundPathId === 3 && Number(e.target.value).toFixed(2) !== Number(maxTips[3]).toFixed(2)) {
                    dispatch(changeChannelValue(4, 'checked', false));
                  }
                  if (e.target.value < 0) {
                    dispatch(changeChannelValue(refundPathId, 'refundCurrency', 0));
                    dispatch(changeChannelValue(refundPathId, 'refundAmount', 0));
                  }
                }}
              />
              {
                <span style={tipStyle}>{__('order.goodsRefund.no_over_price')}{isUsd === 1 ?
                    maxTips[refundPathId].priceUsd.amountWithSymbol
                    : maxTips[refundPathId].priceWithExchangeRate.amountWithSymbol
                }
                </span>
              }
              {
                console.log(maxTips)
              }
            </div>
          </div>
          {
            !!refundAccountTypeList.length &&
            <div className={style.priceR}>
              <Select
                allowClear
                placeholder={__('order.goodsRefund.please_select_a_refund_account')}
                className={style.priceSelect}
                disabled={!checked}
                value={refund_method}
                onChange={(e) => {
                  dispatch(changeChannelValue(refundPathId, 'refund_method', e));
                }}
              >
                {
                  refundAccountTypeList.map(v => (
                    <Option key={v.name}>{v.name}</Option>
                  ))
                }
              </Select>

              <div>

                {/* 退款方式 = yes bank， 银行代码/银行卡号/顾客姓名/发卡城市     */}
                {
                  refund_method === 'yes bank' &&
                    <span>
                      <Input
                        placeholder={__('order.entry.cash_content10')} // 请输入银行代码
                        className={style.priceInput}
                        disabled={!checked}
                        required
                        value={bank_code}
                        onChange={(e) => {
                          if (/\s/.test(e.target.value)) { return false; }   // 不允许空格
                          return dispatch(changeChannelValue(refundPathId, 'bank_code', e.target.value));
                        }}
                      />
                      <Input
                        placeholder={__('order.entry.cash_content11')} // 请输入银行卡号-账户信息
                        className={style.priceInput}
                        disabled={!checked}
                        required
                        value={card_number}
                        onChange={(e) => {
                          if (/\s/.test(e.target.value)) { return false; }   // 不允许空格
                          return dispatch(changeChannelValue(refundPathId, 'card_number', e.target.value));
                        }}
                      />
                      <Input
                        placeholder={__('order.entry.cash_content12')} // 请输入顾客姓名
                        className={style.priceInput}
                        disabled={!checked}
                        required
                        value={customer}
                        onChange={(e) => {
                          if (/\s/.test(e.target.value)) { return false; }   // 不允许空格
                          return dispatch(changeChannelValue(refundPathId, 'customer', e.target.value));
                        }}
                      />
                      <Input
                        placeholder={__('order.entry.cash_content13')} // 请输入发卡城市
                        className={style.priceInput}
                        disabled={!checked}
                        required
                        value={issuing_city}
                        onChange={(e) => {
                          if (/\s/.test(e.target.value)) { return false; }   // 不允许空格
                          return dispatch(changeChannelValue(refundPathId, 'issuing_city', e.target.value));
                        }}
                      />
                    </span>
                }

                {/* 退款方式--其他 */}
                {
                  // refund_method === '其他' || refund_method === 'others' ?
                  //   <Input
                  //     placeholder={__('order.entry.cash_content8')} // 请输入正确的退款账户
                  //     className={style.priceInput}
                  //     disabled={!checked}
                  //     required
                  //     value={refund_method1}
                  //     onChange={(e) => {
                  //       dispatch(changeChannelValue(refundPathId, 'refund_method1', e.target.value));
                  //     }}
                  //   />
                  // :
                  // null
                }
                {/* 退款方式 = Paytm  */}
                {/* 退款方式 = PayPal */}
                {/* 退款账户信息 !== 'yes bank' 显示 */}
                {
                  refund_method !== 'yes bank' &&
                    <Input
                      placeholder={__('order.entry.cash_content7')} // 请输入正确的退款账户信息
                      required={!(+refundAmount === 0)}
                      className={style.priceInput}
                      disabled={!checked}
                      value={account}
                      onChange={(e) => {
                        if (/\s/.test(e.target.value)) { return false; }   // 不允许空格
                        return dispatch(changeChannelValue(refundPathId, 'account', e.target.value));
                      }}
                    />
                }
              </div>
            </div>
          }
        </div>
      ))
    }
  </div>
  );
};
RefundChannelGroup.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func,
  maxTips: PropTypes.shape(),
};

// 将退款路径分组，RefundChannelGrop组件代表每一组
const Price = ({ refundPaths, dispatch, maxTips, isUsd }) => {
  const result = [];
  // 根据reducer里面的channelType,将同一组的内容放到result中去
  refundPaths.forEach((item) => {
    result[item.channelType] = result[item.channelType] || [];
    result[item.channelType].push(item);
  });

  return (<div className={style.spaceBg}>
    <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_price')}{star}</span>
    <div>
      {
      result.map((item, idx) => ({ arr: item, key: idx })).map(item => (
        <RefundChannelGroup
          channels={item.arr}
          type={item.key}
          key={item.key}
          dispatch={dispatch}
          maxTips={maxTips}
          isUsd={isUsd}
        />
      ))
    }
    </div>
  </div>);
};

Price.propTypes = {
  refundPaths: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func,
  maxTips: PropTypes.shape(),
};

export default Price;
