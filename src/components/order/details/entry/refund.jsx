import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Table, Card, Popconfirm, Button } from 'antd';
import { cancelRefund } from './action';
import style from './style.css';

const lan = {
  jilu: '退款记录',
  bianhao: '退款单编号',
  leixing: '退款单类型',
  shijian: '申请时间',
  ren: '申请人',
  jine: '申请金额',
  shangpin: '退款商品',
  lujin: '退款路径',
  zhaungtai: '退款单状态',
  pingzhenghao: '退款交易凭证号',
  bohuiyuanyin: '驳回原因',
  caozuo: '操作',
  tixiantuikuan: '提现退款',
  xiugaishenqing: '修改申请',
  quxiaotuikuai: '取消退款',
  cancelRefund: '确认取消此退款单',
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
    <Card
      style={{ maxWidth: '1200px' }}
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
                {d.price_usd.amount_with_symbol} --- {d.price_with_exchange_rate.amount_with_symbol}
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
          },{
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
);
Refund.propTypes = {
  dataSource: PropTypes.shape(),
  orderId: PropTypes.string,
  dispatch: PropTypes.func,
};
export default Refund;
