import React from 'react';
import PropTypes from 'prop-types';
import { Card, Alert, Button, Popover } from 'antd';
import style from './style.css';
import { profitShowAction } from './action';


const lan = {
  zhifuqudao: '支付渠道',
  zhehouzongjia: '商品折后总价',
  qianbao: '钱包',
  youhuiquanba: '优惠券码',
  youhuidikou: '抵扣显示金额',
  CODfuwu: 'COD服务费',
  fukuanpingzh: '付款凭证号',
  baoxian: '保险费',
  yunfei: '运费',
  jifen: '积分',
  lipinka: '礼品卡抵扣',
  zongjia: '支付总价',
  CODyingfu: 'COD应付金额',
  jiaoyijulu: '交易记录',
  chakanlirun: '查看利润',
  goodszongjia: '商品总价',
  youhuijuanzhekoe: '优惠券折扣',
  jifenzhekoe: '积分折扣',
};
const cardSpanStyle = { display: 'inline-block', width: '250px' };
const Payment = (
  {
    dataSource: { pay: {
      cod,
      pay_way, discount_total_price, wallet, favor_coupon, favor_discount,
      options, pay_voucher, insurance_fee, tran_fee, points, gift_discount,
      pay_total_price, log,
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
    cod ? { name: lan.CODfuwu, value: options.cod_fee } : null,
  ].filter(res => res);
  const right = [
    { name: lan.fukuanpingzh, value: pay_voucher },
    { name: lan.baoxian, value: insurance_fee },
    { name: lan.yunfei, value: tran_fee },
    { name: lan.jifen, value: points },
    { name: lan.lipinka, value: gift_discount },
  ];
  return (
    <div>
      <div style={{ display: 'flex', padding: '20px 35px' }}>
        <div>
          {
            left.map(v => (
              <div key={v.name}>
                <span className={style.spanWidth}>{v.name}: </span>
                <span>{v.value}</span>
                {
                  v.name === lan.zhehouzongjia ?
                    <Popover content={`${lan.zhehouzongjia} = ${lan.goodszongjia} - ${lan.youhuijuanzhekoe} -${lan.jifenzhekoe} `}>
                      <Button shape="circle" icon="question-circle-o" style={{ border: 'none' }} />
                    </Popover>
                    : null
                }
              </div>
            ))
          }
        </div>
        <div style={{ marginLeft: '80px' }}>
          {
            right.map(v => (
              <div key={v.name}>
                <span className={style.spanWidth}>{v.name}: </span>
                <span>{v.value}</span>
              </div>
            ))
          }
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ display: 'inline-block', width: '110px' }}>{lan.zongjia}: </h3>
            <h3 style={{ display: 'inline-block' }}>{pay_total_price}</h3>
          </div>
          {
            cod ?
              <div>
                <h3 style={{ display: 'inline-block', width: '110px' }}>{lan.CODyingfu}: </h3>
                <h3 style={{ display: 'inline-block' }}>{options.cod_pay_money }</h3>
              </div>
              : null
          }
        </div>
      </div>
      <Card title={lan.jiaoyijulu} style={{ maxWidth: '1200px' }}>
        {

          log.map(({ pay_time, pay_way: pw, tran_no, merchant }) => (
            <div key={tran_no} className={style.payLog}>
              <span style={cardSpanStyle}>{pay_time}</span>
              <span style={cardSpanStyle}>{pw}</span>
              {
                !!merchant && <span style={cardSpanStyle}>{merchant}</span>
              }
              <span style={cardSpanStyle}>{tran_no}</span>
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

