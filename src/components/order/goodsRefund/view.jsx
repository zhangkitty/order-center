/**
 *  Create by xvliuzhu on 2017/9/20
 *  商品退款
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import { Spin, Input, Button, message } from 'antd';
import { subchange, getData, getReason, submitForward, reset, init } from './action';
import SumOfMoney from './sumOfMoney';
import RefundGoods from './refundGoods';
import Reason from './resason';
import Remark from './remark';
import MyRadio from './my-radio';
import Price from './price';
import Price1 from './price1';
import style from './style.css';

const TextArea = Input.TextArea;

class GoodsRefund extends Component {
  componentWillMount() {
    const {
      dispatch, params: { orderId, goodsId },
      ready, submitValue: { orderId: pid, goodsId: pgid },
    } = this.props;
    dispatch(init(orderId, goodsId));
    if (!ready || Number(orderId) !== pid || goodsId !== pgid.join(',')) {
      dispatch(subchange('orderId', Number(orderId)));
      dispatch(subchange('goodsIds', goodsId.split(',').map(v => Number(v))));
      dispatch(getData(orderId, goodsId));
      dispatch(getReason());
    }
  }
  render() {
    const { ready, submitLoad, submitValue, dispatch } = this.props;
    return (
      ready ?
        <form
          className={style.content}
          onSubmit={(e) => {
            e.preventDefault();
            const { shipping, rlFee, refundPaths, reason } = submitValue;
            if (
              shipping === null ||
              rlFee === null ||
              reason.reasonId === null ||
              refundPaths.filter(v => v.check).length < 1
            ) {
              return message.warning(__('order.goodsRefund.missing_something'));
            }
            const res = assign({},
              submitValue,
              { refundPaths: refundPaths.filter(v => v.check).map(v => (assign({}, v, {
                refundAmount: Number(v.refundAmount).toFixed(2),
                refundCurrency: Number(v.refundCurrency).toFixed(2),
              }))) });
            const newRes = {
              is_return_freight_insurance: submitValue.shipping, // lemonlone，2017-12-27，运费和运费险，0均不退，1均退
              rl_amount: submitValue.rlFee, // lemonlone，2017-12-27，RL 费用
              order_id: Number(res.orderId),
              order_goods_ids: res.goodsIds.join(','),
              reason: Number(res.reason.reasonId),
              remark: res.remark,
              refund_paths: res.refundPaths
                .map(v => ({
                  refund_path_id: v.refundTypeId,
                  refund_amount: Number(v.refundAmount),
                  refund_currency: Number(v.refundCurrency),
                  refund_method: v.refundAccountTypeList.length ?
                    v.refund_method : null,
                  account: v.refundAccountTypeList.length ?
                    (v.refund_method === 'yes bank' ? (v.account1 || Symbol('noValue')) : (v.account || Symbol('noValue'))) : null,
                  bank_code: v.refundAccountTypeList.length ?
                    v.bank_code || Symbol('noValue') : null,
                  customer: v.refundAccountTypeList.length ?
                    v.customer || Symbol('noValue') : null,
                  issuing_city: v.refundAccountTypeList.length ?
                    v.issuing_city || Symbol('noValue') : null,
                })),
            };
            return dispatch(submitForward(newRes));
          }}
        >
          {!!ready && <div>
            <SumOfMoney {...this.props} />
            <RefundGoods {...this.props} />
            <MyRadio {...this.props} />
            <Price1 {...this.props} />
            <Reason {...this.props} />
            <Remark {...this.props} />
          </div>
          }
        </form>
        :
        <Spin spinning />
    );
  }
}
GoodsRefund.propTypes = {
  dispatch: PropTypes.func,
  ready: PropTypes.bool,
  submitLoad: PropTypes.bool,
  params: PropTypes.shape(),
  submitValue: PropTypes.shape(),
};

const mapStateToProps = state => state['order/goodsRefund'];
export default connect(mapStateToProps)(GoodsRefund);
