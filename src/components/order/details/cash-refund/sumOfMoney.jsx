import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const priceTypes = data => (
  <div className={style.listBg}>
    {data.name}: ${data.us} --- {data.currency}
  </div>
);

const SumOfMoney = ({ dataSource }) => {
  const {
    walletExtractable: { // 钱包可提现余额
      priceUsd: { amount: wallet },
      priceWithExchangeRate: { amountWithSymbol: wallet2, symbol: walletSymbol },
    },
    walletNotExtractable: {  // 不可提现金额
      priceUsd: { amount: walletNot },
      priceWithExchangeRate: { amountWithSymbol: walletNot2, symbol: walletNotSymbol },
    },
    refundedWalletAmount: { // 退款钱包总额
      priceUsd: { amount: refunded },
      priceWithExchangeRate: { amountWithSymbol: refunded2, symbol: refundedSymbol },
    },
  } = dataSource;  // TODO 订单剩余可提现金额 (接口没好)

  const orderPrice = [
    {
      name: __('order.entry.cash_content'),
      us: wallet,
      currency: wallet2,
      type: walletSymbol,
    },
    {
      name: __('order.entry.cash_content1'),
      us: walletNot,
      currency: walletNot2,
      type: walletNotSymbol,
    },
    {
      name: __('order.entry.cash_content2'),
      us: refunded,
      currency: refunded2,
      type: refundedSymbol,
    },
  ];
  return (
    <div className={style.sumofmoney_left} >
      {
        orderPrice.map(v => priceTypes(v))
      }
    </div>
  );
};

SumOfMoney.propTypes = {
  dataSource: PropTypes.shape(),
};

export default SumOfMoney;
