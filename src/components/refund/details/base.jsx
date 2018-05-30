import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Popover, Table, Input, message } from 'antd';
import assign from 'object-assign';
import styles from './style.css';
import { remarkInfoShow, commit, doRefundPass, markTroubleBill, remark, remarkSave } from './action';

const language = {
  退款编号: __('refund.details.base_refund_code'),
  订单号: __('refund.details.base_order_number'),
  订单总金额: __('refund.details.base_order_total'),
  礼品卡: __('refund.details.base_gift_card'),
  支付方式: __('refund.details.base_pay_method'),
  支付交易号: __('refund.details.base_pay_number'),
  剩余可退金额: __('refund.details.base_refund_need'),
  用户: __('refund.details.base_user'),
  运费和运费险: __('refund.details.base_insuer'),
  RL扣除费用: __('refund.details.base_rl_fee'),
  待退款金额: __('refund.details.base_wait_refund'),
  退款类型: __('refund.details.base_refund_type'),
  退款原因: __('refund.details.base_refund_reson'),
  申请时间: __('refund.details.base_register_time'),
  申请人: __('refund.details.base_register_user'),
  退款单状态: __('refund.details.base_refund_status'),
  查看备注信息: __('refund.details.base_refund_remark'),
  新增备注: __('refund.details.base_add_remark'),
  驳回: __('refund.details.base_reject'),
  通过: __('refund.details.base_pass'),
  退款路径: __('refund.details.base_refund_path'),
  用户钱包总额: __('refund.details.base_wallet_total'),
  提现金额: __('refund.details.base_need_price'),
  退款提交人: __('refund.details.base_need_user'),
  退款操作人: __('refund.details.base_need_operate'),
  退款返还金额: __('refund.details.base_refund_need_operate'),
  退款金额: __('refund.details.base_refund_price'),
  确认: __('refund.details.submit'),
  取消: __('common.cancel'),
  取消提现: __('refund.details.Cancel_withdrawal'),
  运费: '运费',
  运费险: '运费险',
  退: '退',
  不退: '不退',
};

