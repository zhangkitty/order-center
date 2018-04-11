import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { init } from './action';

const lan = {
  请选择物流客服: '请选择物流客服',
};
class LogisticsCustomerService extends Component {


  render() {
    return (<div>
      <div>
        <span>{lan.请选择物流客服}</span>
        <Select />
      </div>
    </div>);
  }
}


LogisticsCustomerService.propTypes = {

};


const mapStateToProps = state => state['logistics-customer-service'];
export default connect(mapStateToProps)(LogisticsCustomerService);
