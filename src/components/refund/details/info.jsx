import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { Link } from 'react-router';

// TODO: lan
const lan = {
  退款信息: '退款信息',
  订单号: '订单号',
  待退金额: '待退金额',
  退款路径: '退款路径',
  账户: '账户',
  账户信息: '账户信息',
  退款交易号: '退款交易号',
  退款状态: '退款状态',
  操作人: '操作人',
  操作时间: '操作时间',
  操作: '操作',
  退款: '退款',
};

const Info = ({ dataSource: { refund_path } }) => (
  <div>
    <h3 style={{ margin: '20px 0' }}>{lan.退款信息}</h3>
    <Table
      size="small"
      pagination={false}
      dataSource={refund_path}
      rowKey={'billno'}
      columns={[
        {
          title: lan.订单号,
          dataIndex: 'billno',
          width: 100,
          render: (d, rec) => (
            <Link to={`order/details/entry/${rec.order_id}/${d}/refund`} />
          ),
        },
        {
          title: lan.退款路径,
          dataIndex: 'refund_path',
          width: 100,
        },
        {
          title: lan.账户, // TODO: 文档缺少
          dataIndex: 'accound_accound',
          width: 100,
        },
        {
          title: lan.账户信息,
          dataIndex: 'refund_account',
          width: 150,
        },
        {
          title: lan.退款交易号,
          dataIndex: 'refund_txn_id',
          width: 100,
        },
        {
          title: lan.退款状态,
          dataIndex: 'refund_status',
          width: 100,
        },
        {
          title: lan.操作人,
          dataIndex: 'operation_user_name',
          width: 100,
        },
        {
          title: lan.操作时间,
          dataIndex: 'operation_time',
          width: 100,
        },
        {
          title: lan.操作,
          width: 100,
          render: rec => (
            <Button>{lan.退款}</Button>
          ),
        },
      ]}

    />
  </div>
);
Info.propTypes = {
  dataSource: PropTypes.shape(),
};
export default Info;
