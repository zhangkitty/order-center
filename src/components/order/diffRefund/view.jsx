/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import assign from 'object-assign';
import { Radio, Button, Form, Input, Tag, message } from 'antd';
import { initPriceInfo, initReasonList, subchange, submitForward } from './action';
import SumOfMoney from './sumOfMoney';
import Price from './price';


import styles from './style.css';


class diffRefund extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const { params: { orderId, type } } = props;
    props.dispatch(initPriceInfo({ order_id: orderId }));
    props.dispatch(initReasonList({ type }));
    props.dispatch(subchange('order_id', Number(orderId)));
  }


  render() {
    const { ReasonList, total_price, refund_path_list, ready, submitValue, dispatch,
    } = this.props;
    const RadioGroup = Radio.Group;
    const FormItem = Form.Item;
    const testdom = ready ? <SumOfMoney {...this.props} /> : <div>aaa</div>;
    const test1dom = ready ? <Price {...this.props} /> : <div>aa</div>;
    const { getFieldDecorator } = this.props.form;
    if (Object.keys(total_price).length > 0) {
      const rate1 = total_price.price_usd.rate;
      const rate2 = total_price.price_with_exchange_rate.rate;
      const map = new Map();
      refund_path_list.forEach(element => map.set(element.refund_path_id, element.is_show));
      return (
        <div className={styles.content}>
          {testdom}


          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const { shipping, rlFee, refundPaths, reason } = submitValue;
              if (
                reason.reasonId === null ||
                refundPaths.filter(v => v.check).length < 1
              ) {
                return message.warning(__('order.goodsRefund.missing_something'));
              }
              const res = assign({}, submitValue, { refundPaths: refund_paths.filter(v => v.check) }, { reason: submitValue.reason.reasonId });
              return dispatch(submitForward(res));
            }}
          >
            {test1dom}
            <div className={styles.refundreason}>
              <div>{__('order.diffRefund.refundreason')}<span style={{ color: 'red' }}>*</span>:</div>
              <RadioGroup
                className={styles.reasonDom}
                onChange={e => dispatch(subchange('reason', { reasonId: e.target.value }))}
              >
                <Tag color="#919191" style={{ textAlign: 'center', marginBottom: '10px' }}>{__('order.diffRefund.adjustment_refund')}</Tag>
                {
                    ReasonList.map((value, key) => <Radio value={key} key={key}>{value.name}</Radio>,
                    )
                  }
              </RadioGroup>,
            </div>
            <div className={styles.remark}>
              <div>{__('order.diffRefund.remark')}:</div>
              {getFieldDecorator('remark', {
              })(
                <Input className={styles.textarea} type="textarea" />,
              )}
            </div>
            <div className={styles.button}>
              <Button type="default" onClick={() => this.props.form.resetFields()}>{__('order.diffRefund.cancel')}</Button>
              <Button type="primary" htmlType={'submit'}>{__('order.diffRefund.commit')}</Button>
            </div>
          </Form>
        </div>
      );
    }
    return (
      <div>s</div>
    );
  }
}
diffRefund.propTypes = {
  dispatch: PropTypes.func,
  ReasonList: PropTypes.arrayOf(PropTypes.shape()),
  total_price: PropTypes.shape(),
  gift_card_payment_price: PropTypes.shape(),
  wallet_payment_price: PropTypes.shape(),
  card_payment_price: PropTypes.shape(),
  shipping_price: PropTypes.shape(),
  shipping_insure_price: PropTypes.shape(),
  point_payment_price: PropTypes.shape(),
  coupon_payment_price: PropTypes.shape(),
  order_can_be_refunded_price: PropTypes.shape(),
  gift_card_can_be_refunded_price: PropTypes.shape(),
  wallet_or_card_can_be_refunded_price: PropTypes.shape(),
  refund_path_list: PropTypes.arrayOf(PropTypes.shape()),
  params: PropTypes.shape(),
  form: PropTypes.shape(),
};

const mapStateToProps = state => state['order/diffRefund'];
const diffRefund1 = Form.create(mapStateToProps)(diffRefund);
export default connect(mapStateToProps)(diffRefund1);
