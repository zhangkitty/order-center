import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import style from './style.css';
import { change } from './action';

const priceTypes = data => (
  <p key={data.key || data.name}>{`${data.name} : $${data.us}`} <span>{`${data.currency ? ` , ${data.currency}` : ''}`}</span></p>
);
const lan = {
  溢出可退金额: '溢出可退金额',
  溢出金额: '溢出金额',
  钱包退款已溢出: '钱包退款已溢出',
  用户退款已溢出: '用户退款已溢出',
  待退金额: '待退金额',
};
const SumOfMoney = (props) => {
  const { dataSource: { orderPriceInfo } } = props;
  const { showtotalAmount, showtotalCurrency, rate, dispatch } = props;
  const {
    totalPrice: {
      priceUsd: { amount: totalPrice },
      priceWithExchangeRate: { amountWithSymbol: totalPrice2, symbol: totalPriceSymbol },
    },
    giftCardPaymentPrice: {
      priceUsd: { amount: gift },
      priceWithExchangeRate: { amountWithSymbol: gift2, symbol: giftSymbol },
    },
    walletPaymentPrice: {
      priceUsd: { amount: wallet },
      priceWithExchangeRate: { amountWithSymbol: wallet2, symbol: walletSymbol },
    },
    cardPaymentPrice: {
      paymentMethod,
      priceUsd: { amount: payType },
      priceWithExchangeRate: { amountWithSymbol: payType2, symbol: payTypeSymbol },
    },
    shippingPrice: {
      priceUsd: { amount: shipping },
      priceWithExchangeRate: { amountWithSymbol: shipping2, symbol: shippingSymbol },
    },
    shippingInsurePrice: {
      priceUsd: { amount: insure },
      priceWithExchangeRate: { amountWithSymbol: insure2, symbol: insureSymbol },
    },
    pointPaymentPrice: {
      priceUsd: { amount: point },
      priceWithExchangeRate: { amountWithSymbol: point2, symbol: pointSymbol },
    },
    couponPaymentPrice: {
      priceUsd: { amount: coupon },
      priceWithExchangeRate: { amountWithSymbol: coupon2, symbol: couponSymbol },
    },
    giftCardCanRefundPrice: {
      priceUsd: { amount: giftRefund },
      priceWithExchangeRate: { amountWithSymbol: giftRefund2, symbol: giftRefundSymbol },
    },
    cardCanRefundPrice: {
      priceUsd: { amount: userRefund },
      priceWithExchangeRate: { amountWithSymbol: userRefund2, symbol: userRefundSymbol },
    },
    walletCanRefundPrice: {
      priceUsd: { amount: walletRefund },
      priceWithExchangeRate: { amountWithSymbol: walletRefund2, symbol: walletRefundSymbol },
    },
    overflowCanRefundPrice: {
      priceUsd: { amount: overflowRefund },
      priceWithExchangeRate: { amountWithSymbol: overflowRRefund2, symbol: overflowRRefundSymbol },
    },
    orderBalancePrice: {
      priceUsd: { amount: canBeRefunded },
      priceWithExchangeRate: { amountWithSymbol: canBeRefunded2, symbol: canBeRefundedSymbol },
    },
    overflow2walletPrice: {
      priceUsd: { amount: overflow2walletPriceRefunded },
      priceWithExchangeRate: { amountWithSymbol: overflow2walletPriceRefunded2, symbol: overflow2walletPriceRefundedSymbol },
    },
    overflow2cardPrice: {
      priceUsd: { amount: overflow2cardPriceRefunded },
      priceWithExchangeRate: { amountWithSymbol: overflow2cardPriceRefunded2, symbol: overflow2cardPriceRefundedSymbol },
    },
    waitRefundPrice: {
      priceUsd: { amount: waitRefundPrice },
      priceWithExchangeRate: { amountWithSymbol: waitRefundPrice2, symbol: waitRefundPriceSymbol },
    },
    isCod,
  } = orderPriceInfo;
  let codFee;
  let codFee2;
  let codFeeSymbol;
  if (isCod) {
    codFee = orderPriceInfo.codFee.priceUsd.amount;
    codFee2 = orderPriceInfo.codFee.priceWithExchangeRate.amountWithSymbol;
    codFeeSymbol = orderPriceInfo.codFee.priceWithExchangeRate.symbol;
  }
  const orderPrice = [
    {
      name: __('order.goodsRefund.total_price'),
      us: totalPrice,
      currency: totalPrice2,
      type: totalPriceSymbol,
    },
    {
      name: __('order.goodsRefund.giftcard'),
      us: gift,
      currency: gift2,
      type: giftSymbol,
    },
    {
      name: __('order.goodsRefund.wallet'),
      us: wallet,
      currency: wallet2,
      type: walletSymbol,
    },
    {
      name: paymentMethod,
      us: payType,
      currency: payType2,
      type: payTypeSymbol,
    },
    {
      name: __('order.goodsRefund.freight'),
      us: shipping,
      currency: shipping2,
      type: shippingSymbol,
    },
    {
      name: __('order.goodsRefund.insure'),
      us: insure,
      currency: insure2,
      type: insureSymbol,
    },
    isCod &&
      {
        name: __('order.goodsRefund.codFee'),
        us: codFee,
        currency: codFee2,
        type: codFeeSymbol,
      },
    {
      name: __('order.goodsRefund.point'),
      us: point,
      currency: point2,
      type: pointSymbol,
    },
    {
      name: __('order.goodsRefund.coupon'),
      us: coupon,
      currency: coupon2,
      type: couponSymbol,
    },

  ].filter(res => res);
  const refundPrice = [
    {
      name: __('order.goodsRefund.can_be_refunded'),
      us: canBeRefunded,
      key: 1,
      currency: canBeRefunded2,
      type: canBeRefundedSymbol,
    },
    {
      name: __('order.goodsRefund.gift_refunded'),
      us: giftRefund,
      key: 2,
      currency: giftRefund2,
      type: giftRefundSymbol,
    },
    {
      name: __('order.goodsRefund.user_refunded'),
      us: userRefund,
      key: 3,
      currency: userRefund2,
      type: userRefundSymbol,
    },
    {
      name: __('order.goodsRefund.wallet_refunded'),
      us: walletRefund,
      key: 4,
      currency: walletRefund2,
      type: walletRefundSymbol,
    },
    {
      name: lan.待退金额,
      us: waitRefundPrice,
      key: 5,
      currency: waitRefundPrice2,
      type: waitRefundPriceSymbol,
    },
    // {
    //   name: lan.溢出可退金额,
    //   us: overflowRefund,
    //   key: 6,
    //   currency: overflowRRefund2,
    //   type: overflowRRefundSymbol,
    // },
  ];
  const overflowPrice = [
    {
      name: lan.钱包退款已溢出,
      us: overflow2walletPriceRefunded,
      key: 0,
      currency: overflow2walletPriceRefunded2,
      type: overflow2walletPriceRefundedSymbol,
    },
    {
      name: lan.用户退款已溢出,
      us: overflow2cardPriceRefunded,
      key: 1,
      currency: overflow2cardPriceRefunded2,
      type: overflow2cardPriceRefundedSymbol,
    },
  ];

  return (
    <div className={style.alertBg}>
      <span className={style.descWidth}>{__('order.diffRefund.order_amount')}:</span>
      <div className={style.sumofmoney_left} >
        {
            orderPrice.map(v => priceTypes(v))
          }
      </div>
      <span className={style.descWidth}>{__('order.diffRefund.refund_amount')}:</span>
      <div className={style.sumofmoney_left} style={{ color: 'red' }}>
        {
            refundPrice.map(v => priceTypes(v))
          }
        <div>
          <Input
            style={{ width: 100 }}
            value={
              (function () {
                if (showtotalAmount === '') {
                  return '';
                }
                return showtotalAmount;
              }())
            }
            onChange={(e) => {
              function decimal(num, v) {
                const vv = Math.pow(10, v);
                return Math.round(num * vv) / vv;
              }
              const val = e.target.value;
              if (val !== '' && (isNaN(+e.target.value) || isNaN(+Number(e.target.value * rate).toFixed(2)))) {
                return null;
              }
              const rex = /\d+[.]\d{3}/g;
              if (rex.test(val)) {
                return null;
              }
              dispatch(change('showtotalAmount', e.target.value));
              dispatch(change('showtotalCurrency', decimal(+Number(e.target.value * rate), 2)));
            }
            }

          />
          <span>*{rate}=</span>
          <Input
            style={{ width: 100 }}
            value={
              (function () {
                function decimal(num, v) {
                  const vv = Math.pow(10, v);
                  return Math.round(num * vv) / vv;
                }
                if (showtotalCurrency === '') {
                  return '';
                }
                return decimal(showtotalCurrency, 2);
              }())
            }
            onChange={(e) => {
              function decimal(num, v) {
                const vv = Math.pow(10, v);
                return Math.round(num * vv) / vv;
              }
              const val = e.target.value;
              if (isNaN(+e.target.value) || isNaN(+Number(e.target.value * rate).toFixed(2))) {
                return null;
              }
              const rex = /\d+[.]\d{3}/g;
              if (rex.test(val)) {
                return null;
              }
              dispatch(change('showtotalCurrency', e.target.value));
              dispatch(change('showtotalAmount', decimal(+Number(e.target.value / rate), 2)));
            }
            }
          />
        </div>
      </div>
      <span className={style.descWidth}>{lan.溢出金额}:</span>
      <div>
        {
            overflowPrice.map(v => priceTypes(v))
          }
      </div>
    </div>
  );
};

SumOfMoney.propTypes = {
  dataSource: PropTypes.shape(),
};

export default SumOfMoney;
