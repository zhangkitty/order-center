/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Input, Button, message } from 'antd';
import { getData, getReason, submitForward, subchange } from './action';
import SumOfMoney from './sumOfMoney';
import RefundGoods from './refundGoods';
import Resason from './resason';
import style from './style.css';

const TextArea = Input.TextArea;

class CancelGoods extends Component {
  componentWillMount() {
    const {
      dispatch, params: { orderId, goodsId },
    } = this.props;
    dispatch(subchange('orderId', Number(orderId)));
    dispatch(subchange('goodsIds', goodsId.split(',').map(v => Number(v))));
    dispatch(getData(orderId, goodsId));
    dispatch(getReason());
  }
  render() {
    const { ready, submitLoad, submitValue, dispatch } = this.props;
    return (
      ready ?
        <form
          className={style.content}
          onSubmit={(e) => {
            e.preventDefault();
            const { reason } = submitValue;
            if (
              reason.reasonId === null ||
              (reason.reasonId === 20 && reason.goodsIds.length < 1)
            ) {
              return message.warning(__('order.goodsRefund.missing_something'));
            }
            const res = {
              order_id: Number(submitValue.orderId),
              order_goods_ids: submitValue.goodsIds.join(','),
              reason: Number(reason.reasonId),
              reason_order_goods_ids: reason.goodsIds.join(','),
              remark: submitValue.remark,
            };
            console.log(res);
            return dispatch(submitForward(res));
          }}
        >
          <SumOfMoney {...this.props} />
          <RefundGoods {...this.props} />
          <Resason {...this.props} />
          <div className={style.mark}>
            <span className={style.descWidth}>{__('order.goodsRefund.mark')}:</span>
            <TextArea
              placeholder={__('common.content_name1')}
              autosize={{ minRows: 2, maxRows: 6 }} style={{ width: '65%' }}
              value={submitValue.remark}
              onChange={e => dispatch(subchange('remark', e.target.value))}
            />
          </div>
          <Button style={{ margin: '15px 80px 80px 0', left: '20%' }}>{__('common.cancel')}</Button>
          <Button
            style={{ margin: '15px 80px 80px 0', left: '20%' }}
            type="primary" htmlType="submit"
            loading={submitLoad}
          >{__('common.submit')}</Button>
        </form>
        :
        <Spin spinning />
    );
  }
}
CancelGoods.propTypes = {
  dispatch: PropTypes.func,
  ready: PropTypes.bool,
  submitLoad: PropTypes.bool,
  orderId: PropTypes.number,
  goodsId: PropTypes.arrayOf(PropTypes.number),
  params: PropTypes.shape(),
  submitValue: PropTypes.shape(),
};

const mapStateToProps = state => state['order/cancelGoods'];
export default connect(mapStateToProps)(CancelGoods);
