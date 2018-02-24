/**
 *  Create by xvliuzhu on 2017/9/20
 *  商品退款
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import { Spin, Input, Button, message } from 'antd';
import { init } from './action';
import SumOfMoney from './sumOfMoney';
import RefundGoods from './refundGoods';
import Reason from './resason';
import Remark from './remark';
import MyRadio from './my-radio';
import Price from './price';


class GoodsRefund extends Component {
  componentWillMount() {
    const {
      dispatch, params: { orderId, goodsId },
    } = this.props;
    dispatch(init(orderId, goodsId));
  }
  render() {
    const { ready } = this.props;
    return (
      !!ready &&
      <div>
        <SumOfMoney {...this.props} />
        <RefundGoods {...this.props} />
        <MyRadio {...this.props} />
        <Price {...this.props} />
        <Reason {...this.props} />
        <Remark {...this.props} />
      </div>
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
