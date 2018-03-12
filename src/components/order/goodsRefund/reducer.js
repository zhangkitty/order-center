/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';
import { under2Camal } from '../../../lib/camal';


const defaultState = {
  ready: false,
  dataSource: {},
  reasons: [],
  fetchType: [],
  fetchWarehouse: [],
  clickVisible: false,
  load: false,
  loadUpdata: false,
  total: 0,
  isUsd: null,
  submitLoad: false,
  submitValue: {
    orderId: null,
    goodsIds: [],
    shipping: 0,
    rlFee: 0,
    refundPaths: [],
    reason: { reasonId: null, goodsIds: [] },
    remark: '',
  },
  cachePaths: [],
};
/**
 *
 * @param data: dataSource
 */
const maxTypes = (data) => {
  if (data.isUsd === 0) {
    return {
      1: data.orderPriceInfo.giftCardCanBeRefundedPrice.priceWithExchangeRate.amount,
      2: data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceWithExchangeRate.amount,
      3: data.orderPriceInfo.cardCanBeRefundedPrice.priceWithExchangeRate.amount > 0 ? data.orderPriceInfo.cardCanBeRefundedPrice.priceWithExchangeRate.amount : 0,
    };
  }
  if (data.isUsd === 1) {
    return {
      1: data.orderPriceInfo.giftCardCanBeRefundedPrice.priceUsd.amount,
      2: data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceUsd.amount,
      3: data.orderPriceInfo.cardCanBeRefundedPrice.priceUsd.amount > 0 ? data.orderPriceInfo.cardCanBeRefundedPrice.priceUsd.amount : 0,
    };
  }

  return null;
}

;

/**
 *
 * @param value: 退款路径ID
 * @param data：submitValue.refundPaths
 * @returns {*}
 */
const changePath = (value, data, flag) => {
  const arr = data.filter(d => d.refundTypeId > 1);
  const radio = arr.map(d => (
    d.refundTypeId === value ?
      assign({}, d, { check: true }) :
      flag ? assign({}, d, { check: false, refundAmount: 0.00, refundCurrency: 0.00 }) :
        assign({}, d, { check: false })
  ));
  const result = data.filter(d => d.refundTypeId < 2).concat(radio);
  return result;
};
const copyPayment = (data) => {
  const arr = data.refundPaths.filter(d => d.refundTypeId > 1);
  const user = arr.find(v => v.refundTypeId === 2) || {};
  const radio = arr.map(d => (
    Number(d.refundTypeId) === 3 ?
      assign({}, d, {
        check: true,
        refundAmount: user.refundAmount,
        refundCurrency: user.refundCurrency,
      })
      : assign({}, d, { check: false, refundAmount: 0.00, refundCurrency: 0.00 })
  ));
  const result = data.refundPaths.filter(d => d.refundTypeId < 2).concat(radio);
  return assign({}, data, {
    refundPaths: result,
  });
};
/**
 *
 * @param priceRefund: 退款商品折后价格之后
 * @param data: dataSource
 * @returns {{1: 礼品卡, 2: 钱包, 3: 用户}}
 */
const originPrice = (priceRefund = 0, data) => {
  const type = data.orderRefundPathList
  .filter(v => Number(v.refundPathId) !== 1 && Number(v.refundPathId) !== 4)
  .sort((a, b) => a.refundPathId - b.refundPathId)[0].refundPathId;
  const max = Number(maxTypes(data)[1]);
  const isShow = max > 0;
  const price = {
    1: 0,
    2: 0,
    3: 0,
  };
  if (!isShow) {
    price[type] = priceRefund;
  }
  if (isShow) {
    if (max > priceRefund) {
      price[1] = priceRefund;
    } else {
      price[1] = max;
      price[type] = priceRefund - max;
    }
  }
  return price;
};


/**
 *
 * @param source: dataSource
 */

