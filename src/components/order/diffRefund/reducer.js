/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';

const chanelTypeTable = {
  1: 0,
  2: 1,
  3: 1,
  4: 2,
};

const defaultState = {
  loading: false,
  ready: false,
  order_id: null,
  refund_type: 2,
  remark: '',
  refundPaths: [],
  ReasonList: [],
  orderPriceInfo: null,
  reason: null,
  maxTips: {},
  submitLoad: false,
  submitdisabled: false,
  isUsd: null,
  cachePaths: [],
};

// 改变refundPaths里面的内容
function changeChannelProp(refundPaths, { channel, key, val }) {
  const type = refundPaths.find(item => item.refundPathId === channel) || {}.channelType;
  const res = refundPaths.map((chan) => {
    if (chan.refundPathId === channel) {
      return assign({}, chan, {
        [key]: val,
      });
    }
    if (chan.channelType === type) {
      return assign({}, chan, {
        checked: false,
      });
    }
    return chan;
  });
  return res;
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT_REASONLIST:
      return assign({}, state, {
        loading: true,
      });
    case TYPES.INIT_REASONLIST_FAIL:
      return assign({}, state, {
        loading: false,
      });
    case TYPES.INIT_REASONLIST_SUCCESS:
      return assign({}, state, {
        ReasonList: action.data.data[0].children || [],
        loading: false,
      });

    case TYPES.INIT_PRICEINFO: {
      return assign({}, state, {
        loading: true,
      });
    }

    case TYPES.INIT_PRICEINFO_FAIL: {
      return assign({}, state, {
        loading: false,
      });
    }
    case TYPES.INIT_PRICEINFO_SUCCESS:
      return assign({}, state, {
        ready: true,
        refundPaths: action.data.orderRefundPathList.map(item => assign({}, item, {
          channelType: chanelTypeTable[item.refundPathId],
          refund_method: action.data.orderRefundUnderlineAccount.refundMethod, // 退款账户
          account: action.data.orderRefundUnderlineAccount.accountInfo, // 账户信息
          bank_code: action.data.orderRefundUnderlineAccount.bankCode, // 银行代码
          card_number: action.data.orderRefundUnderlineAccount.cardNumber, // 银行卡号
          customer_name: action.data.orderRefundUnderlineAccount.customerName, // 顾客姓名
          issuing_city: action.data.orderRefundUnderlineAccount.issuingCity, // 发卡城市
          refundCurrency: 0,
          refundAmount: 0,
        })),
        cachePaths: action.data.orderRefundPathList.map(item => assign({}, item, {
          channelType: chanelTypeTable[item.refundPathId],
          refund_method: action.data.orderRefundUnderlineAccount.refundMethod, // 退款账户
          account: action.data.orderRefundUnderlineAccount.accountInfo, // 账户信息
          bank_code: action.data.orderRefundUnderlineAccount.bankCode, // 银行代码
          card_number: action.data.orderRefundUnderlineAccount.cardNumber, // 银行卡号
          customer_name: action.data.orderRefundUnderlineAccount.customerName, // 顾客姓名
          issuing_city: action.data.orderRefundUnderlineAccount.issuingCity, // 发卡城市
          refundCurrency: 0,
          refundAmount: 0,
        })),
        maxTips: {
          1: action.data.orderPriceInfo.giftCardCanRefundPrice,
          2: action.data.orderPriceInfo.walletCanRefundPrice,
          3: action.data.orderPriceInfo.cardCanRefundPrice,
          4: action.data.orderPriceInfo.overflowCanRefundPrice,
        },
        orderPriceInfo: action.data.orderPriceInfo,
        isCod: action.data.orderPriceInfo.isCod,
        loading: false,
        isUsd: action.data.isUsd,
      });
    case TYPES.CHANGE_CHANNEL_VALUE:
      return assign({}, state, {
        refundPaths: changeChannelProp(state.refundPaths, action),
      });
    case TYPES.CHANGE:
      return assign({}, state, {
        [action.key]: action.val,
      });
    case TYPES.SUBMIT_CHANGE:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          [action.key]: action.value,
        }),
      });

    case TYPES.SUBMIT:
      return assign({}, state, {
        submitLoad: true,
      });
    case TYPES.ACTIVATION:
      return assign({}, state, {
        active: false,
      });

    case TYPES.RESET:
      return assign({}, state, {
        reason: null,
        remark: '',
        refundPaths: state.cachePaths.map(v => assign({}, v, {
          checked: false,
          refundValue: '',
          refundCurrency: 0,
          refundAmount: 0,
          refund_method: v.refund_method,
          account: v.account,
          bank_code: v.bank_code,
          card_number: v.card_number,
          customer: v.customer,
          issuing_city: v.issuing_city,
        })),
      });

    default:
      return state;
  }
};

export default reducer;

