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
      refundPathId, refundMethod, account, refundAmount, refundMethod1, refundAmount2,
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
                refundAmount2: Number(refundAmount2).toFixed(2),
                refundMethod: refundMethod === '其他' || refundMethod === 'others' ? refundMethod1 : refundMethod,
                account,
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
              {refundType != 3 ? null : (<div className={style.mark}>
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
                  refundMethod === '其他' || refundMethod === 'others' ?
                    <Input
                      placeholder={__('order.entry.cash_content8')}
                      style={{ width: '200px', marginRight: '15px' }}
                      value={refundMethod1}
                      onChange={e => dispatch(subchange('refundMethod1', e.target.value))}
                    />
                    : null
                }
                <Input
                  placeholder={__('order.entry.cash_content7')}
                  style={{ width: '200px' }}
                  value={account}
                  onChange={e => dispatch(subchange('account', e.target.value))}
                />
              </div>)}

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
