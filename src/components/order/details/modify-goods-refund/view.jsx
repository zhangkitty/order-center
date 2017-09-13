/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import { Spin, Input, Button, message } from 'antd';
import { subchange, getData, getReason, submitForward } from './action';
import SumOfMoney from './sumOfMoney';
import style from './style.css';

const TextArea = Input.TextArea;

class GoodsRefund extends Component {
  componentWillMount() {
    const {
      dispatch, params: { orderId, goodsId },
      ready,
    } = this.props;
    if (!ready) {
      dispatch(getData(orderId, goodsId));
    }
  }
  render() {
    const { ready, submitLoad, submitValue, dispatch } = this.props;
    return (
      ready ?
        <div>
          <SumOfMoney {...this.props} />
        </div>
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

const mapStateToProps = state => state['order/details/modify-goods-refund'];
export default connect(mapStateToProps)(GoodsRefund);
