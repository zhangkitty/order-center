/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Radio, Button, Form, Input, Tag,Checkbox } from 'antd';
import { initPriceInfo, initReasonList, commit, } from './action';
import SumOfMoney from './sumOfMoney';


import styles from './style.css';


class diffRefund extends Component {
  constructor(props) {
    super(props);
    const { params: { orderId, type } } = props;
    props.dispatch(initPriceInfo({ order_id: orderId }));
    props.dispatch(initReasonList({ type }));
  }


  render() {
    const { ReasonList, total_price, refund_path_list, ready,
    } = this.props;
    const RadioGroup = Radio.Group;
    const FormItem = Form.Item;
    const testdom = ready ? <SumOfMoney {...this.props} /> : <div>aaa</div>;
    console.log('view', testdom);
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
            action="" onSubmit={(e) => {
              e.preventDefault();
              this.props.form.validateFields((err, values) => {
                if (!err) {
                  values.order_id = this.props.params.orderId;
                  console.log(values);
                  this.props.dispatch(commit(values));
                }
              });
            }}
          >
            <div className={styles.refund}>
              <div className={styles.refundtitle}>{__('order.diffRefund.refund_amount')}<span style={{ color: 'red' }}>*</span>:</div>
              <div className={styles.refundcontent}>
                <div className={styles.gift_card} style={{ display: map.get(1) ? '' : 'none' }}>
                  <FormItem className={styles.radio}>
                    {getFieldDecorator('checkbox_gift_card', {
                    })(
                      <RadioGroup>
                        <Radio value="1"> {__('order.diffRefund.gift_card')}</Radio>
                      </RadioGroup>,
                    )}
                  </FormItem>
                  <FormItem
                    hasFeedback
                  >
                    <label htmlFor="$1">$</label>
                    {getFieldDecorator('$1', {
                      rules: [{
                        required: true, message: 'Please input your password!',
                      }, {
                        validator: this.checkConfirm,
                      }],
                    })(
                      <Input
                        id="$1" className={styles.input}
                        onBlur={() => {
                          this.props.form.setFieldsValue({
                            EUR1: `${this.props.form.getFieldValue('$1') * rate1}`,
                          });
                        }}
                      />,
                    )}
                  </FormItem>
                  <FormItem>
                    <label htmlFor="EUR1">EUR</label>
                    {getFieldDecorator('EUR1', {
                    })(
                      <Input
                        id="EUR1" className={styles.input}
                        onBlur={() => {
                          this.props.form.setFieldsValue({
                            $1: `${this.props.form.getFieldValue('EUR1') * rate2}`,
                          });
                        }}
                      />,
                    )}
                  </FormItem>
                </div>
                <div className={styles.wallet} style={{ display: map.get(2) ? '' : 'none' }}>
                  <FormItem className={styles.radio}>
                    {getFieldDecorator('checkbox_wallet', {
                    })(
                      <RadioGroup>
                        <Radio value="2">{__('order.diffRefund.wallet')}</Radio>
                      </RadioGroup>,
                    )}
                  </FormItem>
                  <FormItem>
                    <label htmlFor="$2">$</label>
                    {getFieldDecorator('$2', {
                    })(
                      <Input
                        id="$2" className={styles.input}
                        onBlur={() => {
                          this.props.form.setFieldsValue({
                            EUR2: `${this.props.form.getFieldValue('$2') * rate1}`,
                          });
                        }}
                      />,
                    )}
                  </FormItem>
                  <FormItem>
                    <label htmlFor="EUR2">EUR</label>
                    {getFieldDecorator('EUR2', {
                    })(
                      <Input
                        id="EUR2" className={styles.input}
                        onBlur={() => {
                          this.props.form.setFieldsValue({
                            $2: `${this.props.form.getFieldValue('EUR2') * rate2}`,
                          });
                        }}
                      />,
                    )}
                  </FormItem>
                </div>
                <div className={styles.client} style={{ display: map.get(3) ? '' : 'none' }}>
                  <FormItem className={styles.radio}>
                    {getFieldDecorator('checkbox_client', {
                    })(
                      <RadioGroup>
                        <Radio value="3">{__('order.diffRefund.client')}</Radio>
                      </RadioGroup>,
                    )}
                  </FormItem>
                  <FormItem>
                    <label htmlFor="$3">$</label>
                    {getFieldDecorator('$3', {
                    })(
                      <Input
                        id="$3" className={styles.input}
                        onBlur={(e) => {
                          this.props.form.setFieldsValue({
                            EUR3: `${this.props.form.getFieldValue('$3') * rate1}`,
                          });
                        }}
                      />,
                    )}
                  </FormItem>
                  <FormItem>
                    <label htmlFor="EUR3">EUR</label>
                    {getFieldDecorator('EUR3', {
                    })(
                      <Input
                        id="EUR3" className={styles.input}
                        onBlur={() => {
                          this.props.form.setFieldsValue({
                            $3: `${this.props.form.getFieldValue('EUR3') * rate2}`,
                          });
                        }}
                      />,
                    )}
                  </FormItem>
                </div>
                <div className={styles.placeholder} style={{ display: map.get(4) ? '' : 'none' }}>
                  <div className={styles.overflow} >
                    <FormItem className={styles.radio}>
                      {getFieldDecorator('checkbox_overflow', {
                      })(
                        <RadioGroup>
                          <Radio value="4">{__('order.diffRefund.overflow')}</Radio>
                        </RadioGroup>,
                      )}
                    </FormItem>
                    <FormItem >
                      <label htmlFor="$4">$</label>
                      {getFieldDecorator('$4', {
                      })(
                        <Input
                          id="$4" className={styles.input}
                          onBlur={() => {
                            this.props.form.setFieldsValue({
                              EUR4: `${this.props.form.getFieldValue('$4') * rate1}`,
                            });
                          }}
                        />,
                      )}
                    </FormItem>
                    <FormItem>
                      <label htmlFor="EUR4">EUR</label>
                      {getFieldDecorator('EUR4', {
                      })(
                        <Input
                          id="EUR4" className={styles.input}
                          onBlur={() => {
                            this.props.form.setFieldsValue({
                              $4: `${this.props.form.getFieldValue('EUR4') * rate2}`,
                            });
                          }}
                        />,
                      )}
                    </FormItem>
                  </div>
                  <FormItem>
                    {getFieldDecorator('overflow', {
                    })(
                      <Input className={styles.input1} placeholder={__('order.diffRefund.placeholder')} />,
                    )}
                  </FormItem>
                </div>
              </div>
            </div>

            <div className={styles.refundreason}>
              <div>{__('order.diffRefund.refundreason')}<span style={{ color: 'red' }}>*</span>:</div>
              {getFieldDecorator('radioReason')(
                <RadioGroup className={styles.reasonDom}>
                  <Tag color="#919191" style={{ textAlign: 'center', marginBottom: '10px' }}>{__('order.diffRefund.adjustment_refund')}</Tag>
                  {
                    ReasonList.map((value, key) => <Radio value={key} key={key}>{value.name}</Radio>,
                    )
                  }
                </RadioGroup>,
              )}
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
