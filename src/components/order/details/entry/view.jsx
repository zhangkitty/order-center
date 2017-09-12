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

const TP = Tabs.TabPane;
// TODO: lan
const info = props => [{
  name: '基本信息',
  key: 'base',
  children: <BaseInfo {...props} />,
}, {
  name: '支付信息',
  key: 'pay',
  children: <Payment {...props} />,
}, {
  name: '退款信息',
  key: 'refund',
  children: <Refund {...props} />,
}, {
  name: '退货信息',
  key: 'goods_rejected',
  children: <OrderReturn {...props} />,
}, {
  name: '订单日志',
  key: 'logs',
  children: <Logs {...props} />,
}];
class DetailsEntry extends Component {
  constructor(props) {
    super(props);
    const { dispatch, params: { id, active, bill } } = props;
    dispatch(getInfo(id, bill));
    dispatch(commit('orderId', id));
    dispatch(commit('billno', bill));
    dispatch(commit('activeKey', active || 'base'));
  }
  render() {
    const { ready, activeKey, dispatch } = this.props;
    if (ready) {
      return (
        <div style={{ padding: '15px', maxWidth: '1200px' }}>
          <Tabs activeKey={activeKey} defaultActiveKey="base" onChange={v => dispatch(commit('activeKey', v))} >
            {
              info(this.props).map(v => (
                <TP
                  tab={v.name}
                  key={v.key}
                >
                  {
                    v.children
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
  dispatch: PropTypes.func,
  params: PropTypes.shape(),
  activeKey: PropTypes.string,
};
const mapStateToProps = state => state['order/details/entry'];
export default connect(mapStateToProps)(DetailsEntry);
