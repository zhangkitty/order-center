import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const priceTypes = data => (
  <p key={data.key || data.name}>{`${data.name} : $${data.us}`} <span>{`${data.currency ? ` , ${data.currency}` : ''}`}</span></p>
);

const SumOfMoney = ({ dataSource: { orderPriceInfo } }) => {
  const {
    totalPrice: { // 订单最终支付总额-- 实付
      priceUsd: { amount: totalPrice },
      priceWithExchangeRate: { amountWithSymbol: totalPrice2, symbol: totalPriceSymbol },
    },
    giftCardPaymentPrice: {  // 礼品卡支付金额
      priceUsd: { amount: gift },
      priceWithExchangeRate: { amountWithSymbol: gift2, symbol: giftSymbol },
    },
    walletPaymentPrice: {  // 钱包支付金额
      priceUsd: { amount: wallet },
      priceWithExchangeRate: { amountWithSymbol: wallet2, symbol: walletSymbol },
    },
    cardPaymentPrice: { // 卡支付金额
      paymentMethod,
      priceUsd: { amount: payType },
      priceWithExchangeRate: { amountWithSymbol: payType2, symbol: payTypeSymbol },
    },
    shippingPrice: { // 运费金额
      priceUsd: { amount: shipping },
      priceWithExchangeRate: { amountWithSymbol: shipping2, symbol: shippingSymbol },
    },
    shippingInsurePrice: { // 运费险金额
      priceUsd: { amount: insure },
      priceWithExchangeRate: { amountWithSymbol: insure2, symbol: insureSymbol },
    },
    pointPaymentPrice: { // 积分支付金额
      priceUsd: { amount: point },
      priceWithExchangeRate: { amountWithSymbol: point2, symbol: pointSymbol },
    },
    couponPaymentPrice: {  // 优惠券支付金额
      priceUsd: { amount: coupon },
      priceWithExchangeRate: { amountWithSymbol: coupon2, symbol: couponSymbol },
    },
    orderCanBeRefundedPrice: { // 订单剩余可退金额
      priceUsd: { amount: canBeRefunded },
      priceWithExchangeRate: { amountWithSymbol: canBeRefunded2, symbol: canBeRefundedSymbol },
    },
    giftCardCanBeRefundedPrice: { // 礼品卡可退金额
      priceUsd: { amount: giftRefund },
      priceWithExchangeRate: { amountWithSymbol: giftRefund2, symbol: giftRefundSymbol },
    },
    walletOrCardCanBeRefundedPrice: { // 钱包或用户可退金额
      priceUsd: { amount: walletRefund },
      priceWithExchangeRate: { amountWithSymbol: walletRefund2, symbol: walletRefundSymbol },
    },
    // waitRefundPrice: {   // 待退金额(修改商品退款--有， 差价--没有)
    //   priceUsd: { amount: waitRefund },
    //   priceWithExchangeRate: { amountWithSymbol: waitRefund2, symbol: waitRefundSymbol },
    // },
  } = orderPriceInfo;
  const waitRefundPrice = orderPriceInfo.waitRefundPrice ?
  { // 待退金额(修改商品退款--有， 差价--没有)
    name: __('order.goodsRefund.wait_refund'),
    us: orderPriceInfo.waitRefundPrice.priceUsd.amount,
    currency: orderPriceInfo.waitRefundPrice.priceWithExchangeRate.amountWithSymbol,
    type: orderPriceInfo.waitRefundPrice.priceWithExchangeRate.symbol,
  } : {};
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
    // {
    //   name: __('order.goodsRefund.wait_refund'),
    //   us: waitRefundPrice.waitRefund,
    //   currency: waitRefundPrice.waitRefund2,
    //   type: waitRefundPrice.waitRefundSymbol,
    // },
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
          refundPrice.map(v => priceTypes(v, 'error'))
        }
        {/* 商品退款显示，差价退款 不显示 */}
        {
          !!waitRefundPrice.name &&
          <p key={waitRefundPrice.key || waitRefundPrice.name}>{`${waitRefundPrice.name} : $${waitRefundPrice.us}`} <span>{`${waitRefundPrice.currency ? ` , ${waitRefundPrice.currency}` : ''}`}</span></p>
        }
      </div>
    </div>
  );
};

SumOfMoney.propTypes = {
  dataSource: PropTypes.shape(),
};

export default SumOfMoney;
