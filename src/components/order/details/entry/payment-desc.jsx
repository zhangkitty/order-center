import React from 'react';
import PropTypes from 'prop-types';
import { Card, Alert, Button, Popover } from 'antd';
import style from './style.css';
import { commit } from './action';


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
      pay_way, discount_total_price, wallet, favor_coupon, favor_discount,
      cod_fee, pay_voucher, insurance_fee, tran_fee, points, gift_discount,
      pay_total_price, cod_pay_money, pay_log, profit,
    } },
    profitShow,
    dispatch,
  },
) => {
  const left = [
    { name: lan.zhifuqudao, value: pay_way || 'worldpay' },
    { name: lan.zhehouzongjia, value: discount_total_price || '$134.35' },
    { name: lan.qianbao, value: wallet || '$2.00' },
    { name: lan.youhuiquanba, value: favor_coupon || 'cart7days' },
    { name: lan.youhuidikou, value: favor_discount || '20%' },
    { name: lan.CODfuwu, value: cod_fee || '$6.00' },
  ];
  const right = [
    { name: lan.fukuanpingzh, value: pay_voucher || '54R67455H79193816' },
    { name: lan.baoxian, value: insurance_fee || '$0.99' },
    { name: lan.yunfei, value: tran_fee || '$0.99' },
    { name: lan.jifen, value: points || '$0.99' },
    { name: lan.lipinka, value: gift_discount || '$0.99' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', padding: '20px 35px' }}>
        <div>
          {
            left.map(v => (
              <div>
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
              <div>
                <span className={style.spanWidth}>{v.name}: </span>
                <span>{v.value}</span>
              </div>
            ))
          }
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ display: 'inline-block', width: '110px' }}>{lan.zongjia}: </h3>
            <h3 style={{ display: 'inline-block' }}>{pay_total_price || '$135.34 SAR 1983.34'}</h3>
          </div>
          <div>
            <h3 style={{ display: 'inline-block', width: '110px' }}>{lan.CODyingfu}: </h3>
            <h3 style={{ display: 'inline-block' }}>{cod_pay_money || '$105.34'}</h3>
          </div>
        </div>
      </div>
      <Card title={lan.jiaoyijulu} style={{ maxWidth: '1200px' }}>
        {
          (
            pay_log ||
              [
                {
                  pay_time: '2017-09-06 15:37:27',
                  pay_way: 'paypal',
                  tran_no: '54R67455H79193815',
                },
                {
                  pay_time: '2017-09-06 15:37:27',
                  pay_way: 'paypal',
                  tran_no: '54R67455H79193816',
                },
              ]
          ).map(({ pay_time, pay_way: pw, tran_no }) => (
            <div key={tran_no} className={style.payLog}>
              <span style={cardSpanStyle}>{pay_time}</span>
              <span style={cardSpanStyle}>{pw}</span>
              <span style={cardSpanStyle}>{tran_no}</span>
            </div>
          ))
        }
      </Card>
      <Button
        onClick={() => dispatch(commit('profitShow', !profitShow))}
        style={{ margin: '15px 0' }}
      >{lan.chakanlirun}</Button>
      {
        profitShow ?
          <Alert
            message={profit || '754.637(利润) = 1089.837(总价) - 27*1 - 43*1 - 26*1 - 27*1 - 24*1 - 30*1 - 33*1 - 44.2*1 - 24*1 - 30*1 - 27*1 - 0(运费) - 0(退款总价)'}
          />
          : null
      }
    </div>
  );
};
Payment.propTypes = {
  dataSource: PropTypes.shape(),
  profitShow: PropTypes.bool,
  dispatch: PropTypes.func,
};
export default Payment;

