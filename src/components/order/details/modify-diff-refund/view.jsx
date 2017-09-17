/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Input } from 'antd';
import SumOfMoney from './sumofMoney';
import Price from './price';
import State from './state';
import { getdata, initPriceInfo } from './action';


class modifyDiffRefund extends Component {
  componentWillMount() {
    const {
     dispatch, params: { order_id, record_id }, ready,
    } = this.props;
    dispatch(getdata({ refund_bill_id: 1 }));
    //dispatch(initPriceInfo({ order_id }));
  }
  render() {
    const { ready, dispatch, dataSource } = this.props;
    return (
      ready ?
        <div>
          <SumOfMoney orderPriceInfo={dataSource.orderPriceInfo} />
          {/*<State refundBillInfo={dataSource.refundBillInfo} />*/}
          {/* <Price {...this.props} /> */}
        </div>
        :
        <Spin spinning />
    );
  }

}

modifyDiffRefund.PropTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.shape(),
  ready: PropTypes.number,
};


const mapStateToProps = state => state['order/details/modify-diff-refund'];

export default connect(mapStateToProps)(modifyDiffRefund);
