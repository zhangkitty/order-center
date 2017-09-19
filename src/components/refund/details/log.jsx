import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

// TODO: lan
const lan = {
  退款操作日志: '退款操作日志',
  时间: '时间',
  操作人: '操作人',
  操作日志: '操作日志',
};

const Logs = ({ dataSource: { refund_log } }) => (
  <div>
    <h3 style={{ margin: '20px 0' }}>{lan.需要退款的商品信息}</h3>
    <Table
      size="small"
      pagination={false}
      dataSource={refund_log}
      rowKey={'create_time'}
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
