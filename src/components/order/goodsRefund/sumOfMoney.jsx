import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import style from './style.css';

const infoStyle = {
  fontSize: '13px',
  margin: '5px 15px',
};
const infoStyle2 = {
  fontSize: '13px',
  margin: '5px 15px',
  color: 'red',
};
const priceTypes = (data, type = 'warning') => (
  <Alert
    key={data.name}
    message={
      `${data.name} : $${data.us}${data.currency ? ` ---- ${data.currency}` : ''}`
    }
    type={type} style={type === 'warning' ? infoStyle : infoStyle2}
  />
);

const SumOfMoney = ({ dataSource: { orderPriceInfo } }) => {
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
    orderCanBeRefundedPrice: {
      priceUsd: { amount: canBeRefunded },
      priceWithExchangeRate: { amountWithSymbol: canBeRefunded2, symbol: canBeRefundedSymbol },
    },
    giftCardCanBeRefundedPrice: {
      priceUsd: { amount: giftRefund },
      priceWithExchangeRate: { amountWithSymbol: giftRefund2, symbol: giftRefundSymbol },
    },
    walletOrCardCanBeRefundedPrice: {
      priceUsd: { amount: walletRefund },
      priceWithExchangeRate: { amountWithSymbol: walletRefund2, symbol: walletRefundSymbol },
    },
    waitRefundPrice: {
      priceUsd: { amount: waitRefund },
      priceWithExchangeRate: { amountWithSymbol: waitRefund2, symbol: waitRefundSymbol },
    },
  } = orderPriceInfo;
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
  ];
  const refundPrice = [
    {
      name: __('order.goodsRefund.can_be_refunded'),
      us: canBeRefunded,
      currency: canBeRefunded2,
      type: canBeRefundedSymbol,
    },
    {
      name: __('order.goodsRefund.gift_refunded'),
      us: giftRefund,
      currency: giftRefund2,
      type: giftRefundSymbol,
    },
    {
      name: __('order.goodsRefund.wallet_refunded'),
      us: walletRefund,
      currency: walletRefund2,
      type: walletRefundSymbol,
    },
    {
      name: __('order.goodsRefund.wait_refund'),
      us: waitRefund,
      currency: waitRefund2,
      type: waitRefundSymbol,
    },
  ];
  return (
    <div style={{ display: 'flex' }}>
      <span className={style.descWidth}>{__('order.diffRefund.order_amount')}:</span>
      <div className={style.sumofmoney_left} >
        {
          orderPrice.map(v => priceTypes(v))
        }
      </div>
      <span className={style.descWidth}>{__('order.diffRefund.refund_amount')}:</span>
      <div className={style.sumofmoney_left}>
        {
          refundPrice.map(v => priceTypes(v, 'error'))
        }
      </div>
    </div>
  );
};

SumOfMoney.propTypes = {
  dataSource: PropTypes.shape(),
};

export default SumOfMoney;
