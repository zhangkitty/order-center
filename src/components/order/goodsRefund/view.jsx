/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import { Spin, Input, Button, message } from 'antd';
import { subchange, getData, getReason, submitForward, reset } from './action';
import SumOfMoney from './sumOfMoney';
import RefundGoods from './refundGoods';
import Price from './price';
import Resason from './resason';
import style from './style.css';

const TextArea = Input.TextArea;

class GoodsRefund extends Component {
  componentWillMount() {
    const {
      dispatch, params: { orderId, goodsId },
      ready, submitValue: { orderId: pid, goodsId: pgid },
    } = this.props;
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
                refundAmount2: Number(v.refundAmount2).toFixed(2),
              }))) });
            const newRes = {
              order_id: Number(res.orderId),
              order_goods_ids: res.goodsIds.join(','),
              reason: Number(res.reason.reasonId),
              remark: res.remark,
              refund_paths: res.refundPaths
              .map(v => ({
                refund_path_id: v.refundTypeId,
                refund_amount: Number(v.refundAmount),
                refund_method: Number(v.refund_method_id) === 4 ? v.refund_method2 : v.refund_method,
                account: v.account,
              })),
            };
            return dispatch(submitForward(newRes));
          }}
        >
          <SumOfMoney {...this.props} />
          <RefundGoods {...this.props} />
          <Price {...this.props} />
          <Resason {...this.props} />
          <div className={style.mark}>
            <span className={style.descWidth}>{__('order.goodsRefund.mark')}：</span>
            <TextArea
              placeholder={__('common.content_name1')}
              autosize={{ minRows: 2, maxRows: 6 }}
              style={{ width: '65%' }}
              value={submitValue.remark}
              onChange={e => dispatch(subchange('remark', e.target.value))}
            />
          </div>
          <Button style={{ margin: '15px 80px 80px 0', left: '20%' }} onClick={() => dispatch(reset())}>{__('common.cancel')}</Button>
          <Button
            style={{ margin: '15px 80px 80px 0', left: '20%' }}
            type="primary" htmlType="submit"
            disabled={submitLoad}
          >{__('common.submit')}</Button>
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
