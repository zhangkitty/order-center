import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Radio } from 'antd';
import { commit, changeRl, clearRL } from './action';

class RLModal extends Component {
  componentDidMount() {
    // this.props.dispatch(getRlRadio());
  }
  render() {
    return (<Modal
      visible={this.props.RlModal}
      title={__('common.change_rl')}
      onCancel={() => this.props.dispatch(clearRL())}
      onOk={() => this.props.dispatch(changeRl({
        rl_charge: this.props.rl_charge,
        code: this.props.code,
        orderId: this.props.orderId,
        billno: this.props.billno,
        activeKey: this.props.activeKey,
      }))}
    >
      <Radio.Group onChange={e => this.props.dispatch(commit('rl_charge', e.target.value))} value={this.props.rl_charge}>
        {
          this.props.list.map(li => (
            <Radio value={li.amount_with_symbol}>{li.amount_with_symbol}</Radio>
          ))
        }
      </Radio.Group>
    </Modal>);
  }
}

RLModal.propTypes = {
  list: PropTypes.array,
  RlModal: PropTypes.bool,
  dispatch: PropTypes.func,
  rl_charge: PropTypes.string,
  code: PropTypes.string,
};
export default RLModal;
