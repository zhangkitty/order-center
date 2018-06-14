/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';
import { under2Camal } from '../../../../lib/camal';


const defaultState = {
  symbol: '',
  is_usd: null,
  one: '', // 记录是提现退款还是退款返还
  two: '', // 记录美金价格
  three: '', // 记录支付货币价格
  four: 'account', // 记录account
  ready: false,
  dataSource: {},
  refundInfo: {},
  reasons: [],
  fetchType: [],
  fetchWarehouse: [],
  clickVisible: false,
  load: false,
  loadUpdata: false,
  total: 0,
  submitLoad: false,
  submitDisabled: false,
  refundTypeList: [],
  refundAccountTypeList: [],
  submitValue: {
    orderId: '',
    refundType: 3,
    refundPaths: [{
      account: null,
      refundAmount: '', // 美金金额
      refundAmount1: '',  // 非美金金额（下单时的币种）
      refundMethod: '',
      refundPathId: 3,
      bankCode: '',
      customer: '',
      issuingCity: '',
    //  refundMethod1: '',
    }],
    canWithdrawAmount: '',   // 可提现金额（下单时的币种）
    notWithdrawAmount: '',   // 不可提现金额（下单时的币种）
    remark: '',
    max: null,
  },
  valueTitle: { // 提示
    refundMethodTitle: '',
    accountTitle: null,
    bankCodeTitle: '',
    cardNumberTitle: '',
    customerTitle: '',
    issuingCityTitle: '',
  },
};
// 取最小值
function min(a, b) {
  if (a > b) {
    return b;
  }
  return a;
}

