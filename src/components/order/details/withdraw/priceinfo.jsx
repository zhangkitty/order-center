import React from 'react';

const lan = {
  Wallet_can_be_raised_balance: '钱包可提现余额',
  Wallet_can_notbe_raised_balance: '不可提现金额',
  total_price: '此订单退钱包总金额',
};


const PriceInfo = ({ dataSource }) => {
  const {
    walletExtractable: {
      priceUsd: { amountWithSymbol: walletExtractableamountWith$ },
      priceWithExchangeRate: { amountWithSymbol: walletExtractableamountWithE },
    },
    walletNotExtractable: {
      priceUsd: { amountWithSymbol: walletNotExtractableamountWith$ },
      priceWithExchangeRate: { amountWithSymbol: walletNotExtractableamountWithE },
    },
    refundedWalletAmount: {
      priceUsd: { amountWithSymbol: refundedWalletAmountamountWith$ },
      priceWithExchangeRate: { amountWithSymbol: refundedWalletAmountamountWithE },
    },

  } = dataSource;

  const showinfo = [
    {
      name: lan.Wallet_can_be_raised_balance,
      us: walletExtractableamountWith$,
      currency: walletExtractableamountWithE,
    },
    {
      name: lan.Wallet_can_notbe_raised_balance,
      us: walletNotExtractableamountWith$,
      currency: walletNotExtractableamountWithE,
    },
    {
      name: lan.total_price,
      us: refundedWalletAmountamountWith$,
      currency: refundedWalletAmountamountWithE,
    },

  ];


  return (

    <div>
      <div>
        {
          showinfo.map(v => <div style={{ paddingTop: '10px' }} key={v.name} >{v.name}:{v.us}{v.currency}</div>)
        }
      </div>
    </div>
  );
};


export default PriceInfo;
