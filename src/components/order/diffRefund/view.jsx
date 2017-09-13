/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import assign from 'object-assign';
import { Radio, Button, Form, Input, Tag, message } from 'antd';
import { initPriceInfo, initReasonList, subchange, submitForward, change, reset } from './action';
import SumOfMoney from './sumOfMoney';
import Price from './price.jsx';


import styles from './style.css';

const lan = {
  remarks: '备注',
};

class diffRefund extends Component {
  constructor(props) {
    super(props);
    const { params: { orderId, type } } = props;
    props.dispatch(initPriceInfo({ order_id: orderId }));
    props.dispatch(initReasonList({ type }));
    props.dispatch(change('order_id', Number(orderId)));
  }

  render() {
    const {
      ready, dispatch, ReasonList, reason, remark, order_id,refundPaths
    } = this.props;
    console.log(this.props, 'this.props');
    return (
      ready ?
        <div>
          <SumOfMoney orderPriceInfo={this.props.orderPriceInfo} dispatch={dispatch} />
          <Price refundPaths={this.props.refundPaths} dispatch={dispatch} />
          <Radio.Group
            style={{ display: 'flex', flexDirection: 'column', marginLeft: 50 }}
            onChange={e => dispatch(change('reason', e.target.value))}
          >
            <Tag color="#919191" style={{ width: 80, textAlign: 'center', marginBottom: '10px' }}>{__('order.diffRefund.adjustment_refund')}</Tag>
            {
              ReasonList.map((value, key) => <Radio value={key} key={key}>{value.name}</Radio>,
              )
            }
          </Radio.Group>,
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row' }}>
            <span style={{ width: '80px' }}>{lan.remarks}</span>
            <Input
              value={remark}
              style={{ width: '300px', height: '200px' }} type="textarea" onChange={(e) => {
                dispatch(change('remark', e.target.value));
              }}
            />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const a = refundPaths.filter(v=>v.checked)
              console.log(a,a)
              const temp = {
                order_id,
                refund_type: 2,
                reason,
                remark: 'remark',
                refund_paths: [],

              };
            }}
          >
            <Button
              onClick={() => {
                dispatch(reset());
              }}
              type="default" style={{ marginLeft: '100px', marginTop: '20px' }}
            >{__('order.diffRefund.cancel')}</Button>
            <Button type="primary" style={{ marginLeft: '100px', marginTop: '20px' }} htmlType={'submit'}>{__('order.diffRefund.commit')}</Button>
          </form>

        </div>
        :
        null
    );
  }
}

const mapStateToProps = state => state['order/diffRefund'];
export default connect(mapStateToProps)(diffRefund);
