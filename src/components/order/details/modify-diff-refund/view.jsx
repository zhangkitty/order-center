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
     dispatch, params: { id }, ready,
    } = this.props;
    dispatch(getdata({ record_id: id }));
    dispatch(initPriceInfo({ order_id: 5185606 }));
  }
  render() {
    const { ready, dispatch } = this.props;
    console.log(this.props, 'this.props');
    return (
      ready ?
        <div>
          <SumOfMoney {...this.props} />
          <State {...this.props} />
          <Price {...this.props} />
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
