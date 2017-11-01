/**
 *  Create by zhangcaochao on 2017/9/10
 *  差价退款
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import assign from 'object-assign';
import { Radio, Button, Input, Tag, message, Spin } from 'antd';
import { initPriceInfo, initReasonList, submitForward, change, reset } from './action';
import SumOfMoney from './sumof-money';
import Price from './price';

import styles from './style.css';

const Star = (<span style={{ color: 'red' }}>*</span>);

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
      ready, dispatch, ReasonList, reason, remark, order_id, refundPaths, orderPriceInfo, maxTips, submitLoad, submitdisabled,
    } = this.props;
    return (
      ready ?
        <div className={styles.contentBg}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const refund_paths = refundPaths.filter(v => v.checked && Number(v.refundAmount) !== 0).map((x) => {
                if (x.refund_method === '其他' || x.refund_method === 'others') {
                  x.refund_method = x.refund_method1;
                }
                return x;
              });
              if (!refund_paths.length || !reason) {
                return message.warning(__('common.submitTitle3'));
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
            <SumOfMoney orderPriceInfo={orderPriceInfo} dispatch={dispatch} />
            <Price refundPaths={this.props.refundPaths} dispatch={dispatch} maxTips={maxTips} />
            <div className={styles.row}>
              <span className={styles.rowSpan}>{__('common.content_name')}{Star}:</span>
              <Radio.Group
                className={styles.group}
                onChange={e => dispatch(change('reason', e.target.value))}
              >
                <Tag color="#919191" className={styles.rowTag}>{__('order.diffRefund.adjustment_refund')}</Tag>
                {
                  ReasonList.map(value =>
                    <Radio value={value.id} key={value.name}>{value.name}</Radio>,
                  )
                }
              </Radio.Group>
            </div>
            <div className={styles.row}>
              <span className={styles.rowSpan}>{__('common.order_operation4')}</span>
              <Input
                placeholder={__('common.content_name1')}
                autosize={{ minRows: 2, maxRows: 6 }}
                style={{ width: '65%' }}
                value={remark}
                type="textarea"
                onChange={(e) => {
                  dispatch(change('remark', e.target.value));
                }}
              />
            </div>
            <div className={styles.row}>
              <span className={styles.rowSpan} />
              <Button
                onClick={() => {
                  dispatch(reset());
                }}
                type="default"
              >{__('order.diffRefund.cancel')}</Button>
              <Button disabled={submitdisabled} type="primary" loading={submitLoad} style={{ marginLeft: '50px' }} htmlType={'submit'}>{__('order.diffRefund.commit')}</Button>
            </div>
          </form>
        </div>
        :
        <Spin spinning />
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
  maxTips: PropTypes.shape(),
  submitLoad: PropTypes.bool,
  submitdisabled: PropTypes.bool,
};

const mapStateToProps = state => state['order/diffRefund'];
export default connect(mapStateToProps)(DiffRefund);
