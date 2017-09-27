import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const lan = {
  退款操作日志: __('refund.details.logs_renfund_logs'),
  时间: __('common.operationCheck1'),
  操作人: __('common.operationCheck'),
  操作日志: __('common.logs_logs'),
};

const Logs = ({ dataSource: { refund_log } }) => (
  <div>
    <h3 style={{ margin: '20px 0' }}>{lan.需要退款的商品信息}</h3>
    <Table
      size="small"
      pagination={false}
      dataSource={refund_log}
      rowKey={'create_time'}
      bordered
      columns={[
        {
          title: lan.时间,
          dataIndex: 'create_time',
          width: 100,
        },
        {
          title: lan.操作人,
          dataIndex: 'operation_user_name',
          width: 100,
        },
        {
          title: lan.操作日志,
          dataIndex: 'content',
          width: 100,
        },
      ]}

    />
  </div>
);
Logs.propTypes = {
  dataSource: PropTypes.shape(),
};
export default Logs;
