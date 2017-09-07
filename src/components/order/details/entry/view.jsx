import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

const TP = Tabs.TabPane;
// TODO: lan
const info = [{
  name: '基本信息',
  key: 'base',
  children: null,
}, {
  name: '支付信息',
  key: 'pay',
  children: null,
}, {
  name: '退款信息',
  key: 'refund',
  children: null,
}, {
  name: '退货信息',
  key: 'goods_rejected',
  children: null,
}, {
  name: '订单日志',
  key: 'logs',
  children: null,
}];
class DetailsEntry extends Component {
  constructor(props) {
    super(props);
    const { dispatch, params: { active } } = props;
    dispatch(commit('active', active));
  }
  render() {
    return(
      <Tabs activeKey={active} defaultActiveKey="base">
        {
          info.map(v => (
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
    )
  }
}

const mapStateToProps = state => state['order/details/entry'];
export default connect(mapStateToProps)(DetailsEntry);
