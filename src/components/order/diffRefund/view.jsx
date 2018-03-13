/**
 *  Create by zhangcaochao on 2017/9/10
 *  差价退款
 *  提交时：
 *  refundPathId < 3  ,不需要退款账号信息，退款账号信息置空
 *  refundPathId =3 && 不是cod,不需要退款账号信息，退款账号信息置空
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
// import assign from 'object-assign';
import { Radio, Button, Input, Tag, message, Spin } from 'antd';
import { initPriceInfo, initReasonList, submitForward, change, reset } from './action';
import SumOfMoney from './sumof-money';
import Price from './price';
import Price1 from './price1';

import styles from './style.css';

const Star = (<span style={{ color: 'red' }}>*</span>);

class DiffRefund extends Component {
  constructor(props) {
    super(props);
    const { params: { orderId, type } } = props;
    this.filterAccount = this.filterAccount.bind(this);
    props.dispatch(initPriceInfo({ order_id: orderId }));
    props.dispatch(initReasonList({ type }));
    props.dispatch(change('order_id', Number(orderId)));
  }
  filterAccount(path) {
    if (path.refundPathId <= 2) return true;
    if (path.refundPathId === 3 && !this.props.isCod) return true;
    switch (path.refund_method) {
      case 'Paytm':
        return path.account;
      case 'PayPal':
        return path.account;
      case 'yes bank':
        return path.bank_code && path.card_number && path.customer_name && path.issuing_city;
      default:
        return false;
    }
  }

  render() {
    const {
      ready, dispatch, ReasonList, reason, remark, order_id, refundPaths, orderPriceInfo,
      maxTips, submitLoad, submitdisabled,
      isCod,   // 是否cod
    } = this.props;
    return (
      ready ?
        <div className={styles.contentBg}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const refund_paths = refundPaths.filter(v => v.isShow === 1)
                  .filter(v => v.checked)
                  .filter(this.filterAccount)
                      .map((x) => {
                        if (x.refundPathId < 3) {
                          x.refund_method = null;
                          x.account = null;
                          x.bank_code = null;
                          x.customer = null;
                          x.issuing_city = null;
                          x.card_number = null;
                        } else if (x.refundPathId === 3 && !isCod) {
                          x.refund_method = null;
                          x.account = null;
                          x.bank_code = null;
                          x.customer = null;
                          x.issuing_city = null;
                          x.card_number = null;
                        }
                        return assign({}, x, {
                          account: x.account ? x.account : x.card_number,
                          customer: x.customer_name,
                        });
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
            {/* <Price {...this.props} /> */}
            <Price1 {...this.props} />
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
              <Button
                disabled={submitdisabled} type="primary" loading={submitLoad} style={{ marginLeft: '50px' }} htmlType={'submit'}
              >{__('order.diffRefund.commit')}</Button>
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
  isCod: PropTypes.bool,
};

const mapStateToProps = state => state['order/diffRefund'];
export default connect(mapStateToProps)(DiffRefund);
