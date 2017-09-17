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
  missing_required: '缺少必填项',
};

class DiffRefund extends Component {
  constructor(props) {
    super(props);
    const { params: { orderId, type } } = props;
    props.dispatch(initPriceInfo({ order_id: orderId }));
    props.dispatch(initReasonList({ type }));
    props.dispatch(change('order_id', Number(orderId)));
  }

  render() {
    const {
      ready, dispatch, ReasonList, reason, remark, order_id, refundPaths, orderPriceInfo,
    } = this.props;
    return (
      ready ?
        <div>
          <SumOfMoney orderPriceInfo={orderPriceInfo} dispatch={dispatch} />
          <Price refundPaths={this.props.refundPaths} dispatch={dispatch} />
          <Radio.Group
            style={{ display: 'flex', flexDirection: 'column', marginLeft: 50 }}
            onChange={e => dispatch(change('reason', e.target.value))}
          >
            <Tag color="#919191" style={{ width: 80, textAlign: 'center', marginBottom: '10px' }}>{__('order.diffRefund.adjustment_refund')}</Tag>
            {
              ReasonList.map(value => <Radio value={value.id} key={value.name}>{value.name}</Radio>,
              )
            }
          </Radio.Group>
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
              const refund_paths = refundPaths.filter(v => v.checked);
              if (!refund_paths.length || !reason) {
                return message.warning(lan.missing_required);
              }
              const temp = {
                order_id: Number(order_id),
                refund_type: 2,
                reason: Number(reason),
                remark,
                refund_paths,
              };
              return dispatch(submitForward(temp));
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
DiffRefund.propTypes = {
  ready: PropTypes.bool,
  dispatch: PropTypes.func,
  ReasonList: PropTypes.arrayOf(PropTypes.shape()),
  reason: PropTypes.number,
  remark: PropTypes.string,
  order_id: PropTypes.number,
  refundPaths: PropTypes.arrayOf(PropTypes.shape()),
  orderPriceInfo: PropTypes.shape(),
  params: PropTypes.shape(),
};

const mapStateToProps = state => state['order/diffRefund'];
export default connect(mapStateToProps)(DiffRefund);
