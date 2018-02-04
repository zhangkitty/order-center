import React, { Component } from 'react';
import { Select, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initManualSyncMallOrder, change, submit } from './action';

const Option = Select.Option;

const lan = {
  抓取订单: '抓取订单',
  订单号: '订单号',
  站点: '站点',
};

class GrabOrder extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initManualSyncMallOrder());
  }
  render() {
    const { dispatch, site, billno, typeList, submitloading } = this.props;
    return (
      <div style={{ margin: 20, display: 'flex' }}>
        <Select
          style={{ width: 150 }}
          placeholder={lan.站点}
          onChange={
            e => dispatch(change('site', e))
          }
        >
          {
            typeList.map((value, key) => (
              <Option value={key + 1}>{value}</Option>
            ))
          }
        </Select>
        <Input
          style={{ width: 150, marginLeft: 20 }}
          placeholder={lan.订单号}
          onChange={
            e => dispatch(change('billno', e.target.value))
          }
        />
        <Button
          style={{ width: 150, marginLeft: 20 }}
          loading={submitloading}
          onClick={() => dispatch(submit({ billno, type: site }))}
        >
          {lan.抓取订单}
        </Button>
      </div >
    );
  }
}

GrabOrder.propTypes = {
  dispatch: PropTypes.func,
  site: PropTypes.number,
  billno: PropTypes.String,
  typeList: PropTypes.arrayOf(PropTypes.string),
  submitloading: PropTypes.Boolean,
};

const mapStateToProps = state => state['manually-grab-the-order'];
export default connect(mapStateToProps)(GrabOrder);
