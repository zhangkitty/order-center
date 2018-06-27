/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';
import { under2Camal } from '../../../lib/camal';


const defaultState = {
  is_platform_order: null,
  is_web_celebrity_order: null,
  ShippingAndInsurance: '',
  RefundMethod: '',
  RefundItems: '',
  RefundAmount: '',
  showtotalAmount: null,
  showtotalCurrency: null,
  ready: false,
  dataSource: {},
  reasons: [],
  reasonId: null,
  remark: '',
  fetchType: [],
  fetchWarehouse: [],
  clickVisible: false,
  load: false,
  loadUpdata: false,
  total: 0,
  isUsd: null,
  submitLoad: false,
  shipping: 0, // 运费 退:1，不退:0,
  shippingInsurance: 0, // 运费险 退：1,不退:0,
  rlFee: 0, // 选中的RL费用的的值，此时需要退款的金额需要减去RL费用
  radioValue: 2, // 用户和钱包之间的选择
  refundPaths: [],
  rate: null,
  hasShippingInsurancePriceRefunded: 0, // 运费险是否已经退过
  hasShippingPriceRefunded: 0, // 运费是否已经退过
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
};

function evaluate(total, maxTips, radioValue) {
  const result = {};
  result[1] = total > maxTips[1] ? maxTips[1] : total;
  result[radioValue] = total > maxTips[1] ? total - maxTips[1] : 0;
  return result;
}

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

let maxTipsAmount;
let maxTipsCurrency;
let totalAmount;
let totalCurrency;
let shippingAmount;// 运费(美元)
let shippingCurrency;// 运费
let insuranceAmount;// 运费险(美元)
let insuranceCurrency;// 运费险
let rlFeeAmount = 0;// rl费用(美元)
let rlFeeCurrency = 0;// rl费用
let isUsd = null;

