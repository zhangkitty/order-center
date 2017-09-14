import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Spin } from 'antd';
import { commit, getInfo } from './action';
import BaseInfo from './base/index';
import Payment from './payment-desc';
import Refund from './refund';
import OrderReturn from './order-return';
import Logs from './logs';

import styles from './style.css';

const TP = Tabs.TabPane;
// TODO: lan
const info = props => [{
  name: __('order.entry.basic'),
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
class DetailsEntry extends Component {
  constructor(props) {
    super(props);
    const { dispatch, params: { id, active, bill } } = props;
    dispatch(getInfo(id, bill, 'base'));
    dispatch(commit('orderId', id));
    dispatch(commit('billno', bill));
    dispatch(commit('activeKey', active || 'base'));
  }
  render() {
    const { ready, activeKey, dispatch, orderId, billno, tabsLoad } = this.props;
    if (ready) {
      return (
        <div
          className={styles.contentBg}
          style={{ maxWidth: window.innerWidth }}
        >
          <Tabs
            activeKey={activeKey} defaultActiveKey="base"
            onChange={(v) => {
              dispatch(getInfo(orderId, billno, v));
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
        </div>
      );
    }
    return <Spin />;
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
};
const mapStateToProps = state => state['order/details/entry'];
export default connect(mapStateToProps)(DetailsEntry);
