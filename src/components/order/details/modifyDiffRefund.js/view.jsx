/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import assign from 'object-assign';
import { Radio, Button, Form, Input, Tag, message } from 'antd';
import { initPriceInfo, initReasonList, subchange,submitForward } from '../../diffRefund/action';
import SumOfMoney from '../../diffRefund/sumofMoney';
import Price from '../../diffRefund/price';


import styles from '../../diffRefund/style.css';


class modifyDiffRefund extends Component {
  render(){
    return(
      <div>alkdjlsaf</div>
    )

  }
}


const mapStateToProps = state => state['order/details/modifyDiffRefund'];

export default connect(mapStateToProps)(modifyDiffRefund);
