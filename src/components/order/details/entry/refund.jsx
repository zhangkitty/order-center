import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Link } from 'react-router';
import { Table, Card, Popconfirm, Button, Modal, Input, Select, Icon, message } from 'antd';
import { cancelRefund, commit, commit2, refundAccount } from './action';
import style from './style.css';


const Option = Select.Option;
const star = (<span style={{ color: 'red' }}>*</span>);

const lan = {
  jilu: __('order.entry.refund_1'),
  bianhao: __('order.entry.refund_2'),
  leixing: __('order.entry.refund_3'),
  shijian: __('order.entry.refund_4'),
  ren: __('order.entry.refund_5'),
  jine: __('order.entry.refund_6'),
  shangpin: __('order.entry.refund_7'),
  lujin: __('order.entry.refund_8'),
  yuanyin: __('order.entry.refund_17'),
  zhaungtai: __('order.entry.refund_9'),
  pingzhenghao: __('order.entry.refund_10'),
  bohuiyuanyin: __('order.entry.refund_11'),
  caozuo: __('order.entry.refund_12'),
  tixiantuikuan: __('order.entry.refund_13'),
  xiugaishenqing: __('order.entry.refund_14'),
  quxiaotuikuai: __('order.entry.refund_15'),
  cancelRefund: __('order.entry.refund_16'),
};

class Refund extends Component {
  render() {
    const {
      // dataSource: { refund: { refund_bill_list } },
      dataSource: { refund },
      billno,
      orderId,
      refund_account,
      dispatch,
      RefundShow,
    } = this.props;
    const {
      order_id,
      refund_method,
      account_info,
      bank_code,
      card_number,
      customer,
      issuing_city,
    //  refund_method_account,
    } = refund_account;
    return (
      <div className={style.contentPadding}>
        <Card
          title={
            <div>
              <span>{lan.jilu}</span>
              <span className={style.refundButton}>
                <Button
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    dispatch(commit2('refund_method', null));
                    dispatch(commit2('account_info', null));
                    dispatch(commit2('bank_code', null));
                    dispatch(commit2('card_number', null));
                    dispatch(commit2('customer', null));
                    dispatch(commit2('issuing_city', null));
                    dispatch(commit('RefundShow', true));
                  }}
                >
                  {__('order.entry.refund_account')}
                </Button>
                {
                  // 已退并且有钱包
                  (refund.refund_bill_list || [])
                    .filter(v => (
                      v.refund_record_list.findIndex(d => d.id === 2) > -1
                    ))
                    .filter(v => Number(v.status_code) === 3)
                    .length
                    ?
                      <Link to={`order/details/cash-refund/${orderId}`}>{lan.tixiantuikuan}</Link>
                    :
                    null
                }
              </span>
            </div>
          }
        >
          <Table
            rowKey="id"
            dataSource={refund.refund_bill_list || []}
            columns={[
              {
                title: lan.bianhao,
                dataIndex: 'id',
                width: '60px',
              },
              {
                title: __('order.name.order_number'),
                dataIndex: 'billno',
                width: '80px',
              },
              {
                title: lan.leixing,
                dataIndex: 'type',
                width: '80px',
              },
              {
                title: lan.shijian,
                dataIndex: 'date_of_application',
                width: '130px',
              },
              {
                title: lan.ren,
                dataIndex: 'applicant',
                width: '60px',
              },
              {
                title: lan.jine,
                dataIndex: 'apply_for_refund_amount',
                width: '130px',
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
                // width: '180px',
                render: d => (<span>{d.join('、')}</span>),
              },
              {
                title: lan.lujin,
                dataIndex: 'refund_record_list',
                width: '70px',
                render: d => (<span>{d.map(v => v.refund_path_name).join('、')}</span>),
              },
              {
                title: lan.yuanyin,
                dataIndex: 'refund_reason',
                width: '70px',
              },
              {
                title: lan.zhaungtai,
                dataIndex: 'status',
                width: '80px',
              },
              {
                title: lan.bohuiyuanyin,
                dataIndex: 'reject_reason',
                width: '100px',
              },
              {
                title: lan.pingzhenghao,
                dataIndex: 'refund_txn_id',
                width: '100px',
              },
              {
                title: lan.caozuo,
                width: '100px',
                render: rec => (
                  <div>
                    {
                      Number(rec.type_id) < 3 &&
                      (Number(rec.status_code) === 4 || Number(rec.status_code) === 1) ?
                        <Link
                          to={`order/details/change-refund/${rec.id}`}
                          style={{ marginRight: '5px' }}
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
                          <Button>{lan.quxiaotuikuai}</Button>
                        </Popconfirm>
                        : null
                    }
                  </div>
                ),
              },
            ]}
          />
          <div>
            <div className={style.refund_account_title}>{__('order.entry.refund_23')}</div>
            <div style={{ color: '#333' }}>
              <div className={style.payLog}>
                <span className={style.paymentInline}>{__('order.entry.refund_24')}</span>
                <span className={style.paymentInline}>{__('order.entry.refund_25')}</span>
                <span className={style.paymentInline}>{__('order.entry.refund_22')}</span>
              </div>
              {refund.refund_underline_account ?
                <div className={style.payLog}>
                  <span className={style.paymentInline}>
                    {refund.refund_underline_account.billno}
                  </span>
                  <span className={style.paymentInline}>
                    {refund.refund_underline_account.refund_method}
                  </span>
                  <span className={style.paymentInline}>
                    {refund.refund_underline_account.refund_method_id === 3 ?
                      <span>
                        {refund.refund_underline_account.bank_code},&nbsp;
                        {refund.refund_underline_account.card_number},&nbsp;
                        {refund.refund_underline_account.customer_name},&nbsp;
                        {refund.refund_underline_account.issuing_city}
                      </span>
                      :
                      <span>{refund.refund_underline_account.account_info}</span>
                    }
                  </span>
                </div>
                :
                <div style={{ textAlign: 'center', color: 'rgba(0,0,0, .8)' }}><Icon type="frown-o" /> {__('common.contentTitle')}</div>
              }
            </div>
          </div>

