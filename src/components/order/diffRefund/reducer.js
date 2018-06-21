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

const remarkTable = {
  1: 'gift-card',
  2: 'wallet',
  3: 'account',
  4: 'account',
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
  otherInputDisable: false,
};

const getMax = (d) => {
  if (d.isUsd === 0) {
    return {
      1: d.orderPriceInfo.giftCardCanRefundPrice.priceWithExchangeRate.amount,
      2: ((Number(d.orderPriceInfo.totalPrice.priceWithExchangeRate.amount) * 1.5) +
      Number(d.orderPriceInfo.walletOrCardCanRefundPrice.priceWithExchangeRate.amount)) > 0 ?
        ((Number(d.orderPriceInfo.totalPrice.priceWithExchangeRate.amount) * 1.5) +
          Number(d.orderPriceInfo.walletOrCardCanRefundPrice.priceWithExchangeRate.amount))
      : 0,
      3: d.orderPriceInfo.cardCanRefundPrice.priceWithExchangeRate.amount > 0 ? d.orderPriceInfo.cardCanRefundPrice.priceWithExchangeRate.amount : 0,
      4: (Number(d.orderPriceInfo.totalPrice.priceWithExchangeRate.amount) * 1.5),
      disabled: 0,
    };
  }
  if (d.isUsd === 1) {
    return {
      1: d.orderPriceInfo.giftCardCanBeRefundedPrice.priceUsd.amount,
      2: ((Number(d.orderPriceInfo.totalPrice.priceUsd.amount) * 1.5) +
      Number(d.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceUsd.amount)) > 0 ?
        ((Number(d.orderPriceInfo.totalPrice.priceUsd.amount) * 1.5) +
          Number(d.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceUsd.amount))
      : 0,
      3: d.orderPriceInfo.cardCanBeRefundedPrice.priceUsd.amount > 0 ? d.orderPriceInfo.cardCanBeRefundedPrice.priceUsd.amount : 0,
      4: (Number(d.orderPriceInfo.totalPrice.priceUsd.amount) * 1.5),
      disabled: 0,
    };
  }
  return {
    1: d.orderPriceInfo.giftCardCanBeRefundedPrice.priceWithExchangeRate.amount,
    2: (Number(d.orderPriceInfo.totalPrice.priceWithExchangeRate.amount) * 1.5) +
    Number(d.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceWithExchangeRate.amount),
    3: d.orderPriceInfo.cardCanBeRefundedPrice.priceWithExchangeRate.amount,
    4: (Number(d.orderPriceInfo.totalPrice.priceWithExchangeRate.amount) * 1.5),
    disabled: 0,
  };
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

function resetOtherInput(refundPaths) {
  return refundPaths.map((path) => {
    if (path.refundPathId === 1 || path.refundPathId === 2 || !path.checked) return path;
    return assign({}, path, {
      checked: false,
    });
  });
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
      const payment_method = action.data.orderPriceInfo.cardPaymentPrice.paymentMethod;
      const table = ['ARS', 'BRL', 'KWD', 'AED', 'SAR', 'INR', 'BHD ', 'OMR'];
      const currency = action.data.orderPriceInfo.cardBalancePrice.priceWithExchangeRate.symbol.trim();
      let symbol;
      if (payment_method.substring(0, 6) === 'PayPal' && table.filter(v => v === currency).length > 0) {
        symbol = '$';
      } else {
        symbol = currency;
      }
      return assign({}, state, {
        ready: true,
        refundPaths: action.data.orderRefundPathList.map(item => assign({}, item, {
          channelType: chanelTypeTable[item.refundPathId],
          refund_method: action.data.orderRefundUnderlineAccount.refundMethod, // 退款账户
          account: action.data.orderRefundUnderlineAccount.accountInfo, // 账户信息
          bank_code: action.data.orderRefundUnderlineAccount.bankCode, // 银行代码
          card_number: action.data.orderRefundUnderlineAccount.cardNumber, // 银行卡号
          account1: action.data.orderRefundUnderlineAccount.cardNumber, // 银行卡号
          customer_name: action.data.orderRefundUnderlineAccount.customerName, // 顾客姓名
          customer: action.data.orderRefundUnderlineAccount.customerName, // 顾客姓名
          issuing_city: action.data.orderRefundUnderlineAccount.issuingCity, // 发卡城市
        //  refund_method1: '',
          refundCurrency: 0,
          refundAmount: 0,
          checked: false,
          symbol,
          remark:
              `Refund method：${remarkTable[item.refundPathId]},${symbol === '$' ? item.refundAmount || 0 : item.refundCurrency || 0}${symbol}`,
        })),
        cachePaths: action.data.orderRefundPathList.map(item => assign({}, item, {
          channelType: chanelTypeTable[item.refundPathId],
          refund_method: action.data.orderRefundUnderlineAccount.refundMethod, // 退款账户
          account: action.data.orderRefundUnderlineAccount.accountInfo, // 账户信息
          bank_code: action.data.orderRefundUnderlineAccount.bankCode, // 银行代码
          card_number: action.data.orderRefundUnderlineAccount.cardNumber, // 银行卡号
          account1: action.data.orderRefundUnderlineAccount.cardNumber, // 银行卡号
          customer: action.data.orderRefundUnderlineAccount.customerName, // 顾客姓名
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
        // maxTips: getMax(action.data),
        orderPriceInfo: action.data.orderPriceInfo,
        isCod: action.data.orderPriceInfo.isCod,
        loading: false,
        isUsd: action.data.isUsd,
        rate: action.data.orderPriceInfo.totalPrice.priceWithExchangeRate.rate,
      });

    case TYPES.CHANGE_CHANNEL_VALUE:
      return assign({}, state, {
        refundPaths: changeChannelProp(state.refundPaths, action),
      });

    case TYPES.changeAmount:
      return assign({}, state, {
        refundPaths: state.refundPaths.map(v => assign({}, v, {
          remark: v.refundPathId === action.channel ?
              `Refund method：${remarkTable[v.refundPathId]}${v.refundPathId === 4 ? '(' : ''}${v.refundPathId === 4 ? v.refund_method || '' : ''}${v.refundPathId === 4 ? ')' : ''} ,${v.symbol === '$' ? v.refundAmount || 0 : v.refundCurrency || 0}${v.symbol}`
                       : v.remark,
        })),
        remark: `Price Difference Refund；${state.refundPaths.map(v => assign({}, v, {
          remark: v.refundPathId === action.channel ?
              `Refund method：${remarkTable[v.refundPathId]}${v.refundPathId === 4 ? '(' : ''}${v.refundPathId === 4 ? v.refund_method || '' : ''}${v.refundPathId === 4 ? ')' : ''} ,${v.symbol === '$' ? v.refundAmount || 0 : v.refundCurrency || 0}${v.symbol}`
              : v.remark,
        })).filter(v => v.checked === true).map(val => val.remark).join('\n')}`,
      });

    case TYPES.changeCurrency:
      return assign({}, state, {
        refundPaths: state.refundPaths.map(v => assign({}, v, {
          remark: v.refundPathId === action.channel ?
              `Refund method：${remarkTable[v.refundPathId]}${v.refundPathId === 4 ? '(' : ''}${v.refundPathId === 4 ? v.refund_method || '' : ''}${v.refundPathId === 4 ? ')' : ''} ,${v.symbol === '$' ? v.refundAmount || 0 : v.refundCurrency || 0}${v.symbol}`
              : v.remark,
        })),
        remark: `Price Difference Refund；${state.refundPaths.map(v => assign({}, v, {
          remark: v.refundPathId === action.channel ?
              `Refund method：${remarkTable[v.refundPathId]}${v.refundPathId === 4 ? '(' : ''}${v.refundPathId === 4 ? v.refund_method || '' : ''}${v.refundPathId === 4 ? ')' : ''} ,${v.symbol === '$' ? v.refundAmount || 0 : v.refundCurrency || 0}${v.symbol}`
              : v.remark,
        })).filter(v => v.checked === true).map(val => val.remark).join('\n')}`,
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
          account1: v.account1,
          customer: v.customer,
          issuing_city: v.issuing_city,
        })),
      });
    case TYPES.CHANGE_INPUT_DISABLE:
      return assign({}, state, {
        otherInputDisable: action.isDisable,
        refundPaths: resetOtherInput(state.refundPaths),
      });


    case TYPES.CHANGEREMARK:
      return assign({}, state, {
        remark: `Price Difference Refund；${state.refundPaths.filter(v => v.checked === true).map(value => value.remark).join('\n')}`,
      });

    case TYPES.selectRemark:
      return assign({}, state, {
        refundPaths: changeChannelProp(state.refundPaths, action).map(v => assign({}, v, {
          remark: v.refundPathId === action.channel ?
              `Refund method：${remarkTable[v.refundPathId]}(${v.refund_method || ''}),${v.symbol === '$' ? v.refundAmount || 0 : v.refundCurrency || 0}${v.symbol}`
              : v.remark,
        })),
        remark: `Price Difference Refund； ${changeChannelProp(state.refundPaths, action).map(v => assign({}, v, {
          remark: v.refundPathId === action.channel ?
              `Refund method：${remarkTable[v.refundPathId]}(${v.refund_method || ''}),${v.symbol === '$' ? v.refundAmount || 0 : v.refundCurrency || 0}${v.symbol}`
              : v.remark,
        })).filter(v => v.checked === true).map(value => value.remark).join('\n')}`,
      });

    default:
      return state;
  }
};

export default reducer;