const orderStatusTable = {
  1: '已付款',
  2: '已审核',
  3: '进行中',
  4: '部分发货',
  5: '全部发货',
  6: '已签收',
  7: '已完成',
  8: '已拒收',
  9: '已报损',
  10: '待自提',
  11: '派件异常',
  12: '派件中',
  13: '已经退款',
  14: '已取消',
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
        is_platform_order: action.res.order_price_info.is_platform_order,
        is_web_celebrity_order: action.res.order_price_info.is_web_celebrity_order,
      });
    case TYPES.initSerSuccess:
      console.log(action.data.orderPriceInfo.isPlatformOrder);
      console.log(action.data.orderPriceInfo.isWebCelebrityOrder);
      const {
        orderPriceInfo,
        orderRefundUnderlineAccount,
          orderGoods,
        paymentMethod,
      } = action.data;
      const {
        hasShippingInsurancePriceRefunded,
        hasShippingPriceRefunded,
      } = orderPriceInfo;
      isUsd = action.data.isUsd;
      const { isAllCancel, orderStatus, isPlatformOrder } = orderPriceInfo;
      // 订单状态为已付款、已审核、进行中、已拒收、已报损
      const orderStatusArray = [1, 2, 3, 8, 9];
      const isOrderStatMeets = orderStatusArray.filter(v => v === (+orderStatus)).length;
      // 订单状态为已付款、已审核、进行中、已拒收、已报损，且整单退款且时默认退；
      // 判断默认情况是退还是不退
      const DefaultValue = isAllCancel * isOrderStatMeets ? 1 : 0;
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
      if (DefaultValue && isAllCancel) {
        const rl = orderPriceInfo.refundedRl;
        const rate = orderPriceInfo.orderBalancePrice.priceWithExchangeRate.amount / orderPriceInfo.orderBalancePrice.priceUsd.amount;
        // totalAmount = canRefund.priceUsd.amount + shippingAmount + insuranceAmount;
        // totalCurrency = canRefund.priceWithExchangeRate.amount + shippingCurrency + insuranceCurrency;
        totalAmount = orderPriceInfo.orderBalancePrice.priceUsd.amount - rl;
        totalCurrency = orderPriceInfo.orderBalancePrice.priceWithExchangeRate.amount - rl * rate;
      } else if (DefaultValue && !isAllCancel) {
        totalAmount = orderPriceInfo.waitRefundPrice.priceUsd.amount + shippingAmount + insuranceAmount;
        totalCurrency = orderPriceInfo.waitRefundPrice.priceWithExchangeRate.amount + shippingCurrency + insuranceCurrency;
        // totalAmount = canRefund.priceUsd.amount;
        // totalCurrency = canRefund.priceWithExchangeRate.amount;
      } else if (!DefaultValue && isAllCancel) {
        const rl = orderPriceInfo.refundedRl;
        const rate = orderPriceInfo.orderBalancePrice.priceWithExchangeRate.amount / orderPriceInfo.orderBalancePrice.priceUsd.amount;
        totalAmount = orderPriceInfo.orderBalancePrice.priceUsd.amount - shippingAmount - insuranceAmount - rl / rate;
        totalCurrency = orderPriceInfo.orderBalancePrice.priceWithExchangeRate.amount - shippingCurrency - insuranceCurrency - rl;
        if (orderPriceInfo.hasShippingInsurancePriceRefunded) {
          totalAmount += insuranceAmount;
          totalCurrency += insuranceCurrency;
        }
        if (orderPriceInfo.hasShippingPriceRefunded) {
          totalAmount += shippingAmount;
          totalCurrency += shippingCurrency;
        }
      } else {
        totalAmount = orderPriceInfo.waitRefundPrice.priceUsd.amount;
        totalCurrency = orderPriceInfo.waitRefundPrice.priceWithExchangeRate.amount;
      }

      let resultAmount = evaluate(totalAmount, maxTipsAmount, state.radioValue);
      let resultCurrency = evaluate(totalCurrency, maxTipsCurrency, state.radioValue);
      let refundPaths = action.data.orderRefundPathList.map(v => assign({}, v, {
        checked: !!v.isShow,
        refundAmount: resultAmount[v.refundPathId],
        refundCurrency: resultCurrency[v.refundPathId],
        refund_method: orderRefundUnderlineAccount.refundMethod,
        bank_code: orderRefundUnderlineAccount.bankCode,
        card_number: orderRefundUnderlineAccount.cardNumber,
        customer_name: orderRefundUnderlineAccount.customerName,
        issuing_city: orderRefundUnderlineAccount.issuingCity,
        account: orderRefundUnderlineAccount.accountInfo,
      }));

      const refundGoods = [];
      orderGoods.map(v => refundGoods.push(v.goodsSort));
      const table = {
        1: 'gift card',
        2: 'wallet',
        3: 'account',
        4: 'account(yesbank/paytm/paypal)',
      };
      const ref = refundPaths.map(v => assign({}, v, {
        symbol:
            paymentMethod.substr(0, 6) === 'PayPal' &&
            (['ARS', 'BRL', 'KWD', 'AED', 'SAR', 'INR', 'BHD ', 'OMR'].includes(`${v.priceWithExchangeRate.symbol.trim()}`)) ?
                '$' : `${v.priceWithExchangeRate.symbol}`,
        moneyWithnoSymbol:
            paymentMethod.substr(0, 6) === 'PayPal' &&
        (['ARS', 'BRL', 'KWD', 'AED', 'SAR', 'INR', 'BHD ', 'OMR'].includes(`${v.priceWithExchangeRate.symbol.trim()}`)) ?
            `${v.refundAmount}`
            :
            `${v.refundCurrency}`,
        refMarkE: table[v.refundPathId],
        refMakrMoney:
            paymentMethod.substr(0, 6) === 'PayPal' &&
            (['ARS', 'BRL', 'KWD', 'AED', 'SAR', 'INR', 'BHD ', 'OMR'].includes(`${v.priceWithExchangeRate.symbol.trim()}`)) ?
            `${+Number(v.refundAmount).toFixed(2)}${v.priceUsd.symbol}`
                :
            `${+Number(v.refundCurrency).toFixed(2)}${v.priceWithExchangeRate.symbol}`,
      }));
      const refPRemark = ref.filter(v => v.refundAmount > 0);
      const RefundM = refPRemark.map(v => `Refund method：${v.refMarkE},${v.refMakrMoney}`);
      const tot = refPRemark.reduce((sum, value) => sum += (+value.moneyWithnoSymbol), 0);
      const sym = (refPRemark[0] || {}).symbol || '';
      const shippingString = DefaultValue ? '（shipping and shipping insurance fee also be refunded)' : '';
      const RefundItems = `Refund items：${refundGoods.join(',')}\n`;
      const RefundAmount = `Refund amount:${Number(tot).toFixed(2)}${sym}-0${sym}(RL)=${Number(tot).toFixed(2)}${sym}`;
      const ShippingAndInsurance = `${shippingString}\n`;
      const RefundMethod = RefundM.join(' , ');
      const remark = `${RefundItems}${RefundAmount}${ShippingAndInsurance}${RefundMethod}`;
      return assign({}, state, {
        showtotalAmount: totalAmount,
        showtotalCurrency: totalAmount * (+orderPriceInfo.totalPrice.priceWithExchangeRate.rate),
        maxTips,
        dataSource: action.data,
        refundPaths: ref,
        rate: +orderPriceInfo.totalPrice.priceWithExchangeRate.rate,
        hasShippingInsurancePriceRefunded,
        hasShippingPriceRefunded,
        shipping: DefaultValue ? 1 : 0,
        shippingInsurance: DefaultValue ? 1 : 0,
        radioValue: isPlatformOrder === 1 ? 3 : (resultCurrency[2] > 0 ? 2 : 0),
        isUsd,
        remark: action.data.orderPriceInfo.isPlatformOrder || action.data.orderPriceInfo.isWebCelebrityOrder ? '' : remark,
        RefundItems,
        RefundAmount,
        RefundMethod,
        ShippingAndInsurance,
        is_platform_order: action.data.orderPriceInfo.isPlatformOrder,
        is_web_celebrity_order: action.data.orderPriceInfo.isWebCelebrityOrder,

      });
    case TYPES.GET_REASON_SUCCESS:
      return assign({}, state, {
        reasons: under2Camal(action.res),
      });
    case TYPES.changeChannelValue:
      return assign({}, state, {
        refundPaths: changeChannelProp(state.refundPaths, action),
      });
    case TYPES.CHECK_PATH:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          refundPaths: changePath(action.value, state.submitValue.refundPaths, true),
        }),
        cachePaths: changePath(action.value, state.cachePaths),
      });
    case TYPES.changeShipping:
      if (action.val === 1) {
        totalAmount += shippingAmount;
        totalCurrency += shippingCurrency;
      } else {
        totalAmount -= shippingAmount;
        totalCurrency -= shippingCurrency;
      }
      resultAmount = evaluate(totalAmount, maxTipsAmount, state.radioValue);
      resultCurrency = evaluate(totalCurrency, maxTipsCurrency, state.radioValue);
      const shippingTable = {
        '00': '\n',
        '01': '(shipping insurance fee also be refunded)\n',
        10: '(shipping fee alse be refunded)\n',
        11: '(shipping and shipping insurance fee also be refunded)\n',
      };
      const stringTemp = shippingTable[`${state.shipping}${state.shippingInsurance}`];
      refundPaths = state.refundPaths.map(v => assign({}, v, {
        refundAmount: +Number(resultAmount[v.refundPathId]).toFixed(2),
        refundCurrency: +Number(resultCurrency[v.refundPathId]).toFixed(2),
        moneyWithnoSymbol: v.symbol === '$' ? +Number(resultAmount[v.refundPathId]).toFixed(2) : +Number(resultCurrency[v.refundPathId]).toFixed(2),
        refMakrMoney: v.symbol === '$' ? `${+Number(resultAmount[v.refundPathId]).toFixed(2)}${v.symbol}`
            : `${+Number(resultCurrency[v.refundPathId]).toFixed(2)}${v.symbol}`,
      }));
      const arr = refundPaths.filter(v => v.checked === true && v.refundCurrency > 0);
      const methodStr = arr.map(v => `Refund method：${v.refMarkE}${v.refundPathId == 3 ? (v.refund_method ? `(${v.refund_method})` : '') : ''},${v.refMakrMoney}`).join(',');
      const totalChangeShipping = arr.reduce((sum, value) => sum += value.moneyWithnoSymbol, 0);
      const symbStr = arr[0] && arr[0].symbol;
      const refundAmountStr = `Refund amount:${Number(totalChangeShipping + state.rlFee).toFixed(2)}${symbStr}-${Number(state.rlFee).toFixed(2)}${symbStr}(RL) = ${Number(totalChangeShipping).toFixed(2)}${symbStr}`;
      return assign({}, state, {
        refundPaths,
        RefundMethod: methodStr,
        RefundAmount: refundAmountStr,
        remark: state.is_platform_order || state.is_web_celebrity_order ? '' : `${state.RefundItems}${refundAmountStr}${stringTemp}${methodStr}`,
        ShippingAndInsurance: stringTemp,
      });
    case TYPES.COPY_PAYMENT_METHOD:
      return assign({}, state, {
        submitValue: copyPayment(state.submitValue),
      });
    case TYPES.changeShippingInsurance:
      if (action.val === 1) {
        totalAmount += insuranceAmount;
        totalCurrency += insuranceCurrency;
      } else {
        totalAmount -= insuranceAmount;
        totalCurrency -= insuranceCurrency;
      }
      resultAmount = evaluate(totalAmount, maxTipsAmount, state.radioValue);
      resultCurrency = evaluate(totalCurrency, maxTipsCurrency, state.radioValue);
      const ShippingInsuranceTable = {
        '00': '\n',
        '01': '(shipping insurance fee also be refunded)\n',
        10: '(shipping fee alse be refunded)\n',
        11: '(shipping and shipping insurance fee also be refunded)\n',
      };

      const shippingInsuranceString = ShippingInsuranceTable[`${state.shipping}${state.shippingInsurance}`];
      refundPaths = state.refundPaths.map(v => assign({}, v, {
        refundAmount: +Number(resultAmount[v.refundPathId]).toFixed(2),
        refundCurrency: +Number(resultCurrency[v.refundPathId]).toFixed(2),
        moneyWithnoSymbol: v.symbol === '$' ? +Number(resultAmount[v.refundPathId]).toFixed(2) : +Number(resultCurrency[v.refundPathId]).toFixed(2),
        refMakrMoney: v.symbol === '$' ? `${+Number(resultAmount[v.refundPathId]).toFixed(2)}${v.symbol}`
            : `${+Number(resultCurrency[v.refundPathId]).toFixed(2)}${v.symbol}`,
      }));
      const arrInsu = refundPaths.filter(v => v.checked === true && v.refundCurrency > 0);
      const methodStrInsu = arrInsu.map(v => `Refund method：${v.refMarkE}${v.refundPathId == 3 ? (v.refund_method ? `(${v.refund_method})` : '') : ''},${v.refMakrMoney}`).join(',');
      const totalChangeInsu = arrInsu.reduce((sum, value) => sum += value.moneyWithnoSymbol, 0);
      const symbStrInsu = arrInsu[0] && arrInsu[0].symbol;
      const refundAmountStrInsu = `Refund amount:${Number(totalChangeInsu + state.rlFee).toFixed(2)}${symbStrInsu}-${Number(state.rlFee).toFixed(2)}${symbStrInsu}(RL) = ${Number(totalChangeInsu).toFixed(2)}${symbStrInsu}`;
      return assign({}, state, {
        refundPaths,
        RefundMethod: methodStrInsu,
        RefundAmount: refundAmountStrInsu,
        remark: state.is_platform_order || state.is_web_celebrity_order ? '' : `${state.RefundItems}${refundAmountStrInsu}${shippingInsuranceString}${methodStrInsu}`,
        ShippingAndInsurance: shippingInsuranceString,
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
    case TYPES.changeRlFee:
      if (+isUsd === 0) {
        totalCurrency = totalCurrency + rlFeeCurrency - action.val;
        rlFeeCurrency = action.val;
        totalAmount = totalCurrency / state.rate;
      } else {
        totalAmount = totalAmount + rlFeeAmount - action.val;
        rlFeeAmount = action.val;
        totalCurrency = totalAmount * state.rate;
      }
      resultAmount = evaluate(totalAmount, maxTipsAmount, state.radioValue);
      resultCurrency = evaluate(totalCurrency, maxTipsCurrency, state.radioValue);
      refundPaths = state.refundPaths.map(v => assign({}, v, {
        refundAmount: +Number(resultAmount[v.refundPathId]).toFixed(2),
        refundCurrency: +Number(resultCurrency[v.refundPathId]).toFixed(2),
        moneyWithnoSymbol: v.symbol === '$' ? +Number(resultAmount[v.refundPathId]).toFixed(2) :
            +Number(resultCurrency[v.refundPathId]).toFixed(2),
        refMakrMoney: v.symbol === '$' ? `${+Number(resultAmount[v.refundPathId]).toFixed(2)}${v.symbol}`
            : `${+Number(resultCurrency[v.refundPathId]).toFixed(2)}${v.symbol}`,
      }));
      const refPRemarkRl = refundPaths.filter(v => v.refundAmount > 0);
      const RefundMRl = refPRemarkRl.map(v => `Refund method：${v.refMarkE}${v.refundPathId == 3 ? (v.refund_method ? `(${v.refund_method})` : '') : ''},${v.refMakrMoney}`);
      const totRl = refPRemarkRl.reduce((sum, value) => sum += (+value.moneyWithnoSymbol), 0).toFixed(2);
      const symRl = refPRemarkRl[0].symbol;
      const RefundAmountRl = `Refund amount:${+Number(+totRl + action.val).toFixed(2)}${symRl}-${action.val}${symRl}(RL)=${totRl}${symRl}`;
      const RefundMethodRl = RefundMRl.join(',');
      return assign({}, state, {
        refundPaths,
        remark: state.is_platform_order || state.is_web_celebrity_order ? '' : `${state.RefundItems}${RefundAmountRl}${state.ShippingAndInsurance}${RefundMethodRl}`,
        RefundAmount: RefundAmountRl,
        RefundMethod: RefundMethodRl,
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
        //  submitLoad: true,
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

    case TYPES.changeRadioValue:
      const tempArr = state.refundPaths.filter(v => (v.refundPathId === 1 || v.refundPathId === action.val) && v.refundAmount > 0);
      const str = tempArr.map(v => `Refund method：${v.refMarkE}${v.refundPathId == 3 ? (v.refund_method ? `(${v.refund_method})` : '') : ''},${v.refMakrMoney}`).join(',');
      return assign({}, state, {
        radioValue: action.val,
        refundMethod: str,
        remark: state.is_platform_order || state.is_web_celebrity_order ? '' : `${state.RefundItems}${state.RefundAmount}${state.ShippingAndInsurance}${str}`,
      });
    case TYPES.changeInput:
      const changeInputTempArr = state.refundPaths.filter(v => (v.refundPathId === 1 || v.refundPathId === state.radioValue) && v.refundAmount > 0);
      const changeInputstr = changeInputTempArr.map(v => `Refund method：${v.refMarkE}${v.refundPathId == 3 ? (v.refund_method ? `(${v.refund_method})` : '') : ''},${v.refMakrMoney}`).join(',');
      const tol =
          (changeInputTempArr[0] && changeInputTempArr[0].symbol) === '$' ?
              changeInputTempArr.reduce((sum, value) => sum += (+value.refundAmount), 0) :
              changeInputTempArr.reduce((sum, value) => sum += (+value.refundCurrency), 0);
      const symb = changeInputTempArr[0] && changeInputTempArr[0].symbol;
      const rlFee = (+isUsd === 0) ? rlFeeCurrency : rlFeeAmount;
      const RefundAmountChangeInput =
          (tol && symb) ?
          `Refund amount:${Number(tol + rlFee).toFixed(2)}${symb}-${Number(rlFee).toFixed(2)}${symb} =  ${Number(tol).toFixed(2)}${symb}`
              : 'Refund amount:'
      ;
      return assign({}, state, {
        RefundAmount: RefundAmountChangeInput,
        refundMethod: changeInputstr,
        remark: state.is_platform_order || state.is_web_celebrity_order ? '' : `${state.RefundItems}${RefundAmountChangeInput}${state.ShippingAndInsurance}${changeInputstr}`,
      });


    case TYPES.changeRefundMethod:
      if (state.radioValue === 3) {
        const tempArrChangeRefundMethod = state.refundPaths.filter(v => (v.refundPathId === 1 || v.refundPathId === 3) && v.refundAmount > 0);
        const strChangeRefundMethod = tempArrChangeRefundMethod.map(v => `Refund method：${v.refMarkE}${v.refundPathId == 3 ? (v.refund_method ? `(${v.refund_method})` : '') : ''},${v.refMakrMoney}`).join(',');
        return assign({}, state, {
          refundMethod: strChangeRefundMethod,
          remark: `${state.RefundItems}${state.RefundAmount}${state.ShippingAndInsurance}${strChangeRefundMethod}`,
        });
      }
      return state;


    default:
      return state;
  }
};

export default reducer;

