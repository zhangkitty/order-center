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
    const { params: { id }, dispatch } = this.props;
    dispatch(getInfo(id));
    dispatch(commit('refundBillId', id));
  }
  render() {
    const { ready } = this.props;
    if (ready) {
      return (
        <div className={styles.contentPadding}>
          <Base {...this.props} />
          <Goods {...this.props} />
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
  dispatch: PropTypes.func,
};
const mapStateToProps = state => state['refund/details'];
export default connect(mapStateToProps)(Details);
