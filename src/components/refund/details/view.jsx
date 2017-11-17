/**
 *  Create by xvliuzhu on 2017/9/25
 *  退款详情
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { getInfo, commit } from './action';
import Base from './base';
import Goods from './goods';
import Info from './info';
import Logs from './log';
import Modals from './modals';
import styles from './style.css';

class Details extends Component {
  componentDidMount() {
    const { params: { id, billno }, dispatch } = this.props;
    dispatch(getInfo(id, billno));
    dispatch(commit('refundBillId', id));
    dispatch(commit('billno', billno));
  }
  render() {
    const { ready } = this.props;
    if (ready) {
      const { refund_type_code } = this.props.dataSource.refund_detail || {};
      return (
        <div className={styles.contentPadding}>
          <Base {...this.props} />
          {/* 判断Goods组件是否显示 */}
          {Number(refund_type_code) === 1 && <Goods {...this.props} />}
          <Info {...this.props} />
          <Logs {...this.props} />
          <Modals {...this.props} />
        </div>
      );
    }
    return (
      <Spin />
    );
  }
}
Details.propTypes = {
  ready: PropTypes.bool,
  params: PropTypes.shape(),
  dataSource: PropTypes.shape(),
  dispatch: PropTypes.func,
};
const mapStateToProps = state => state['refund/details'];
export default connect(mapStateToProps)(Details);