          {/* Modal 填写退款账户  */}
          <Modal
            visible={RefundShow}
            footer={null}
            onCancel={() => dispatch(commit('RefundShow', false))}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!refund_method) {
                  return message.warning(__('common.submitTitle3'));
                }
                return dispatch(refundAccount(assign({},
                  refund_account,
                  {
                    order_id: orderId,
                    refund_method: refund_method ? refund_method.trim() : null,
                    account_info: account_info ? account_info.trim() : null,
                    bank_code: bank_code ? bank_code.trim() : null,
                    card_number: card_number ? card_number.trim() : null,
                    customer: customer ? customer.trim() : null,
                    issuing_city: issuing_city ? issuing_city.trim() : null,
                  })));
              //  return dispatch(commit('RefundShow', false));
              }}
            >
              <div style={{ margin: '10px 0' }}>
                <div className={style.refund_list} style={{ display: 'none' }}>
                  <span className={style.refund_name}>{star}{__('order.name.order_id')}</span>{orderId}
                </div>
                <div className={style.refund_list}>
                  <span className={style.refund_name}>{star}{__('order.name.order_number')}</span>{billno}
                </div>
                <div className={style.refund_list}>
                  <span className={style.refund_name}>{star}{__('order.entry.cash_content6')}</span>
                  <Select
                    allowClear
                    placeholder={__('order.goodsRefund.please_select_a_refund_account')}
                    className={style.priceSelect}
                    onChange={value => dispatch(commit2('refund_method', value))}
                    value={refund_method}
                  >
                    {
                      refund.refund_method_list.map(v => (
                        <Option key={v.id}>{v.name}</Option>
                      ))
                    }
                  </Select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  {/* 退款方式 = yes bank， 银行代码/银行卡号/顾客姓名/发卡城市     */}
                  {
                    +refund_method === 3 &&
                    <div>
                      <div className={style.refund_list}>
                        <span className={style.refund_name}>{star}{__('order.entry.refund_18')}</span>
                        <Input
                          placeholder={__('order.entry.cash_content10')} // 请输入银行代码
                          className={style.priceInput}
                          required
                          value={bank_code}
                          onChange={(e) => {
                            if (/\s/.test(e.target.value)) { return false; } // 不允许空格
                            return dispatch(commit2('bank_code', e.target.value));
                          }}
                        />
                      </div>
                      <div className={style.refund_list}>
                        <span className={style.refund_name}>{star}{__('order.entry.refund_19')}</span>
                        <Input
                          placeholder={__('order.entry.cash_content11')} // 请输入银行卡号-账户信息
                          className={style.priceInput}
                          required
                          value={card_number}
                          onChange={(e) => {
                            if (/\s/.test(e.target.value)) { return false; } // 不允许空格
                            return dispatch(commit2('card_number', e.target.value));
                          }}
                        />
                      </div>
                      <div className={style.refund_list}>
                        <span className={style.refund_name}>{star}{__('order.entry.refund_20')}</span>
                        <Input
                          placeholder={__('order.entry.cash_content12')} // 请输入顾客姓名
                          className={style.priceInput}
                          required
                          value={customer}
                          onChange={(e) => {
                            if (/\s/.test(e.target.value)) { return false; }  // 不允许空格
                            return dispatch(commit2('customer', e.target.value));
                          }}
                        />
                      </div>
                      <div className={style.refund_list}>
                        <span className={style.refund_name}>{star}{__('order.entry.refund_21')}</span>
                        <Input
                          placeholder={__('order.entry.cash_content13')} // 请输入发卡城市
                          className={style.priceInput}
                          required
                          value={issuing_city}
                          onChange={(e) => {
                            if (/\s/.test(e.target.value)) { return false; }   // 不允许空格
                            return dispatch(commit2('issuing_city', e.target.value));
                          }}
                        />
                      </div>
                    </div>
                  }

                  {/* 账户--其他 */}
                  {
                    // +refund_method === 4 ?
                    //   <div className={style.refund_list}>
                    //     <span className={style.refund_name}>
                    //      {star}{__('order.entry.cash_content6')}
                    //     </span>
                    //     <Input
                    //       placeholder={__('order.entry.cash_content8')} // 请输入正确的退款账户
                    //       className={style.priceInput}
                    //       required
                    //       value={refund_method_account}
                    //       onChange={(e) => {
                    //         dispatch(commit2('refund_method_account', e.target.value));
                    //       }}
                    //     />
                    //   </div>
                    //   :
                    //   null
                  }
                  {/* 退款方式 = Paytm  */}
                  {/* 退款方式 = PayPal */}
                  {/* 退款账户信息 !== 'yes bank' 显示 */}
                  {
                    +refund_method !== 3 &&
                    <div className={style.refund_list}>
                      <span className={style.refund_name}>{star}{__('order.entry.refund_22')}</span>
                      <Input
                        placeholder={__('order.entry.cash_content7')} // 请输入正确的退款账户信息
                        required
                        className={style.priceInput}
                        value={account_info}
                        onChange={(e) => {
                          if (/\s/.test(e.target.value)) { return false; }   // 不允许空格
                          return dispatch(commit2('account_info', e.target.value));
                        }}
                      />
                    </div>
                  }
                </div>
                <Button style={{ marginLeft: '50px' }} onClick={() => dispatch(commit('RefundShow', false))}>{__('order.entry.cancel')}</Button>
                <Button type="primary" style={{ marginLeft: '50px' }} htmlType={'submit'}>{__('order.entry.confirm')}</Button>
              </div>
            </form>
          </Modal>
        </Card>
      </div>
    );
  }
}


Refund.propTypes = {
  dataSource: PropTypes.shape(),
  billno: PropTypes.string,
  orderId: PropTypes.string,
  refund_account: PropTypes.shape(),
  dispatch: PropTypes.func,
  RefundShow: PropTypes.bool,
};
export default Refund;
