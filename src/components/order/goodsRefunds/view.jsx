/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import { Table, Button, DatePicker, Select, message, Input } from 'antd';
import { search, change, commit, init } from './action';


import styles from './style.css';


class goodsRefunds extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    // dispatch(init());
  }

  render() {
    const { dispatch, dataSource, fetchType } = this.props;
    return (
      <div className={styles.content}>
          {__('order.diffRefund.order_amount')}
       nsadjkfhnwKFHGIAWFKUW
      </div>
    );
  }
}
goodsRefunds.propTypes = {
  dispatch: PropTypes.func,
  load: PropTypes.bool,
  searchLoad: PropTypes.bool,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
};

const mapStateToProps = state => state['order/goodsRefunds'];
export default connect(mapStateToProps)(goodsRefunds);
