import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import assign from 'object-assign';
import { Link } from 'react-router';
import { refund, showReverseRefund, commit } from './action';

const lan = {
  退款信息: __('refund.details.info_refund_info'),
  订单号: __('refund.details.base_order_number'),
  待退金额: __('refund.details.base_wait_refund'),
  退款路径: __('refund.details.base_refund_path'),
  账户: __('refund.details.info_account'),
  账户信息: __('refund.details.info_account_info'),
  退款交易凭证号: __('refund.details.info_refund_protocal'),
  退款状态: __('refund.details.info_refund_status'),
  操作人: __('common.operationCheck'),
  操作时间: __('refund.details.info_operate_time'),
  操作: __('common.operationCheck2'),
  退款: __('refund.details.info_renfund'),
  重新退款: __('refund.details.info_renfund_agian'),
  更改: __('refund.details.change'),
};

const Info = (
  {
    dataSource: { refund_path, refund_detail: { refund_type_code } },
    dispatch, refundBillId, refundInfo, changeOrderInfo,
  },
  ) => (
    <div>
      <h3 style={{ margin: '20px 0' }}>{lan.退款信息}</h3>
      <Table
        size="small"
        pagination={false}
        dataSource={refund_path}
        rowKey={'record_id'}
        bordered
        columns={[
          {
            title: lan.订单号,
            dataIndex: 'billno',
            width: 130,
            render: (d, rec) => (
              <div>
                <Link to={`order/details/entry/${rec.order_id}/${d}/refund`}>{d}</Link>
                {
                  // 退款记录为未退款/退款失败 且 订单类型为提现退款时，显示
                  ((+rec.refund_status_code === 1 || +rec.refund_status_code === 4) && +refund_type_code === 3) &&
                  <Button
                    type="primary"
                    style={{ marginLeft: '5px' }}
                    onClick={() => dispatch(commit('changeOrderInfo', assign({}, changeOrderInfo, { show: true, billno: '', refund_record_id: rec.record_id, refundBillId })))}
                  >
                    {lan.更改}
                  </Button>
                }
              </div>
          ),
          },
          {
            title: lan.待退金额,
            dataIndex: 'refund_amount',
            width: 100,
            render: d => (
              <span style={{ color: 'red' }}>
                {d.price_usd.amount_with_symbol}, {d.price_with_exchange_rate.amount_with_symbol}
              </span>
          ),
          },
          {
            title: lan.退款路径,
            dataIndex: 'refund_path',
            width: 70,
          },
          {
            title: lan.账户,
            dataIndex: 'payment_method',
            width: 70,
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
            width: 80,
          },
          {
            title: lan.操作人,
            dataIndex: 'operation_user_name',
            width: 70,
          },
          {
            title: lan.操作时间,
            dataIndex: 'operation_time',
            width: 100,
          },
          {
            title: lan.操作,
            width: 130,
            render: rec => (
              <div>
                {
                // 未退款、退款失败、非退款返还
                ((Number(rec.refund_status_code) === 1 || Number(rec.refund_status_code) === 4) &&
                Number(refund_type_code) !== 4) &&
                <Button
                  type="primary"
                  style={{ marginLeft: '5px' }}
                  onClick={() => (
                    dispatch(refund(
                      rec.order_id,
                      refundBillId,
                      rec.record_id,
                      rec.refund_path_id,
                      `${rec.refund_amount.price_usd.amount_with_symbol}, ${rec.refund_amount.price_with_exchange_rate.amount_with_symbol}`,
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
                  style={{ marginLeft: '5px' }}
                  onClick={() => (
                    dispatch(showReverseRefund(rec.record_id))
                  )}
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
  changeOrderInfo: PropTypes.shape(),
};
export default Info;
