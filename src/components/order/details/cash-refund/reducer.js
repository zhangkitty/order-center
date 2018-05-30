/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';
import { under2Camal } from '../../../../lib/camal';


const defaultState = {
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

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          remark: 'aasd',
        }),
      });
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
      return assign({}, state, {
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
          remark: 'afafa',
          refundAmount: max3 < max4 ? max3 : max4, // 美元金额
          refundCurrency: max1 < max2 ? max1 : max2, // 金额（下单币种）
          rate2, // : under2Camal(action.res).walletExtractable.priceWithExchangeRate.rate, // 汇率（转$）
          currency: under2Camal(action.res).walletExtractable.priceWithExchangeRate.symbol, // 非美元币种
          max, // 金额最大值（下单币种
          // refundMethod: under2Camal(action.res).orderRefundUnderlineAccount.refundMethod,
          // account: under2Camal(action.res).orderRefundUnderlineAccount.accountInfo,
          // bankCode: under2Camal(action.res).orderRefundUnderlineAccount.bankCode,
          // cardNumber: under2Camal(action.res).orderRefundUnderlineAccount.cardNumber,
          // customer: under2Camal(action.res).orderRefundUnderlineAccount.customerName,
          // issuingCity: under2Camal(action.res).orderRefundUnderlineAccount.issuingCity,
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
    default:
      return state;
  }
};

export default reducer;

