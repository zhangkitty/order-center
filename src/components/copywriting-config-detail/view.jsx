
import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';

import { connect } from 'react-redux';

import { orderReturnLabelQueryById } from './action';

class copywritingConfigDetail extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    const { params: { id } } = props;
    dispatch(orderReturnLabelQueryById(id));
  }
  render() {
    const { dataSource } = this.props;
    const columns = [

    ];
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

copywritingConfigDetail.propTypes = {

};
const mapStateToProps = state => state['copywriting-config-detail'];
export default connect(mapStateToProps)(copywritingConfigDetail);
