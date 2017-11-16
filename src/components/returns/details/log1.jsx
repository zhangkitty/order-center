import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const lan = {
  退货单操作日志:"退货单操作日志",
  时间: __('common.operationCheck1'),
  操作人: __('common.operationCheck'),
  操作日志: __('refund.details.logs_logs'),
};

const Logs1 = ({ returnsInfoData: { tradeLogs } }) => (
  <div>
    <h3 style={{ margin: '20px 0' }}>{lan.退货单操作日志}</h3>
    <Table
      size="small"
      pagination={false}
      dataSource={tradeLogs}
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

export default Logs1;
