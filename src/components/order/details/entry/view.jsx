/**
 * Create by xvliuzhu on 2017/9/20
 * 订单详情
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Spin } from 'antd';
import {commit, getInfo, getRefundBillListByOrderIdSer} from './action';
import BaseInfo from './base/index';
import Payment from './payment-desc';
import Refund from './refund';
import OrderReturn from './order-return';
import Logs from './logs';
import TrackTrouble from './trackTrouble';
import RLModal from './rlmodal';

import styles from './style.css';

const TP = Tabs.TabPane;


class DetailsEntry extends Component {
  constructor(props) {
    super(props);
    const { dispatch, params: { id, active, bill } } = props;
    dispatch(getInfo(id, bill, active || 'base'));
    dispatch(commit('orderId', id));
    dispatch(commit('billno', bill));
    dispatch(commit('activeKey', active || 'base'));
  }
  render() {
    const { ready, activeKey, dispatch, orderId, billno, tabsLoad, RlModal, RlList, rl_charge, orderID, mycode } = this.props;
    const info = props => [{
      name: `${billno}`, // order.entry.basic
      key: 'base',
      children: <BaseInfo {...props} />,
    }, {
      name: __('order.entry.pay'),
      key: 'pay',
      children: <Payment {...props} />,
    }, {
      name: __('order.entry.refunds'),
      key: 'refund',
      children: <Refund {...props} />,
    }, {
      name: __('order.entry.return'),
      key: 'orderReturn',
      children: <OrderReturn {...props} />,
    }, {
      name: __('order.entry.order_log'),
      key: 'logs',
      children: <Logs {...props} />,
    }];
    if (ready) {
      return (
        <div
          className={styles.contentBg}
        >
          <Tabs
            activeKey={activeKey} defaultActiveKey="base"
            onChange={(v) => {
              dispatch(getInfo(orderId, billno, v));
              if (v === 'refund') {
                dispatch(commit('refundTableMoreLoad', true));
                setTimeout(() => {
                  dispatch(getRefundBillListByOrderIdSer(orderId, 'user', 1));
                }, 2000);
              }
              dispatch(commit('activeKey', v));
            }}
          >
            {
              info(this.props).map(v => (
                <TP
                  tab={v.name}
                  key={v.key}
                >
                  {
                    tabsLoad ? <Spin /> : v.children
                  }
                </TP>
              ))
            }
          </Tabs>
          <TrackTrouble {...this.props} />
          <RLModal RlModal={RlModal} list={RlList} dispatch={dispatch} rl_charge={rl_charge} code={mycode} orderId={orderId} billno={billno} activeKey={activeKey} />
        </div>
      );
    }
    return null;
  }
}
DetailsEntry.propTypes = {
  ready: PropTypes.bool,
  tabsLoad: PropTypes.bool,
  dispatch: PropTypes.func,
  params: PropTypes.shape(),
  activeKey: PropTypes.string,
  orderId: PropTypes.string,
  billno: PropTypes.string,
  RlList: PropTypes.array,
  RLModal: PropTypes.bool,
};
const mapStateToProps = state => state['order/details/entry'];
export default connect(mapStateToProps)(DetailsEntry);