const svInit = (source) => {
  const { isUsd } = source;
  const { orderPriceInfo: { isAllCancel } } = source;
  // 运费和运费险
  const shippingInsurePrice = isUsd ? source.orderPriceInfo.shippingInsurePrice.priceUsd.amount : source.orderPriceInfo.shippingInsurePrice.priceWithExchangeRate.amount;
  const shippingPrice = isUsd ? source.orderPriceInfo.shippingPrice.priceUsd.amount : source.orderPriceInfo.shippingPrice.priceWithExchangeRate.amount;
  let amount1;
  if (isAllCancel) {
    amount1 = isUsd ? source.orderPriceInfo.orderCanBeRefundedPrice.priceUsd.amount : source.orderPriceInfo.orderCanBeRefundedPrice.priceWithExchangeRate.amount;
  } else {
    amount1 = isUsd ? source.orderPriceInfo.waitRefundPrice.priceUsd.amount : source.orderPriceInfo.waitRefundPrice.priceWithExchangeRate.amount;
  }
  // 减去运费和运费险剩下的钱(均不退)
  const noRefund = isAllCancel ? (amount1 - shippingInsurePrice - shippingPrice) : amount1;
  const maxObj = maxTypes(source);
  const temp = Object.values(maxObj).reduce((result, value) => {
    if (noRefund - result.reduce((sum, val) => sum + val, 0) > value) {
      return [...result, value];
    }
    return [...result, noRefund - result.reduce((sum, val) => sum + val, 0) > 0 ? noRefund - result.reduce((sum, val) => sum + val, 0) : 0];
  }, []);
  const priceObj = temp.reduce((result, value, idx) => {
    result[++idx] = Number(Number(value).toFixed(2));
    return result;
  }, {});
  const arr = source.orderRefundPathList.map(v => ({
    refundTypeId: v.refundPathId,
    isShow: (Number(v.refundPathId) === 1 && Number(maxObj[v.refundPathId]) > 0) ||
    (Number(v.refundPathId) > 1 && Number(v.refundPathId) !== 4),
    refundAmount: isUsd === 1 ? priceObj[v.refundPathId] : Number(Number(priceObj[v.refundPathId] * (1 / v.priceWithExchangeRate.rate)).toFixed(2)),
    refundCurrency: isUsd === 1 ? Number(Number(priceObj[v.refundPathId] * v.priceWithExchangeRate.rate).toFixed(2)) : priceObj[v.refundPathId],
    rate: v.priceWithExchangeRate.rate,
    rate2: 1 / v.priceWithExchangeRate.rate,
    currency: v.priceWithExchangeRate.symbol,
    check: priceObj[v.refundPathId] > 0,
    max: maxObj[v.refundPathId],
    refundAccountTypeList: v.refundAccountTypeList || [],
    // refund_method: '',
    // account: '',
    refund_method: source.orderRefundUnderlineAccount.refundMethod, // 退款账户
    account: source.orderRefundUnderlineAccount.accountInfo, // 账户信息
    bank_code: source.orderRefundUnderlineAccount.bankCode, // 银行代码
    account1: source.orderRefundUnderlineAccount.cardNumber, // 银行卡号
    customer: source.orderRefundUnderlineAccount.customerName, // 顾客姓名
    issuing_city: source.orderRefundUnderlineAccount.issuingCity, // 发卡城市
  }));
  const checks = arr.filter(v => v.refundTypeId > 1 && v.refundTypeId < 4);
  const check = checks.find(v => v.check); // 获取用户，钱包路径是否有被选中
  if (check || arr.filter(v => v.refundTypeId === 1).length) {
    return arr;
  }
  const checkId = checks.sort((a, b) => a.refundTypeId - b.refundTypeId)[0].refundTypeId;
  return arr.map(v => (v.refundTypeId === checkId ? assign({}, v, { check: true }) : v));
};

/**
 * @desc 均退 若果礼品卡不够 就退到用户或者钱包
 * @param source: datasource
 * @param arr: submitValue.refundPaths
 * @param back: true 均退 , false 均不退
 * @param rl: number  rl费用
 * @returns []
 */
