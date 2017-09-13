/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import { Spin, Radio, Select, Input, Button, InputNumber } from 'antd';
import { subchange, getData, change, getReason, cancel, submitForward } from './action';
import style from './style.css';
import PriceInfo from './priceinfo';


const lan = {
  type: '类型',
  cashrefund: '提现退款',
  come_back: '提现返还',
  withdrawal_amount: '提现金额',
  account: '账户',
  Please_select_a_refund_account: '请选择退款账户',
  Please_enter_the_correct_account_information: '请输入正确的账户信息',
  Remarks: '备注',
};


class WithDraw extends Component {
  componentWillMount() {
    const {
      dispatch, params: { orderId },
      ready,
    } = this.props;
    dispatch(getData(orderId));
  }

  render() {
    const { ready, rate1, rate2 } = this.props;
    const RadioGroup = Radio.Group;
    const refundAccountTypeList = this.props.dataSource.refundAccountTypeList;
    const { dispatch, submitValue } = this.props;
    const { refund_type } = submitValue;
    return (
      ready ?
        <div style={{ paddingLeft: '100px', paddingTop: '50px' }}>
          <PriceInfo {...this.props} />
          <form
            style={{ marginTop: '20px' }} onSubmit={(e) => {
              e.preventDefault();
              dispatch(submitForward(submitValue));
            }}
          >
            <div style={{ marginTop: '20px' }}>
              <span style={{ marginRight: '20px' }} >{lan.type}:</span>
              <RadioGroup
                value={submitValue.refund_type}
                onChange={(e) => {
                  dispatch(change('refund_type', e.target.value));
                }}
              >
                <Radio value={3}>{lan.cashrefund}</Radio>
                <Radio value={4}>{lan.come_back}</Radio>
              </RadioGroup>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row' }}>
              {lan.withdrawal_amount}:
              <span style={{ color: 'red', marginRight: '20px' }}>*</span>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <label style={{ display: 'flex', flexDirection: 'row', marginRight: '20px' }}>$
                  <Input
                    value={submitValue.refund_paths[0].refund_amount}
                    type="text"
                    onChange={(e) => {
                      dispatch(change('refund_paths', [
                        assign({}, submitValue.refund_paths[0], {
                          refund_amount: e.target.value,
                        }),
                      ]));
                    }}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'row' }}>EUR
                  <Input
                    type="text"
                    value={submitValue.refund_paths[0].refund_amount * rate1}
                    onChange={(e) => {
                      dispatch(change('refund_paths', [
                        assign({}, submitValue.refund_paths[0], {
                          refund_amount: e.target.value * rate2,
                        }),
                      ]));
                    }}
                  />
                </label>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row' }}>
              <span style={{ width: '80px' }}>{lan.account}</span>
              <Select
                value={submitValue.refund_paths[0].refund_method}
                defaultValue={lan.Please_select_a_refund_account} onSelect={(value, option) => {
                  dispatch(change('refund_paths', [
                    assign({}, submitValue.refund_paths[0], {
                      refund_method: value,
                    }),
                  ]));
                }} style={{ width: 120 }}
              >
                {
                  refundAccountTypeList.map(v => <Select.Option key={v.name}>{v.name}</Select.Option>)
                }
              </Select>
              <Input
                value={submitValue.refund_paths[0].account}
                style={{ width: '200px', marginLeft: '20px' }}type="text" onChange={(e) => {
                  dispatch(change('refund_paths', [
                    assign({}, submitValue.refund_paths[0], {
                      account: e.target.value,
                    }),
                  ]));
                }}placeholder={lan.Please_enter_the_correct_account_information}
              />
            </div>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row' }}>
              <span style={{ width: '80px' }}>{lan.Remarks}</span>
              <Input
                value={submitValue.remark}
                style={{ width: '300px', height: '200px' }} type="textarea" onChange={(e) => {
                  dispatch(change('remark', e.target.value));
                }}
              />
            </div>


            <Button
              onClick={() => {
                dispatch(cancel());
              }}
              type="default" style={{ marginLeft: '100px', marginTop: '20px' }}
            >{__('order.diffRefund.cancel')}</Button>
            <Button type="primary" style={{ marginLeft: '100px', marginTop: '20px' }} htmlType={'submit'}>{__('order.diffRefund.commit')}</Button>

          </form>
        </div>
        :
        <Spin spinning />
    );
  }
}


const mapStateToProps = state => state['order/details/withdraw'];
export default connect(mapStateToProps)(WithDraw);
