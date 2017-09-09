import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Table, Card, Button } from 'antd';
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
  caozuo: '操作',
  tixiantuikuan: '提现退款',
  xiugaishenqing: '修改申请',
};
const RefundRecordObject = {
  id: 1, // 退款记录ID
  refund_path_name: '钱包', // 退款路径名称
};
const OrderGoodsObject = {
  id: 1001, // 订单商品ID
  status: '已审核', // 订单商品状态
  serial_number: 'A', // 序列号
  pic: '', // 商品图片链接
  sku: 'blouse170307301', // 商品sku
  attr: 'Size:M', // 商品属性
  is_assessed: 0, // 是否品控(0否1是)
  sale_price: {
    amount: 4.00, // 金额
    amount_with_symbol: '$4.00', // 带币种符号的金额字符串
    rate: 1.00000, // 当前币种汇率
    symbol: 'US$', // 当前币种符号
  }, // 销售价
  discount_price: {
    amount: 3.80, // 金额
    amount_with_symbol: '$4.00', // 带币种符号的金额字符串
    rate: 1.00000, // 当前币种汇率
    symbol: 'US$', // 当前币种符号
  }, // 折扣价
};
const RefundBillObject = {
  id: '453', // 退款单ID
  type: '差价退款', // 退款单类型
  status: '已驳回', // 退款单状态
  date_of_application: '2017-04-01 10:00:00', // 申请日期
  applicant: '王玉', // 申请人
  apply_for_refund_amount: {
    price_usd: {
      amount: '0.00',
      amount_with_symbol: 'US$0.00',
      rate: '1.00000000',
      symbol: 'US$',
    },
    price_with_exchange_rate: {
      amount: '0.00',
      amount_with_symbol: '0.00€',
      rate: '2.00000000',
      symbol: '€',
    },
  }, // 申请金额
  refund_goods_list: [
    OrderGoodsObject,
    OrderGoodsObject,
  ], // 退款商品
  refund_record_list: [
    RefundRecordObject,
    RefundRecordObject,
  ], // 退款路径
  refund_txn_id: '', // 退款交易凭证号
};
const data = [
  RefundBillObject,
  assign({}, RefundBillObject, { id: 2, status: '已退款' }),
];
const Refund = (
  {
    dataSource: { refund: { refund_bill_list } },
  },
  ) => (
    <Card
      title={
        <div>
          <span>{lan.jilu}</span>
          {
          data
            .filter(v => (
              v.refund_record_list.findIndex(d => d.refund_path_name === '钱包') > -1
            ))
            .filter(v => v.status === '已退款')
            .length
          ?
            <Button className={style.refundButton}>{lan.tixiantuikuan}</Button>
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
        dataSource={data}
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
            render: (d, rec) => (
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
          },
          {
            title: lan.pingzhenghao,
            dataIndex: 'refund_txn_id',
          },
          {
            title: lan.caozuo,
            render: rec => (
            rec.status === '已申请' || rec.status === '已驳回' ?
              <Button>{lan.xiugaishenqing}</Button> : '-'
          ),
          },
        ]}
      />

    </Card>
);
Refund.propTypes = {
  dataSource: PropTypes.shape(),
};
export default Refund;