const allBack = (source, arr, back, rl, type, refundPaths) => {
  let p;
  if (source.isUsd === 0) {
    p = Number(source.orderPriceInfo.shippingPrice.priceWithExchangeRate.amount) +
        Number(source.orderPriceInfo.shippingInsurePrice.priceWithExchangeRate.amount); // 运费 + 运费险
    const max = Number(maxTypes(source)[1]); // 礼品卡最大上限
    const gift = arr.find(v => Number(v.refundTypeId) === 1) || {}; // 礼品卡
    const show = max > 0;
    const price = {
      1: gift.refundCurrency || 0,
      2: Number(arr.find(v => Number(v.refundTypeId) === 2).refundCurrency),
      3: type === 3 ?
          Number(arr.find(v => Number(v.refundTypeId) === 2).refundCurrency) :
          Number(arr.find(v => Number(v.refundTypeId) === 3).refundCurrency),
    };
    if (back) {
      if (show) {
        const total = gift.refundCurrency + p;
        if (total > max) {
          price[1] = max;
          price[type || 2] = price[type || 2] + (total - max);
        } else {
          price[1] = total;
        }
        const rlTotal = price[type || 2] - rl;
        if (rlTotal > 0) {
          price[type || 2] = rlTotal;
        } else {
          price[1] = price[1] + rlTotal > 0 ? price[1] + rlTotal : 0;
          price[type || 2] = 0;
        }
      } else {
        const total = (price[type || 2] + p) - rl;
        price[type || 2] = total > 0 ? total : 0;
      }
    }
    if (!back) {
      const total = price[type || 2] - rl;
      if (show) {
        if (total < 0) {
          price[type || 2] = 0;
          const temp = gift.refundCurrency + total;
          price[1] = temp > 0 ? temp : 0;
        } else {
          price[type || 2] = total;
        }
      } else {
        price[type || 2] = total > 0 ? total : 0;
      }
    }
    return refundPaths.map((v) => {
      const temp = assign({}, v, {
        refundAmount: v.check ? Number(Number(price[v.refundTypeId] * v.rate2).toFixed(2)) : 0.00,
        refundCurrency: v.check ? Number(Number(price[v.refundTypeId]).toFixed(2)) : 0.00,
      });
      return temp;
    });
  }
  if (source.isUsd === 1) {
    p = Number(source.orderPriceInfo.shippingPrice.priceUsd.amount) +
        Number(source.orderPriceInfo.shippingInsurePrice.priceUsd.amount); // 运费 + 运费险
    const max = Number(maxTypes(source)[1]); // 礼品卡最大上限
    const gift = arr.find(v => Number(v.refundTypeId) === 1) || {}; // 礼品卡
    const show = max > 0;
    const price = {
      1: gift.refundAmount || 0,
      2: Number(arr.find(v => Number(v.refundTypeId) === 2).refundAmount),
      3: type === 3 ?
          Number(arr.find(v => Number(v.refundTypeId) === 2).refundAmount) :
          Number(arr.find(v => Number(v.refundTypeId) === 3).refundAmount),
    };
    if (back) {
      if (show) {
        const total = gift.refundAmount + p;
        if (total > max) {
          price[1] = max;
          price[type || 2] = price[type || 2] + (total - max);
        } else {
          price[1] = total;
        }
        const rlTotal = price[type || 2] - rl;
        if (rlTotal > 0) {
          price[type || 2] = rlTotal;
        } else {
          price[1] = price[1] + rlTotal > 0 ? price[1] + rlTotal : 0;
          price[type || 2] = 0;
        }
      } else {
        const total = (price[type || 2] + p) - rl;
        price[type || 2] = total > 0 ? total : 0;
      }
    }
    if (!back) {
      const total = price[type || 2] - rl;
      if (show) {
        if (total < 0) {
          price[type || 2] = 0;
          const temp = gift.refundAmount + total;
          price[1] = temp > 0 ? temp : 0;
        } else {
          price[type || 2] = total;
        }
      } else {
        price[type || 2] = total > 0 ? total : 0;
      }
    }
    return refundPaths.map(v => assign({}, v, {
      refundAmount: v.check ? Number(Number(price[v.refundTypeId]).toFixed(2)) : 0.00,
      refundCurrency: v.check ? Number(Number(price[v.refundTypeId] * v.rate).toFixed(2)) : 0.00,

    }));
  }
  return null;
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.GET_DATA_SUCCESS:
      return assign({}, state, {
        ready: true,
        dataSource: under2Camal(action.res),
        submitValue: assign({}, state.submitValue, {
          refundPaths: svInit(under2Camal(action.res)),
        }),
        cachePaths: svInit(under2Camal(action.res)),
        isUsd: under2Camal(action.res).isUsd,
      });
    case TYPES.GET_REASON_SUCCESS:
      return assign({}, state, {
        reasons: under2Camal(action.res),
      });
    case TYPES.CHECK_PATH:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          refundPaths: changePath(action.value, state.submitValue.refundPaths, true),
        }),
        cachePaths: changePath(action.value, state.cachePaths),
      });
    case TYPES.COPY_PAYMENT_METHOD:
      return assign({}, state, {
        submitValue: copyPayment(state.submitValue),
      });
    case TYPES.US_PRICE_CHANGE:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          refundPaths: [
            ...state.submitValue.refundPaths.slice(0, action.i),
            assign({}, state.submitValue.refundPaths[action.i], {
              refundAmount: action.value,
              refundCurrency: Number(Number(action.value) * action.rate).toFixed(2),
            }),
            ...state.submitValue.refundPaths.slice(action.i + 1),
          ],
        }),
      });
    case TYPES.OTHER_PRICE_CHANGE:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          refundPaths: [
            ...state.submitValue.refundPaths.slice(0, action.i),
            assign({}, state.submitValue.refundPaths[action.i], {
              refundAmount: Number(Number(action.value) * action.rate2).toFixed(2),
              refundCurrency: action.value,
            }),
            ...state.submitValue.refundPaths.slice(action.i + 1),
          ],
        }),
      });
    case TYPES.ALL_BACK:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          refundPaths: allBack(
            state.dataSource,
            state.cachePaths,
            action.back,
            action.rl,
            action.typeId,
            state.submitValue.refundPaths),
        }),
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
        submitValue: {
          shipping: null,
          rlFee: null,
          reason: { reasonId: null, goodsIds: [] },
          remark: '',
          refundPaths: state.cachePaths.map(v => assign({}, v, {   // state.submitValue.refundPaths
            refundAmount: v.refundAmount,
            refundCurrency: v.refundCurrency,
            refund_method: v.refund_method,
            account: v.account,
            bank_code: v.bank_code,
            account: v.account,
            customer: v.customer,
            issuing_city: v.issuing_city,
            check: false,
          })),
        },
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

