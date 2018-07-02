import React from 'react';
import PropTypes from 'prop-types';
import { Card, Alert, Button, Popover } from 'antd';
import style from './style.css';
import { profitShowAction } from './action';

const lan = {
  zhifuqudao: __('order.entry.payment_1'),
  zhehouzongjia: __('order.entry.payment_2'),
  qianbao: __('order.entry.payment_3'),
  youhuiquanba: __('order.entry.payment_4'),
  youhuidikou: __('order.entry.payment_5'),
  CODfuwu: __('order.entry.payment_6'),
  fukuanpingzh: __('order.entry.payment_7'),
  baoxian: __('order.entry.payment_8'),
  yunfei: __('order.entry.payment_9'),
  jifen: __('order.entry.payment_10'),
  lipinka: __('order.entry.payment_11'),
  zongjia: __('order.entry.payment_12'),
  CODyingfu: __('order.entry.payment_13'),
  jiaoyijulu: __('order.entry.payment_14'),
  chakanlirun: __('order.entry.payment_15'),
  goodszongjia: __('order.entry.payment_16'),
  youhuijuanzhekoe: __('order.entry.payment_17'),
  jifenzhekoe: __('order.entry.payment_18'),
  vat_fee: __('order.entry.payment_19'),
  tariff_fee: __('order.entry.payment_20'),
  taxpayer_type: __('order.entry.payment_21'),
  汇率名称: '汇率名称',
  汇率值: '汇率值',
};
const Payment = (
  {
    dataSource: { pay: {
      cod,
      pay_way, discount_total_price, wallet, favor_coupon, favor_discount,
      options, pay_voucher, insurance_fee, tran_fee, points, gift_discount,
      pay_total_price, log,
      vat_fee, tariff_fee, taxpayer_type, currency_code, currency_value,
    } },
    profit,
    profitShow,
    dispatch,
    orderId,
    profitLoad,
  },
) => {
  const left = [
    { name: lan.zhifuqudao, value: pay_way },
    { name: lan.zhehouzongjia, value: discount_total_price },
    { name: lan.qianbao, value: wallet },
    { name: lan.youhuiquanba, value: favor_coupon },
    { name: lan.youhuidikou, value: favor_discount },
    { name: lan.vat_fee, value: vat_fee },
    { name: lan.tariff_fee, value: tariff_fee },
    { name: lan.taxpayer_type, value: taxpayer_type },
    cod ? { name: lan.CODfuwu, value: options.cod_fee } : null,
  ].filter(res => res);
  const right = [
    { name: lan.fukuanpingzh, value: pay_voucher },
    { name: lan.baoxian, value: insurance_fee },
    { name: lan.yunfei, value: tran_fee },
    { name: lan.jifen, value: points },
    { name: lan.lipinka, value: gift_discount },
    { name: lan.汇率名称, value: currency_code },
    { name: lan.汇率值, value: currency_value },

  ];
  return (
    <div className={style.contentPadding}>
      <div className={style.paymentFlex}>
        <div>
          {
            left.map(v => (
              <div key={v.name} className={style.paymentInfo}>
                <span className={style.spanWidthL}>{v.name}: </span>
                <pre className={style.spanWidthR}>
                  {v.value}
                </pre>
              </div>
            ))
          }
        </div>
        <div className={style.paymentInfo}>
          {
            right.map(v => (
              <div key={v.name}>
                <span className={style.spanWidthL}>{v.name}: </span>
                <pre className={style.spanWidthR}>{v.value}</pre>
              </div>
            ))
          }
          <div style={{ marginTop: '30px' }}>
            <h3 className={style.spanWidthL}>{lan.zongjia}:</h3>
            <pre className={style.codspanWidthR}>{pay_total_price}</pre>
          </div>
          {
            cod ?
              <div>
                <h3 className={style.spanWidthL}>{lan.CODyingfu}: </h3>
                <pre className={style.codspanWidthR}>{options.cod_pay_money}</pre>
              </div>
              : null
          }
        </div>
      </div>
      <Card
        title={lan.jiaoyijulu}
      //  style={{ maxWidth: '1200px' }}
      >
        {

          log.map(({ pay_time, pay_way: pw, tran_no, merchant }) => (
            <div key={tran_no} className={style.payLog}>
              <span className={style.paymentInline}>{pay_time}</span>
              <span className={style.paymentInline}>{pw}</span>
              {
                !!merchant && <span className={style.paymentInline}>{merchant}</span>
              }
              <span className={style.paymentInline}>{tran_no}</span>
            </div>
          ))
        }
      </Card>
      <Button
        onClick={() => dispatch(profitShowAction(orderId))}
        loading={profitLoad}
        style={{ margin: '15px 0' }}
      >{lan.chakanlirun}</Button>
      {
        profitShow ?
          <Alert
            message={profit}
          />
          : null
      }
    </div>
  );
};
Payment.propTypes = {
  dataSource: PropTypes.shape(),
  profitShow: PropTypes.bool,
  profitLoad: PropTypes.bool,
  dispatch: PropTypes.func,
  orderId: PropTypes.string,
  profit: PropTypes.string,
};
export default Payment;

