import React from 'react';
import { Checkbox, Input, Select, Button } from 'antd';
import style from './style.css';

import { changeChannelValue } from './action';

const star = (<span style={{ color: 'red' }}>*</span>);
const Option = Select.Option;

const tipStyle = {
  background: '#ffe9a7',
  margin: '0 10px',
  padding: '0 10px',
  borderRadius: '4px',
};

const lan = {
  请输入账户信息: '请输入账户信息',
  请输入银行代码: '请输入银行代码',
  请输入银行卡号: '请输入银行卡号',
  请输入顾客姓名: '请输入顾客姓名',
  请输入发卡城市: '请输入发卡城市',
  交换钱包和用户支付的金额: '交换钱包和用户支付的金额',
};

const price = ({ refundPaths, dispatch, maxTips, isUsd, rate }) => (
  <div className={style.space}>
    <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_price')}{star}</span>
    <div>
      {
        refundPaths.map(v => (
          <div style={{ marginBottom: 5 }}>
            <span style={{ width: 120, display: 'inline-block' }}>
              <Checkbox
                onChange={
                (e) => {
                  const val = e.target.checked;
                  dispatch(changeChannelValue(v.refundPathId, 'checked', val));
                }
              }
              >
                {
                  v.refundPathName
                }
              </Checkbox>
            </span>

            <span style={{ display: 'inline-block', width: 50, textAlign: 'center' }}>{v.priceUsd.symbol}</span>
            <Input
              disabled={!isUsd}
              style={{ width: 150 }}
              value={!isNaN(Number(v.refundAmount)) ? +Number(v.refundAmount).toFixed(2) : 0}
              onChange={
                (e) => {
                  const temp = Number(e.target.value * rate).toFixed(2);
                  dispatch(changeChannelValue(v.refundPathId, 'refundAmount', e.target.value));
                  dispatch(changeChannelValue(v.refundPathId, 'refundCurrency', +temp));
                }
              }
            />
            <span style={{ display: 'inline-block', width: 50, textAlign: 'center' }}>{v.priceWithExchangeRate.symbol}</span>
            <Input
              disabled={isUsd}
              style={{ width: 150 }}
              value={!isNaN(Number(v.refundCurrency)) ? +Number(v.refundCurrency).toFixed(2) : 0}
              onChange={
                (e) => {
                  const temp = Number(e.target.value / rate).toFixed(2);
                  dispatch(changeChannelValue(v.refundPathId, 'refundCurrency', e.target.value));
                  dispatch(changeChannelValue(v.refundPathId, 'refundAmount', +temp));
                }
              }
            />
            <span style={tipStyle}>{__('order.goodsRefund.no_over_price')}{isUsd === 1 ?
                maxTips[v.refundPathId].priceUsd.amountWithSymbol
                : maxTips[v.refundPathId].priceWithExchangeRate.amountWithSymbol
            }
            </span>
            {
              !!(v.refundPathId === 2) &&
              <div>
                <Button
                  onChange={
                  (e) => {
                    // 交换钱包和用户的支付金额待定
                    // dispatch(exchangeCardAndWallet());
                  }
                }
                >
                  {
                    lan.交换钱包和用户支付的金额
                  }
                </Button>
              </div>
            }
            <div style={{ marginTop: 5 }}>
              {
                !!v.refundAccountTypeList.length &&
                <div>
                  <Select
                    style={{ width: 150, marginRight: 10 }}
                    allowClear
                    placeholder={__('order.goodsRefund.please_select_a_refund_account')}
                    className={style.priceSelect}
                    value={v.refund_method}
                    onChange={(e) => {
                      dispatch(changeChannelValue(v.refundPathId, 'refund_method', e));
                    }}
                  >
                    {
                      v.refundAccountTypeList.map(v => (
                        <Option key={v.name}>{v.name}</Option>
                      ))
                    }
                  </Select>
                  {
                    v.refund_method === 'yes bank' &&
                    <div style={{ marginTop: 5 }}>
                      <Input
                        style={{ width: 150, marginRight: 5 }}
                        placeholder={lan.请输入银行代码}
                        value={v.bank_code}
                        onChange={(e) => {
                          if (/\s/.test(e.target.value)) { return false; }   // 不允许空格
                          return dispatch(changeChannelValue(v.refundPathId, 'bank_code', e.target.value));
                        }}

                      />
                      <Input
                        style={{ width: 150, marginRight: 5 }}
                        placeholder={lan.请输入银行卡号}
                        value={v.card_number}
                        onChange={(e) => {
                          if (/\s/.test(e.target.value)) { return false; }   // 不允许空格
                          return dispatch(changeChannelValue(v.refundPathId, 'card_number', e.target.value));
                        }}

                      />
                      <Input
                        style={{ width: 150, marginRight: 5 }}
                        placeholder={lan.请输入顾客姓名}
                        value={v.customer_name}
                        onChange={(e) => {
                          if (/\s/.test(e.target.value)) { return false; }   // 不允许空格
                          return dispatch(changeChannelValue(v.refundPathId, 'customer_name', e.target.value));
                        }}

                      />
                      <Input
                        style={{ width: 150, marginRight: 5 }}
                        placeholder={lan.请输入发卡城市}
                        value={v.issuing_city}
                        onChange={(e) => {
                          if (/\s/.test(e.target.value)) { return false; }   // 不允许空格
                          return dispatch(changeChannelValue(v.refundPathId, 'issuing_city', e.target.value));
                        }}

                      />
                    </div>
                  }
                  {
                    v.refund_method === 'Paytm' &&
                    <Input
                      style={{ width: 150 }}
                      placeholder={lan.请输入账户信息}
                      value={v.account}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/[^(\d)]+/.test(val)) {
                          return false;
                        } // 只允许数字
                        if (val.length >= 11) {
                          return false;
                        }
                        return dispatch(changeChannelValue(v.refundPathId, 'account', e.target.value));
                      }}
                    />
                  }
                  {
                    v.refund_method === 'PayPal' &&
                    <Input
                      style={{ width: 150 }}
                      placeholder={lan.请输入账户信息}
                      value={v.account}
                      onChange={(e) => {
                        if (/\s/.test(e.target.value)) {
                          return false; // 不允许空格
                        }
                        return dispatch(changeChannelValue(v.refundPathId, 'account', e.target.value));
                      }}
                    />
                  }
                </div>
              }
            </div>
          </div>
        ))
      }
    </div>

  </div>
  );

export default price;
