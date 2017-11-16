/**
 *  Create by xvliuzhu on 2017/9/25
 *  退款详情
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { getInfo, commit ,getOrderReturnDetail} from './action';
import Base1 from './base1'
import Goods1 from './goods1'
import Goods2 from './goods2'
import Logs1 from './log1';
import styles from './style.css';

class Details extends Component {
  componentDidMount() {
    const { params: { id }, dispatch } = this.props;
    dispatch(getOrderReturnDetail(id))
  }
  render() {
    const { returnsInfoReady } = this.props;
    if (returnsInfoReady) {
      return (
        <div className={styles.contentPadding}>
          <Base1 {...this.props}/>
          <Goods1 {...this.props}/>
          <Goods2 {...this.props}/>
          <Logs1 {...this.props}/>
        </div>
      );
    }
    return (
      <Spin />
    );
  }
}
const mapStateToProps = state => state['returns/details'];
export default connect(mapStateToProps)(Details);
