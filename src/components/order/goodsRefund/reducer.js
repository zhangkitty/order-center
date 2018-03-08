/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as types from './types';


const defaultState = {
  reasons: [],
  dataSource: {
  },
  reasonId: null,
  remark: '',
  submitLoad: false,
  shipping: 0, // 运费 退:1，不退:0,
  shippingInsurance: 0, // 运费险 退：1,不退:0,
  rlFee: 0, // 选中的RL费用的的值，此时需要退款的金额需要减去RL费用
  radioValue: 2, // 用户和钱包之间的选择
  refundPaths: [],
  rate: null,

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

function evaluate(total, maxTips, radioValue) {
  const result = {};
  result[1] = total > maxTips[1] ? maxTips[1] : total;
  result[radioValue] = total > maxTips[1] ? total - maxTips[1] : 0;
  return result;
}

let maxTipsAmount;
let maxTipsCurrency;
let totalAmount;
let totalCurrency;
let shippingAmount;// 运费(美元)
let shippingCurrency;// 运费
let insuranceAmount;// 运费险(美元)
let insuranceCurrency;// 运费险
const rlFeeAmount = 0;// rl费用(美元)
let rlFeeCurrency = 0;// rl费用
let isUsd;


const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.change:
      return assign({}, state, {
        [action.key]: action.val,
      });
    case types.initSerSuccess:
      const { orderPriceInfo, orderRefundUnderlineAccount } = action.data;
      isUsd = action.data.isUsd;
      const { isAllCancel } = orderPriceInfo;
      shippingAmount = orderPriceInfo.shippingPrice.priceUsd.amount;
      shippingCurrency = orderPriceInfo.shippingPrice.priceWithExchangeRate.amount;
      insuranceAmount = orderPriceInfo.shippingInsurePrice.priceUsd.amount;
      insuranceCurrency = orderPriceInfo.shippingInsurePrice.priceWithExchangeRate.amount;
      maxTipsAmount = {
        1: orderPriceInfo.giftCardCanRefundPrice.priceUsd.amount,
        2: orderPriceInfo.walletCanRefundPrice.priceUsd.amount,
        3: orderPriceInfo.cardCanRefundPrice.priceUsd.amount,
        4: orderPriceInfo.overflowCanRefundPrice.priceUsd.amount,
      };
      maxTipsCurrency = {
        1: orderPriceInfo.giftCardCanRefundPrice.priceWithExchangeRate.amount,
        2: orderPriceInfo.walletCanRefundPrice.priceWithExchangeRate.amount,
        3: orderPriceInfo.cardCanRefundPrice.priceWithExchangeRate.amount,
        4: orderPriceInfo.overflowCanRefundPrice.priceWithExchangeRate.amount,
      };
      const maxTips = {
        1: orderPriceInfo.giftCardCanRefundPrice,
        2: orderPriceInfo.walletCanRefundPrice,
        3: orderPriceInfo.cardCanRefundPrice,
        4: orderPriceInfo.overflowCanRefundPrice,
      };
      totalAmount = orderPriceInfo.waitRefundPrice.priceUsd.amount;
      totalCurrency = orderPriceInfo.waitRefundPrice.priceWithExchangeRate.amount;

      let resultAmount = evaluate(totalAmount, maxTipsAmount, state.radioValue);
      let resultCurrency = evaluate(totalCurrency, maxTipsCurrency, state.radioValue);
      let refundPaths = action.data.orderRefundPathList.map(v => assign({}, v, {
        refundAmount: resultAmount[v.refundPathId],
        refundCurrency: resultCurrency[v.refundPathId],
        refund_method: orderRefundUnderlineAccount.refundMethod,
        bank_code: orderRefundUnderlineAccount.bankCode,
        card_number: orderRefundUnderlineAccount.cardNumber,
        customer_name: orderRefundUnderlineAccount.customerName,
        issuing_city: orderRefundUnderlineAccount.issuingCity,
        account: orderRefundUnderlineAccount.accountInfo,
      }));
      return assign({}, state, {
        maxTips,
        dataSource: action.data,
        refundPaths,
        rate: +orderPriceInfo.totalPrice.priceWithExchangeRate.rate,
      });
    case types.changeChannelValue:
      return assign({}, state, {
        refundPaths: changeChannelProp(state.refundPaths, action),
      });
    case types.changeShipping:
      if (action.val === 1) {
        totalAmount += shippingAmount;
        totalCurrency += shippingCurrency;
      } else {
        totalAmount -= shippingAmount;
        totalCurrency -= shippingCurrency;
      }
      resultAmount = evaluate(totalAmount, maxTipsAmount, state.radioValue);
      resultCurrency = evaluate(totalCurrency, maxTipsCurrency, state.radioValue);
      refundPaths = state.refundPaths.map(v => assign({}, v, {
        refundAmount: resultAmount[v.refundPathId],
        refundCurrency: resultCurrency[v.refundPathId],
      }));
      return assign({}, state, {
        refundPaths,
      });


    case types.changeShippingInsurance:
      if (action.val === 1) {
        totalAmount += insuranceAmount;
        totalCurrency += insuranceCurrency;
      } else {
        totalAmount -= insuranceAmount;
        totalCurrency -= insuranceCurrency;
      }
      resultAmount = evaluate(totalAmount, maxTipsAmount, state.radioValue);
      resultCurrency = evaluate(totalCurrency, maxTipsCurrency, state.radioValue);
      refundPaths = state.refundPaths.map(v => assign({}, v, {
        refundAmount: resultAmount[v.refundPathId],
        refundCurrency: resultCurrency[v.refundPathId],
      }));
      return assign({}, state, {
        refundPaths,
      });

    case types.changeRlFee:
      if (+isUsd === 0) {
        totalCurrency = totalCurrency + rlFeeCurrency - action.val;
        rlFeeCurrency = action.val;
        totalAmount = totalCurrency / state.rate;
      } else {
        totalAmount = totalAmount + rlFeeAmount - action.val;
        totalAmount = action.val;
        totalCurrency = totalAmount * state.rate;
      }
      resultAmount = evaluate(totalAmount, maxTipsAmount, state.radioValue);
      resultCurrency = evaluate(totalCurrency, maxTipsCurrency, state.radioValue);
      refundPaths = state.refundPaths.map(v => assign({}, v, {
        refundAmount: resultAmount[v.refundPathId],
        refundCurrency: resultCurrency[v.refundPathId],
      }));
      return assign({}, state, {
        refundPaths,
      });
    default:
      return state;
  }
};

export default reducer;

