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
  refundTypeList: [],
  refundAccountTypeList: [],
  submitValue: {
    orderId: '',
    refundType: 3,
    refundPaths: [{
      account: null,
      refundAmount: '',
      refundMethod: '',
      refundPathId: 3,
    }],
    canWithdrawAmount: '',   // 可提现金额
    notWithdrawAmount: '',   // 不可提现金额
    remark: '',
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.GET_DATA_SUCCESS:
      const max1 = Number(
        Number(under2Camal(action.res).walletExtractable.priceUsd.amount)
        +
        Number(under2Camal(action.res).walletNotExtractable.priceUsd.amount)
      ).toFixed(2); // 钱包总金额（提现+不可提现）
      const max2 = Number(
        under2Camal(action.res).remainingWithdrawAmount.priceUsd.amount
      ).toFixed(2); // 订单剩余可提现金额
      const rate = Number(under2Camal(action.res).walletExtractable.priceUsd.rate);   // 汇率
      return assign({}, state, {
        ready: true,
        dataSource: under2Camal(action.res),
        refundTypeList: under2Camal(action.res).refundTypeList, // 退款路径列表
        refundAccountTypeList: under2Camal(action.res).refundAccountTypeList, // 退款方式列表
        canWithdrawAmount: under2Camal(action.res).walletExtractable.priceUsd.amount, // 钱包可提现金额
        notWithdrawAmount: under2Camal(action.res).walletNotExtractable.priceUsd.amount, // 钱包不提现
        submitValue: assign({}, state.submitValue, {
          refundAmount: max1 < max2 ? max1 : max2, // 美元金额
          refundAmount2: max1 < max2 ? Number(max1 * rate).toFixed(2) : Number(max2).toFixed(2), // 非美元金额
          rate,   // 汇率
          rate2: under2Camal(action.res).walletExtractable.priceWithExchangeRate.rate, // 汇率（转$）
          currency: under2Camal(action.res).walletExtractable.priceWithExchangeRate.symbol, // 非美元币种
        }),
      });
    case TYPES.GET_REASON_SUCCESS:
      return assign({}, state, {
        reasons: under2Camal(action.res),
      });
    case TYPES.SUBMIT:
      return assign({}, state, {
        submitLoad: true,
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

