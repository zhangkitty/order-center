/**
 *  Create by liufeng on 2017/9/20
 *  提现退款
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import { Spin, Input, Button, message, Radio, Select } from 'antd';
import { subchange, getData, submitForward, reset } from './action';

import SumOfMoney from './sumOfMoney';
import Price from './price';
import style from './style.css';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

class cashRefund extends Component {
  componentWillMount() {
    const {
      dispatch, params: { orderId },
    } = this.props;
    dispatch(subchange('orderId', orderId));
    dispatch(getData(orderId));
  }
  render() {
    const {
      ready, submitLoad, submitValue, dispatch, submitDisabled,
      refundTypeList, refundAccountTypeList, canWithdrawAmount, notWithdrawAmount,
    } = this.props;
    const {
      refundBillId, refundPaths, remark, refundType, orderId,
      refundPathId, refundMethod, account, refundAmount, refundMethod1, refundCurrency,
      bankCode,
      cardNumber,
      customer,
      issuingCity,
    } = submitValue;
    return (
      ready ?
        <form
          className={style.content}
          onSubmit={(e) => {
            e.preventDefault();
            if (
              orderId === null || !refundAmount
            ) {
              return message.warning(__('order.goodsRefund.missing_something'));
            }

            const temp = {
              orderId,
              refundType,
              refundPaths: [{
                refundPathId: 3,  // 写死
                refundAmount: Number(refundAmount).toFixed(2),
                refundCurrency: Number(refundCurrency).toFixed(2),
              //  refundMethod: refundMethod === '其他' || refundMethod === 'others' ? refundMethod1 : refundMethod,
                account,
                bankCode: refundMethod === 'yes bank' ? bankCode : '',
                cardNumber: refundMethod === 'yes bank' ? cardNumber : '',
                customer: refundMethod === 'yes bank' ? customer : '',
                issuingCity: refundMethod === 'yes bank' ? issuingCity : '',
              }],
              canWithdrawAmount,   // 可提现金额
              notWithdrawAmount,   // 不提现金额
              remark,
            };
            return dispatch(submitForward(temp));
          }}
        >

          <SumOfMoney {...this.props} />

          <div className={style.mainContent}>
            <div className={style.mark}>
              <span className={style.descWidth}>{__('order.entry.cash_content4')}: </span>
              <RadioGroup
                value={refundType}
                onChange={e => dispatch(subchange('refundType', e.target.value))}
              >
                {
                  refundTypeList.map(item => (
                    <Radio value={item.typeId}>{item.typeName}</Radio>
                  ))
                }
              </RadioGroup>
            </div>

            {/* 退款金额 */}
            <div className={style.mainContentB}>
              <Price {...this.props} />
              {+refundType !== 3
                ? null
                : (
                  <div className={style.mark}>
                    <span className={style.descWidth}>{__('order.entry.cash_content6')}：</span>
                    <Select
                      style={{ width: '150px', marginRight: '10px' }}
                      value={refundMethod}
                      onChange={val => dispatch(subchange('refundMethod', val))}
                    >
                      {
                        refundAccountTypeList.map(item => (
                          <Option key={item.name} > {item.name}</Option>
                        ))
                      }
                    </Select>
                    {
                      // refundMethod === '其他' || refundMethod === 'others' ?
                      //   <Input
                      //     placeholder={__('order.entry.cash_content8')}
                      //     style={{ width: '200px', marginRight: '15px' }}
                      //     value={refundMethod1}
                      //     onChange={e => dispatch(subchange('refundMethod1', e.target.value))}
                      //   />
                      //   : null
                    }
                    {/* 退款账户信息 !== 'yes bank' 显示 */}
                    {
                      refundMethod !== 'yes bank' &&
                      <Input
                        placeholder={__('order.entry.cash_content7')}// 请输入正确的退款账户信息
                        className={style.priceInput}
                        value={account}
                        onChange={e => dispatch(subchange('account', e.target.value))}
                      />
                    }

                    {/* 退款方式 = yes bank， 银行代码/银行卡号/顾客姓名/发卡城市     */}
                    {
                      refundMethod === 'yes bank' &&
                      <span>
                        <Input
                          placeholder={__('order.entry.cash_content10')} // 请输入银行代码
                          className={style.priceInput}
                          value={bankCode}
                          onChange={e => dispatch(subchange('bankCode', e.target.value))}
                        />
                        <Input
                          placeholder={__('order.entry.cash_content11')} // 请输入银行卡号-账户信息
                          className={style.priceInput}
                          value={cardNumber}
                          onChange={e => dispatch(subchange('cardNumber', e.target.value))}
                        />
                        <Input
                          placeholder={__('order.entry.cash_content12')} // 请输入顾客姓名
                          className={style.priceInput}
                          value={customer}
                          onChange={e => dispatch(subchange('customer', e.target.value))}
                        />
                        <Input
                          placeholder={__('order.entry.cash_content13')} // 请输入发卡城市
                          className={style.priceInput}
                          value={issuingCity}
                          onChange={e => dispatch(subchange('issuingCity', e.target.value))}
                        />
                      </span>
                    }


                  </div>
                )}

              <div className={style.mark}>
                <span className={style.descWidth}>{__('order.goodsRefund.mark')}：</span>
                <TextArea
                  placeholder={__('common.content_name1')}
                  autosize={{ minRows: 3, maxRows: 5 }}
                  style={{ width: '65%' }}
                  value={remark}
                  onChange={e => dispatch(subchange('remark', e.target.value))}
                />
              </div>
              <Button
                style={{ margin: '15px 80px 80px 0', left: '20%' }}
                onClick={() => dispatch(reset())}
              >{__('common.cancel')}</Button>
              <Button
                style={{ margin: '15px 80px 80px 0', left: '20%' }}
                type="primary" htmlType="submit"
                loading={submitLoad}
                disabled={submitDisabled}
              >{__('common.submit')}</Button>
            </div>
          </div>
        </form>
        :
        <Spin spinning />
    );
  }
}
cashRefund.propTypes = {
  dispatch: PropTypes.func,
  ready: PropTypes.bool,
  submitLoad: PropTypes.bool,
  submitDisabled: PropTypes.bool,
  params: PropTypes.shape(),
  orderId: PropTypes.string,
  submitValue: PropTypes.shape(),
  refundTypeList: PropTypes.arrayOf(PropTypes.shape()),
  refundAccountTypeList: PropTypes.arrayOf(PropTypes.shape()),
  canWithdrawAmount: PropTypes.string,
  notWithdrawAmount: PropTypes.string,
};

const mapStateToProps = state => state['order/details/cash-refund'];
export default connect(mapStateToProps)(cashRefund);
