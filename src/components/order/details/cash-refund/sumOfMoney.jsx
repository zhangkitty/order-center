import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import style from './style.css';

const infoStyle = {
  fontSize: '13px',
  margin: '5px 15px',
  padding: '0 10px',
};
const infoStyle2 = {
  fontSize: '13px',
  margin: '5px 15px',
  color: 'red',
  padding: '0 10px',
};
const priceTypes = (data, type = 'warning') => (
  <Alert
    key={data.name}
    message={
      <span>{data.name}:${data.us} --- {data.currency}</span>
    }
    type={type} style={type === 'warning' ? infoStyle : infoStyle2}
  />
);

const SumOfMoney = ({ dataSource: { orderPriceInfo } }) => {
  const {
    totalPrice: { // 钱包可提现余额
      priceUsd: { amount: totalPrice },
      priceWithExchangeRate: { amountWithSymbol: totalPrice2, symbol: totalPriceSymbol },
    },
    giftCardPaymentPrice: {  // 不可提现金额
      priceUsd: { amount: gift },
      priceWithExchangeRate: { amountWithSymbol: gift2, symbol: giftSymbol },
    },
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
      <div className={style.sumofmoney_left}>
        {
          refundPrice.map(v => priceTypes(v, 'error'))
        }
        {/* 商品退款显示，差价退款 不显示 */}
        {
          !!waitRefundPrice.name &&
          <Alert
            key={waitRefundPrice.name}
            message={
              <span>
                {waitRefundPrice.name}:${waitRefundPrice.us} --- {waitRefundPrice.currency}
              </span>
            }
            type={'error'} style={infoStyle2}
          />
        }
      </div>
    </div>
  );
};

SumOfMoney.propTypes = {
  dataSource: PropTypes.shape(),
};

export default SumOfMoney;
