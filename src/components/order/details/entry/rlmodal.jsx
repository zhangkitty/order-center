import React, { Component } from 'react';
import { Modal, Radio } from 'antd';
import { getRlRadio } from './action';

class RLModal extends Component {
  componentDidMount() {
    // this.props.dispatch(getRlRadio());
  }
  render() {
    return (<Modal visible={this.props.RlModal}>
      <div>666</div>
    </Modal>);
  }
}

export default RLModal;
