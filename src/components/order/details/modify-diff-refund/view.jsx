/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import SumOfMoney from './sumofMoney';
import { initPriceInfo } from './action';


class modifyDiffRefund extends Component {
  componentWillMount() {
    const {
     dispatch, params: { id }, ready,
    } = this.props;
    dispatch(initPriceInfo({ order_id: id }));
  }
  render() {
    const { ready, dispatch } = this.props;
    console.log(this.props)
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

modifyDiffRefund.PropTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.shape(),
  ready: PropTypes.number,

};


const mapStateToProps = state => state['order/details/modify-diff-refund'];

export default connect(mapStateToProps)(modifyDiffRefund);
