import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import assign from 'object-assign';
import styles from './style.css';
import { remarkInfoShow, commit, doRefundPass } from './action';

// TODO: lan
const language = {
  退款编号: '退款编号',
  订单号: '订单号',
  订单总金额: '订单总金额',
  礼品卡: '礼品卡',
  支付方式: '支付方式',
  支付交易号: '支付交易号',
  剩余可退金额: '剩余可退金额',
  用户: '用户',
  运费和运费险: '运费和运费险',
  RL扣除费用: 'RL扣除费用',
  待退款金额: '待退款金额',
  退款类型: '退款类型',
  退款原因: '退款原因',
  申请时间: '申请时间',
  申请人: '申请人',
  退款单状态: '退款单状态',
  查看备注信息: '查看备注信息',
  新增备注: '新增备注',
  驳回: '驳回',
  通过: '通过',
  退款路径: '退款路径', //  TODO
  用户钱包总额: '用户钱包总额',
  提现金额: '提现金额', // TODO：
  退款提交人: '退款提交人', // TODO：
  退款操作人: '退款操作人', // TODO
  退款返还金额: '退款返还金额',
  退款金额: '退款金额',
  确认: '确认',
  取消: '取消',
};

const Base = ({
                dataSource: { refund_detail },
                dispatch,
                refundBillId,
                remarkInfo,
                addRemarkInfo,
                rejectInfo,
}) => {
  const info = {
    left: [
      { name: language.退款编号, key: 'refund_bill_id' },
      { name: language.订单号, key: 'billno' },
      { name: language.订单总金额, key: 'TOTAL' },
      { name: language.支付方式, key: 'payment_method' },
      { name: language.用户钱包总额, key: 'WALLET_TOTAL' },
      { name: language.支付交易号, key: 'txn_id' },
      { name: language.剩余可退金额, key: 'REST' },
      { name: language.运费和运费险, key: 'shipping' },
      { name: language.RL扣除费用, key: 'rl_fee' },
      { name: language.待退款金额, key: 'WAIT' },

    ],
    right: [
      { name: language.退款类型, key: 'refund_type' },
      { name: language.退款原因, key: 'refund_reason' },
      { name: language.申请时间, key: 'apply_time' },
      { name: language.申请人, key: 'apply_user_name' },
      { name: language.退款单状态, key: 'refund_status' },
    ],
  };
  const {
    card_payment_price, wallet_payment_price, gift_card_payment_price,
    gift_card_can_be_refunded_price, card_can_be_refunded_price,
    wallet_or_card_can_be_refunded_price, refund_amount, refund_status_code,
    refund_type_code, wallet_balance,
  } = refund_detail;
  return (
    <div className={styles.alertBg}>
      <div className={styles.baseBorder} >
        <div className={styles.baseSpace}>
          {
            info.left.map(({ name, key }) => (
              <div key={key} >
                <span className={styles.spanWidthL}>{ name }: </span>
                {
                  key === 'WALLET_TOTAL' &&
                  <span style={{ color: 'red' }}>
                      {wallet_balance.price_usd.amount_with_symbol} {wallet_balance
                    .price_with_exchange_rate.amount_with_symbol}
                  </span>
                }
                {
                  key === 'TOTAL' &&
                  <span>
                    {card_payment_price.payment_method}:
                    {card_payment_price.price_usd.amount_with_symbol},
                    {card_payment_price.price_with_exchange_rate.amount_with_symbol}
                    +
                  Wallet:
                    {wallet_payment_price.price_usd.amount_with_symbol},
                    {refund_detail.wallet_payment_price.price_with_exchange_rate.amount_with_symbol}
                    +
                    {language.礼品卡}:
                    {gift_card_payment_price.price_usd.amount_with_symbol},
                    {gift_card_payment_price.price_with_exchange_rate.amount_with_symbol}
                  </span>
                }
                {
                  key === 'REST' &&
                  <span>
                    {card_can_be_refunded_price.price_usd.amount_with_symbol},
                    {card_can_be_refunded_price.price_with_exchange_rate.amount_with_symbol}
                    ({language.用户})
                  +
                    {gift_card_can_be_refunded_price.price_usd.amount_with_symbol},
                    {gift_card_can_be_refunded_price.price_with_exchange_rate.amount_with_symbol}
                    ({language.礼品卡})
                  +
                    {wallet_or_card_can_be_refunded_price.price_usd.amount_with_symbol},
                    {wallet_or_card_can_be_refunded_price
                      .price_with_exchange_rate.amount_with_symbol}
                    (Wallet),
                </span>
                }
                {
                  key === 'WAIT' &&
                    <span style={{ color: 'red' }}>
                      {refund_amount.price_usd.amount_with_symbol} {refund_amount
                      .price_with_exchange_rate.amount_with_symbol}
                      </span>
                }
                {
                  (key !== 'REST' || key !== 'TOTAL' || key !== 'WAIT') &&
                  <span>{refund_detail[key]}</span>
                }
              </div>
            ))
          }
        </div>
        <div className={styles.baseSpace}>
          {
            info.right.map(v => (
              <div key={v.key} >
                <span className={styles.spanWidthR}>{ v.name }: </span>
                <span>{refund_detail[v.key]}</span>
              </div>
            ))
          }
          <Button
            icon="eye" style={{ marginTop: '30px' }}
            loading={remarkInfo.load}
            onClick={() => dispatch(remarkInfoShow(refundBillId, remarkInfo))}
          >{language.查看备注信息}</Button>
        </div>
        <div>
          <Button icon="plus" onClick={() => dispatch(commit('addRemarkInfo', assign({}, addRemarkInfo, { reamrkShow: true, remark: '' })))}>{language.新增备注}</Button>
        </div>
      </div>
      <div>
        {
          Number(refund_status_code) === 1 &&
          <Button
            style={{ marginLeft: '300px' }} type="primary"
            onClick={() => dispatch(commit('rejectInfo', assign({}, rejectInfo, { reamrkShow: true, reason: '' })))}
          >{language.驳回}</Button>
        }
        {
          Number(refund_status_code) === 1 && Number(refund_type_code) === 4 &&
            <Popconfirm
              title={
                <div>
                  <span>{language.退款返还金额}</span>
                  <p>{language.退款金额}</p>
                  <span>
                    {refund_amount.price_usd.amount_with_symbol} {refund_amount
                    .price_with_exchange_rate.amount_with_symbol}
                  </span>
                </div>
              }
              onConfirm={() => dispatch(doRefundPass())}
              okText={language.确认}
              cancelText={language.取消}
            >
              <Button style={{ marginLeft: '20px' }} type="primary">{language.通过}</Button>
            </Popconfirm>
        }
      </div>
    </div>

  );
};
Base.propTypes = {
  dataSource: PropTypes.shape(),
  addRemarkInfo: PropTypes.shape(),
  rejectInfo: PropTypes.shape(),
  dispatch: PropTypes.func,
  refundBillId: PropTypes.string,
  remarkInfo: PropTypes.shape(),
};
export default Base;