function chooseMax(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return state;
    case TYPES.GET_DATA_SUCCESS:

      const max1 = Number(Number(
        Number(under2Camal(action.res).walletExtractable.priceWithExchangeRate.amount)
        +
        Number(under2Camal(action.res).walletNotExtractable.priceWithExchangeRate.amount),
      ).toFixed(2)); // 钱包总金额（下单币种，提现+不可提现）
      const max2 = Number(Number(
        under2Camal(action.res).remainingWithdrawAmount.priceWithExchangeRate.amount,
      ).toFixed(2)); // 订单剩余可提现金额（下单币种）


      const max3 = Number(Number(
        Number(under2Camal(action.res).walletExtractable.priceUsd.amount)
        +
        Number(under2Camal(action.res).walletNotExtractable.priceUsd.amount),
      ).toFixed(2)); // 钱包总金额（下单币种，提现+不可提现）
      const max4 = Number(Number(
        under2Camal(action.res).remainingWithdrawAmount.priceUsd.amount,
      ).toFixed(2)); // 订单剩余可提现金额（下单币种）

      const max = under2Camal(action.res).isUsd ? min(max3, max4) : min(max1, max2);

      const rate2 = Number(under2Camal(action.res).walletExtractable.priceWithExchangeRate.rate);   // 下单币种汇率
      const one = state.submitValue.refundType === 3 ? 'Refund Withdraw' : 'Refund Returned';
      const { is_usd } = action.res;
      const refundAmount = (max3 < max4) ? max3 : max4;// 美元金额
      const refundCurrency = (max1 < max2) ? max1 : max2; // 金额（下单币种）
      const { price_usd, price_with_exchange_rate } = action.res.refunded_wallet_amount;
      const symbol = is_usd ? price_usd.symbol : price_with_exchange_rate.symbol;
      const two = `${is_usd ? min(refundAmount, action.res.wallet_extractable.amount) : min(refundCurrency, action.res.wallet_extractable.price_with_exchange_rate.amount)}${symbol}`;
      const three =
          `${is_usd ? chooseMax(refundAmount - action.res.wallet_extractable.amount, 0) : chooseMax(refundCurrency - action.res.wallet_extractable.price_with_exchange_rate.amount, 0)}${symbol}`;
      return assign({}, state, {
        symbol,
        is_usd,
        one,
        two,
        three,
        ready: true,
        dataSource: under2Camal(action.res),
        refundTypeList: under2Camal(action.res).refundTypeList, // 退款路径列表
        refundAccountTypeList: under2Camal(action.res).refundAccountTypeList, // 退款方式列表
        canWithdrawAmount:
            under2Camal(action.res).isUsd === 0 ?
                under2Camal(action.res).walletExtractable.priceWithExchangeRate.amount
                : under2Camal(action.res).walletExtractable.priceUsd.amount,
                // 钱包可提现金额（下单币种）
        notWithdrawAmount:
            under2Camal(action.res).isUsd === 0 ?
        under2Camal(action.res).walletNotExtractable.priceWithExchangeRate.amount
        : under2Camal(action.res).walletNotExtractable.priceUsd.amount, // 钱包不提现（下单币种）
        submitValue: assign({}, state.submitValue, {
          remark: `${one};\nRefund method：account,${two}\n${chooseMax(refundAmount - action.res.wallet_extractable.amount, 0) === 0 ? '' : `${`Refund method：account,${three}`}`}`,
          refundAmount, // 美元金额
          refundCurrency, // 金额（下单币种）
          rate2, // : under2Camal(action.res).walletExtractable.priceWithExchangeRate.rate, // 汇率（转$）
          currency: under2Camal(action.res).walletExtractable.priceWithExchangeRate.symbol, // 非美元币种
          max, // 金额最大值（下单币种)
        }),
        valueTitle: assign({}, state.valueTitle, {  // 提示
          refundMethodTitle: under2Camal(action.res).orderRefundUnderlineAccount.refundMethod,
          accountTitle: under2Camal(action.res).orderRefundUnderlineAccount.accountInfo,
          bankCodeTitle: under2Camal(action.res).orderRefundUnderlineAccount.bankCode,
          cardNumberTitle: under2Camal(action.res).orderRefundUnderlineAccount.cardNumber,
          customerTitle: under2Camal(action.res).orderRefundUnderlineAccount.customerName,
          issuingCityTitle: under2Camal(action.res).orderRefundUnderlineAccount.issuingCity,
        }),
      });
    case TYPES.GET_REASON_SUCCESS:
      return assign({}, state, {
        reasons: under2Camal(action.res),
      });
    case TYPES.CHANGE:
      return assign({}, state, {
        [action.key]: action.val,
      });
    case TYPES.RESET:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          remark: '',
          refundMethod: '',
          account: '',
        }),
      });
    case TYPES.SUBMIT_CHANGE:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          [action.key]: action.value,
        }),
      });

    case TYPES.changeRadio:
      const oneChangeRadio = state.submitValue.refundType === 3 ? 'Refund Withdraw' : 'Refund Returned';
      return assign({}, state, {
        one: oneChangeRadio,
        two: '', // 记录可提现价格
        three: '', // 记录不可提现价格
        four: 'account', // 记录account
        submitValue: assign({}, state.submitValue, {
          remark: state.submitValue.refundType === 4 ?
              `${oneChangeRadio}\nRefund method：account, ${state.is_usd ? state.submitValue.RefundAmount : state.submitValue.refundCurrency}${state.symbol}`
              : `${oneChangeRadio}`,
        }),
      });

    case TYPES.changeAmount:
      if (state.submitValue.refundType === 3) {
        const twoChangeAmount = min(state.submitValue.refundAmount, state.dataSource.walletExtractable.priceUsd.amount);
        const threeChangeAmount = chooseMax(state.submitValue.refundAmount - state.dataSource.walletExtractable.priceUsd.amount, 0);
        return assign({}, state, {
          two: `${twoChangeAmount}$`,
          three: `${threeChangeAmount}$`,
          submitValue: assign({}, state.submitValue, {
            remark: `${state.one}:\nRefund method：account,${twoChangeAmount}$\n${threeChangeAmount === 0 ? '' : `Refund method：${state.four},${threeChangeAmount}$`}`,
          }),
        });
      }
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          remark: `${state.one}:\nRefund method：account,${state.submitValue.refundAmount}${state.symbol}`,
        }),
      });


    case TYPES.changeCurrency:
      if (state.submitValue.refundType === 3) {
        const twoChangeCurrency = min(state.submitValue.refundCurrency, state.dataSource.walletExtractable.priceWithExchangeRate.amount);
        const threeChangeCurrency = chooseMax(state.submitValue.refundCurrency - state.dataSource.walletExtractable.priceWithExchangeRate.amount, 0);
        return assign({}, state, {
          two: `${twoChangeCurrency}${state.symbol}`,
          three: `${threeChangeCurrency}${state.symbol}`,
          submitValue: assign({}, state.submitValue, {
            remark: `${state.one}:\nRefund method：account,${twoChangeCurrency}${state.symbol}\n${threeChangeCurrency === 0 ? '' : `Refund method：${state.four},${threeChangeCurrency}${state.symbol}`}`,
          }),
        });
      }
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          remark: `${state.one}:\nRefund method：account,${state.submitValue.refundCurrency}${state.symbol}`,
        }),
      });


    case TYPES.selectRemark:
      return assign({}, state, {
        four: state.submitValue.refundMethod,
        submitValue: assign({}, state.submitValue, {
          remark: `${state.one}:\nRefund method:account,${state.two}\n${parseFloat(state.three) === 0 ? '' : `Refund method:${state.submitValue.refundMethod},${state.three}`}`,
        }),
      });
    default:
      return state;
  }
};

export default reducer;