const Base = ({
                dataSource: { refund_detail },
                dispatch,
                refundBillId,
                remarkInfo,
                addRemarkInfo,
                cancelTheRefundBill,
                rejectInfo,
                logInfo,
                newRemark,
}) => {
  const {
    card_payment_price, wallet_payment_price, gift_card_payment_price,
    gift_card_can_be_refunded_price, card_can_be_refunded_price,
    wallet_or_card_can_be_refunded_price, refund_amount, refund_status_code,
    refund_type_code, wallet_balance, isCod,
  } = refund_detail;

  let codFee;
  let codFee2;
  if (isCod) {
    codFee = refund_detail.cod_fee.price_usd.amount_with_symbol;
    codFee2 = refund_detail.cod_fee.price_with_exchange_rate.amount_with_symbol;
  }

  const info = {
    left: [
      { name: language.退款编号, key: 'refund_bill_id' },
      { name: language.订单号, key: 'billno' },
      { name: language.订单总金额, key: 'TOTAL' },
      { name: language.支付方式, key: 'payment_method' },
      { name: language.用户钱包总额, key: 'WALLET_TOTAL' },
      { name: language.支付交易号, key: 'txn_id' },
      { name: language.剩余可退金额, key: 'REST' },
      // { name: language.运费和运费险, key: 'shipping' },
      { name: language.运费, key: 'shipping_price' },
      { name: language.运费险, key: 'shipping_insure_price' },
      { name: language.RL扣除费用, key: 'rl_fee' },
      { name: language.待退款金额, key: 'WAIT' },
      isCod && { name: __('order.goodsRefund.codFee'), key: 'CODFEE' },
    ].filter(res => res),
    right: [
      { name: language.退款类型, key: 'refund_type' },
      { name: language.退款原因, key: 'refund_reason' },
      { name: language.申请时间, key: 'apply_time' },
      { name: language.申请人, key: 'apply_user_name' },
      { name: language.退款单状态, key: 'refund_status' },
      { name: '是否问题件', key: 'trouble_mark' },
    ],
  };

  return (
    <div className={styles.alertBg}>
      <div className={styles.baseBorder} >
        <div className={styles.baseSpace}>
          {
            info.left.map(({ name, key }) => (
              <div key={key} >
                <span className={styles.spanWidthL}>{ name }: </span>
                {
                  key === 'WALLET_TOTAL' && !!wallet_balance &&
                  <span style={{ color: 'red' }}>
                      {wallet_balance.price_usd.amount_with_symbol}, {wallet_balance
                    .price_with_exchange_rate.amount_with_symbol}
                  </span>
                }
                {
                  (key === 'shipping_price' || key === 'shipping_insure_price') &&
                  <span>
                    {refund_detail[key] === 1 ? language.退 : language.不退}
                  </span>
                }
                {
                  key === 'CODFEE' &&
                  <span>
                    {codFee},
                    {codFee2}
                  </span>
                }
                {
                  key === 'TOTAL' && !!card_payment_price &&
                  <span>
                    {card_payment_price.payment_method}:
                    {card_payment_price.price_usd.amount_with_symbol}
                    , {card_payment_price.price_with_exchange_rate.amount_with_symbol}
                    +
                  Wallet:
                    {wallet_payment_price.price_usd.amount_with_symbol}
                    , {refund_detail.wallet_payment_price.price_with_exchange_rate.amount_with_symbol}
                    +
                    {language.礼品卡}:
                    {gift_card_payment_price.price_usd.amount_with_symbol}
                    , {gift_card_payment_price.price_with_exchange_rate.amount_with_symbol}
                  </span>
                }
                {
                  key === 'REST' && !!card_can_be_refunded_price &&
                  <span>
                    {card_can_be_refunded_price.price_usd.amount_with_symbol}
                    , {card_can_be_refunded_price.price_with_exchange_rate.amount_with_symbol}
                    ({language.用户})
                  +
                    {gift_card_can_be_refunded_price.price_usd.amount_with_symbol}
                    , {gift_card_can_be_refunded_price.price_with_exchange_rate.amount_with_symbol}
                    ({language.礼品卡})
                  +
                    {wallet_or_card_can_be_refunded_price.price_usd.amount_with_symbol}
                    , {wallet_or_card_can_be_refunded_price
                      .price_with_exchange_rate.amount_with_symbol}
                    (Wallet),
                </span>
                }
                {
                  key === 'WAIT' && !!refund_amount &&
                    <span style={{ color: 'red' }}>
                      {refund_amount.price_usd.amount_with_symbol}, {refund_amount
                      .price_with_exchange_rate.amount_with_symbol}
                      </span>
                }
                {
                  (key !== 'REST'
                      && key !== 'TOTAL'
                      && key !== 'WAIT'
                      && key !== 'shipping_price'
                      && key !== 'shipping_insure_price'
                  ) &&
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
                <span className={styles.spanWidthL}>{ v.name }: </span>
                <span>
                  {
                    v.key !== 'trouble_mark' && refund_detail[v.key]
                  }
                  {
                    v.key === 'trouble_mark' &&
                        (function (temp) {
                          if (temp) {
                            return <span style={{ color: 'red' }}>是</span>;
                          }
                          return <span>否</span>;
                        }(refund_detail[v.key]))
                  }
                </span>
              </div>
            ))
          }
          {/* <Button */}
          {/* icon="eye" style={{ marginTop: '30px' }} */}
          {/* loading={remarkInfo.load} */}
          {/* onClick={() => dispatch(remarkInfoShow(refundBillId, remarkInfo))} */}
          {/* >{language.查看备注信息}</Button> */}

          <Popover
            content={
              <div>
                <Table
                  dataSource={logInfo}
                  columns={[
                    {
                      title: '操作人',
                      dataIndex: 'user_name',
                      width: '80px',
                    },
                    {
                      title: '时间',
                      dataIndex: 'add_time',
                      width: '150px',
                    },
                    {
                      title: '备注',
                      dataIndex: 'remark',
                    }]
                  }
                  size="small"
                  pagination={false}
                  style={{ width: '500px', maxHeight: '400px', overflow: 'auto' }}
                />
                <div style={{ margin: '30px 50px 15px' }}>
                  <div>
                    <div style={{ textAlign: 'left' }}>
                      {__('common.order_operation6')}
                    </div>
                    <Input.TextArea
                      style={{ margin: '10px auto' }}
                      rows={3}
                      value={newRemark}
                      onChange={
                        e => dispatch(commit('newRemark', e.target.value))
                      }
                      // onChange={e => dispatch(commit('remarkModal', assign({}, remarkModal, { remark: e.target.value })))}
                    />
                  </div>
                  <Button
                    key="submit"
                    type="primary"
                    onClick={() => {
                      // if (remarkModal.remark.trim().length === 0) {
                      //   return message.warning(__('common.order_operation9'));
                      // }
                      // return dispatch(remarkSave(orderId, remarkModal.remark));
                      if (newRemark.trim().length === 0) {
                        return message.warning('没有备注信息');
                      }
                      return dispatch(remarkSave(refund_detail.order_id, newRemark));
                    }}
                    // style={btnStyle}
                  >
                    保存
                  </Button>
                </div>
              </div>
            }
            trigger="click"
          >
            <Button
              onClick={() => dispatch(remark(refund_detail.order_id))}
            >
            备注
          </Button>
          </Popover>
          {
            refund_detail.refund_status_code === '4' && refund_detail.apply_user_name === '用户'
            && refund_detail.refund_type_code === '3'
                  ?
                    <Button
                      style={{ marginLeft: 20 }}
                      onClick={() => dispatch(commit('cancelTheRefundBill', assign({}, cancelTheRefundBill, { show: true })))}
                    >{language.取消提现}</Button>
              : null
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* <Button */}
          {/* icon="plus" */}
          {/* onClick={() => dispatch(commit('addRemarkInfo', assign({}, addRemarkInfo, { reamrkShow: true, remark: '' })))} */}
          {/* > */}
          {/* {language.新增备注} */}
          {/* </Button> */}
          {
            !refund_detail.trouble_mark && <Popover
              trigger="click"
              content={
                <div>
                  <div>
                    <h3 style={{ color: '#008dff' }}>标记为问题件</h3>
                  </div>
                  <div style={{ marginLeft: 40 }}>
                    <Button
                      style={{ marginLeft: 5 }} size="small"
                      onClick={() => dispatch(markTroubleBill(refund_detail.refund_bill_id, 1))}
                    >
                        标记
                      </Button>
                  </div>
                </div>
                }
            >
              <Button
                style={{ marginTop: 10 }}
              >
                问题件
              </Button>
            </Popover>
          }


          {
            refund_detail.trouble_mark && <Popover
              trigger="click"
              content={
                <div>
                  <div>
                    <h3 style={{ color: '#008dff' }}>取消标记</h3>
                  </div>
                  <div style={{ marginLeft: 40 }}>
                    <Button
                      style={{ marginLeft: 5 }}
                      size="small"
                      onClick={() => dispatch(markTroubleBill(refund_detail.refund_bill_id, 0))}
                    >
                        取消标记
                      </Button>
                  </div>
                </div>
                }
            >
              <Button
                style={{ marginTop: 10 }}
              >
                取消问题件
              </Button>
            </Popover>

          }

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
                    {refund_amount.price_usd.amount_with_symbol}, {refund_amount
                    .price_with_exchange_rate.amount_with_symbol}
                  </span>
                </div>
              }
              onConfirm={() => dispatch(doRefundPass({
                refund_bill_id: refundBillId,
                refund_amount: refund_amount.price_usd.amount,
                refund_currency: refund_amount.price_with_exchange_rate.amount,
                currency_code: refund_amount.price_with_exchange_rate.symbol,
              }))}
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
  cancelTheRefundBill: PropTypes.shape(),
};
export default Base;
