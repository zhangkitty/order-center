import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const priceTypes = data => (
  <p key={data.key || data.name}>{`${data.name} : $${data.us}`} <span>{`${data.currency ? ` , ${data.currency}` : ''}`}</span></p>
);

const SumOfMoney = ({ orderPriceInfo }) => {
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

    giftCardCanBeRefundedPrice: {
      priceUsd: { amount: giftRefund },
      priceWithExchangeRate: { amountWithSymbol: giftRefund2, symbol: giftRefundSymbol },
    },
    cardCanBeRefundedPrice: {
      priceUsd: { amount: userRefund },
      priceWithExchangeRate: { amountWithSymbol: userRefund2, symbol: userRefundSymbol },
    },
    walletOrCardCanBeRefundedPrice: {
      priceUsd: { amount: walletRefund },
      priceWithExchangeRate: { amountWithSymbol: walletRefund2, symbol: walletRefundSymbol },
    },
    orderCanBeRefundedPrice: {
      priceUsd: { amount: canBeRefunded },
      priceWithExchangeRate: { amountWithSymbol: canBeRefunded2, symbol: canBeRefundedSymbol },
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
      </div>
    </div>
  );
};

SumOfMoney.propTypes = {
  orderPriceInfo: PropTypes.shape(),
};

export default SumOfMoney;
