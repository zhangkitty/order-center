import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { Link } from 'react-router';
import { refund, showReverseRefund } from './action';

// TODO: lan
const lan = {
  退款信息: '退款信息',
  订单号: '订单号',
  待退金额: '待退金额',
  退款路径: '退款路径',
  账户: '账户',
  账户信息: '账户信息',
  退款交易凭证号: '退款交易凭证号',
  退款状态: '退款状态',
  操作人: '操作人',
  操作时间: '操作时间',
  操作: '操作',
  退款: '退款',
  重新退款: '重新退款',
};

const Info = ({ dataSource: { refund_path }, dispatch, refundBillId, refundInfo }) => (
  <div>
    <h3 style={{ margin: '20px 0' }}>{lan.退款信息}</h3>
    <Table
      size="small"
      pagination={false}
      dataSource={refund_path}
      rowKey={'billno'}
      bordered
      columns={[
        {
          title: lan.订单号,
          dataIndex: 'billno',
          width: 100,
          render: (d, rec) => (
            <Link to={`order/details/entry/${rec.order_id}/${d}/refund`}>{d}</Link>
          ),
        },
        {
          title: lan.待退金额,
          dataIndex: 'refund_amount',
          width: 100,
          render: d => (
            <span style={{ color: 'red' }}>
              {d.price_usd.amount_with_symbol} {d.price_with_exchange_rate.amount_with_symbol}
            </span>
          ),
        },
        {
          title: lan.退款路径,
          dataIndex: 'refund_path',
          width: 100,
        },
        {
          title: lan.账户,
          dataIndex: 'payment_method',
          width: 100,
        },
        {
          title: lan.账户信息,
          dataIndex: 'refund_account',
          width: 150,
        },
        {
          title: lan.退款交易凭证号,
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
            <div>
              {
                // 未退款、退款失败
                (Number(rec.refund_status_code) === 1 || Number(rec.refund_status_code) === 4) &&
                <Button
                  type="primary"
                  onClick={() => (
                    dispatch(refund(
                      rec.order_id,
                      refundBillId,
                      rec.record_id,
                      rec.refund_path_id,
                      `${rec.refund_amount.price_usd.amount_with_symbol} ${rec.refund_amount.price_with_exchange_rate.amount_with_symbol}`,
                    ))
                  )}
                  loading={refundInfo.load}
                >
                  {lan.退款}
                </Button>
              }
              {
                // 已退款、退款失败
                (Number(rec.refund_status_code) === 2 || Number(rec.refund_status_code) === 4) &&
                <Button
                  type="primary"
                  style={{ marginLeft: '15px' }}
                  onClick={() => (
                    dispatch(showReverseRefund(rec.record_id))
                  )}
                  loading={refundInfo.load}
                >
                  {lan.重新退款}
                </Button>
              }
            </div>
          ),
        },
      ]}

    />
  </div>
);
Info.propTypes = {
  dataSource: PropTypes.shape(),
  refundInfo: PropTypes.shape(),
  dispatch: PropTypes.func,
  refundBillId: PropTypes.string,
};
export default Info;
