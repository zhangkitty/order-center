import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { getInitData } from './action';

const lang = {
  NO: __('order.details.track-details.NO'),
  package_status: __('order.details.track-details.package_status'),
  secondary_status: __('order.details.track-details.secondary_status'),
  translation: __('order.details.track-details.translation'),
  time: __('order.details.track-details.time'),
  address: __('order.details.track-details.address'),
  description: __('order.details.track-details.description'),
  shipping: __('order.details.track-details.shipping_no'),
  package: __('order.details.track-details.package_no'),
};

const column = [{
  title: lang.NO,
  dataIndex: 'id',
}, {
  title: lang.package_status,
  dataIndex: 'package_status',
}, {
  title: lang.secondary_status,
  dataIndex: 'secondary_status',
}, {
  title: lang.translation,
  dataIndex: 'description',
}, {
  title: lang.time,
  dataIndex: 'handle_time',
}, {
  title: lang.address,
  dataIndex: 'handle_address',
}, {
  title: lang.description,
  dataIndex: 'handle_content',
}];

const style = { padding: '20px', 'border-top': '1px solid rgb(233,233,233)' };
class TrackDetails extends Component {
  componentWillMount() {
    this.props.dispatch(getInitData(this.props.params.id));
  }
  render() {
    const { data, params: { id } } = this.props;
    const p = this.props.location.query.p;
    return (<div style={style}>
      <h3><span>{lang.package}: {p}</span><span style={{ marginLeft: '20px' }}>{lang.shipping}:{id}</span></h3>
      <Table
        style={{ marginTop: '20px' }}
        bordered
        columns={column}
        rowKey="key"
        pagination={false}
        dataSource={data}
      />
    </div>);
  }
}

const mapStateToProps = state => ({
  data: state['order/details/track-details'].data,
});

TrackDetails.propTypes = {
  dispatch: PropsTypes.func,
  params: PropsTypes.object,
  data: PropsTypes.object,
  location: PropsTypes.object,
};

export default connect(mapStateToProps)(TrackDetails);
