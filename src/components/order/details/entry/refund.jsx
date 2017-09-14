import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Table, Card, Popconfirm, Button } from 'antd';
import { cancelRefund } from './action';
import style from './style.css';

const lan = {
  jilu: __('order.entry.refund_1'),
  bianhao: __('order.entry.refund_2'),
  leixing: __('order.entry.refund_3'),
  shijian: __('order.entry.refund_4'),
  ren: __('order.entry.refund_5'),
  jine: __('order.entry.refund_6'),
  shangpin: __('order.entry.refund_7'),
  lujin: __('order.entry.refund_8'),
  zhaungtai: __('order.entry.refund_9'),
  pingzhenghao: __('order.entry.refund_10'),
  bohuiyuanyin: __('order.entry.refund_11'),
  caozuo: __('order.entry.refund_12'),
  tixiantuikuan: __('order.entry.refund_13'),
  xiugaishenqing: __('order.entry.refund_14'),
  quxiaotuikuai: __('order.entry.refund_15'),
  cancelRefund: __('order.entry.refund_16'),
};
const to = id => ({
  1: `/order/details/modify-goods-refund/${id}`,
  2: `/order/details/modify-diff-refund/${id}`,
});

const Refund = (
  {
    dataSource: { refund: { refund_bill_list } },
    orderId,
    dispatch,
  },
  ) => (
    <div className={style.contentPadding}>
      <Card
        title={
          <div>
            <span>{lan.jilu}</span>
            {
              // 已退并且有钱包
              (refund_bill_list || [])
                .filter(v => (
                  v.refund_record_list.findIndex(d => d.id === 2) > -1
                ))
                .filter(v => Number(v.status_code) === 3)
                .length
                ?
                  <Link className={style.refundButton} to={`order/details/withdraw/${orderId}`}>{lan.tixiantuikuan}</Link>
                  :
                  null
            }
          </div>
        }
      >
        <Table
          size="small"
          rowKey="id"
          pagination={false}
          dataSource={refund_bill_list || []}
          columns={[
            {
              title: lan.bianhao,
              dataIndex: 'id',
            },
            {
              title: lan.leixing,
              dataIndex: 'type',
            },
            {
              title: lan.shijian,
              dataIndex: 'date_of_application',
            },
            {
              title: lan.ren,
              dataIndex: 'applicant',
            },
            {
              title: lan.jine,
              dataIndex: 'apply_for_refund_amount',
              render: d => (
                <span>
                  {d.price_usd.amount_with_symbol}
                  ---
                  {d.price_with_exchange_rate.amount_with_symbol}
                </span>
              ),
            },
            {
              title: lan.shangpin,
              dataIndex: 'refund_goods_list',
              render: d => (<span>{d.map(v => v.serial_number).join('、')}</span>),
            },
            {
              title: lan.lujin,
              dataIndex: 'refund_record_list',
              render: d => (<span>{d.map(v => v.refund_path_name).join('、')}</span>),
            },
            {
              title: lan.zhaungtai,
              dataIndex: 'status',
            },
            {
              title: lan.bohuiyuanyin,
              dataIndex: 'reject_reason',
            },
            {
              title: lan.pingzhenghao,
              dataIndex: 'refund_txn_id',
            },
            {
              title: lan.caozuo,
              render: rec => (
                <div>
                  {
                    rec.type_id < 3 && rec.status_code === 4 || rec.status_code === 1 ?
                      <Link
                        to={to(rec.id)[rec.type_id]}
                      >
                        {lan.xiugaishenqing}
                      </Link> : null
                  }
                  {
                    rec.status_code === 4 || rec.status_code === 1 ?
                      <Popconfirm
                        title={lan.cancelRefund}
                        onConfirm={() => dispatch(cancelRefund(rec.id))}
                      >
                        <Button style={{ marginLeft: '5px' }}>{lan.quxiaotuikuai}</Button>
                      </Popconfirm>
                      : null
                  }
                </div>
              ),
            },
          ]}
        />

      </Card>
    </div>
);

Refund.propTypes = {
  dataSource: PropTypes.shape(),
  orderId: PropTypes.string,
  dispatch: PropTypes.func,
};
export default Refund;
