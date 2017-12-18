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
  submitValue: {
    refundBillId: null,
    recordList: [],
    remark: '',
    max: '',
  },
};
const maxTypes = data => ({
  1: {
    1: data.orderPriceInfo.giftCardCanBeRefundedPrice.priceWithExchangeRate.amount,
    2: data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceWithExchangeRate.amount,
    3: data.orderPriceInfo.cardCanBeRefundedPrice.priceWithExchangeRate.amount,
  },
  2: {
    1: data.orderPriceInfo.giftCardCanBeRefundedPrice.priceWithExchangeRate.amount,
    2: Number(Number(data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceWithExchangeRate.amount)
      +
      (Number(data.orderPriceInfo.totalPrice.priceWithExchangeRate.amount) * 1.5))
      .toFixed(2), // 钱包(实付金额*150%+钱包可退金额)
    3: data.orderPriceInfo.cardCanBeRefundedPrice.priceWithExchangeRate.amount,
    4: data.orderPriceInfo.totalPrice.priceWithExchangeRate.amount * 1.5,  // 溢出（实付金额*150%）
  },
  3: {
    1: data.orderPriceInfo.giftCardCanBeRefundedPrice.priceUsd.amount,
    2: data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceUsd.amount,
    3: data.orderPriceInfo.cardCanBeRefundedPrice.priceUsd.amount,
  },
  4: {
    1: data.orderPriceInfo.giftCardCanBeRefundedPrice.priceUsd.amount,
    2: Number(Number(data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceUsd.amount)
        +
        (Number(data.orderPriceInfo.totalPrice.priceUsd.amount) * 1.5))
        .toFixed(2), // 钱包(实付金额*150%+钱包可退金额)
    3: data.orderPriceInfo.cardCanBeRefundedPrice.priceUsd.amount,
    4: data.orderPriceInfo.totalPrice.priceUsd.amount * 1.5,  // 溢出（实付金额*150%）
  },
}
);
const maxv = (res, refundPathId) => {
  const ss = under2Camal(res); // 驼峰
  const temp = maxTypes(ss); // 最大值
  let temp2;
  if (Number(ss.refundBillInfo.refundTypeId) !== 2) {
    temp2 = res.is_usd ? temp[3] : temp[1];
  } else {
    temp2 = res.is_usd ? temp[4] : temp[2];
  }
  return temp2[refundPathId];
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.GET_DATA_SUCCESS:
      return assign({}, state, {
        ready: true,
        dataSource: under2Camal(action.res),
        refundInfo: under2Camal(action.res).refundBillInfo, // 退款单信息
        submitValue: assign({}, state.submitValue, {
          refundBillId: under2Camal(action.res).refundBillInfo.refundBillId,   // 退款单类型ID
          recordList: under2Camal(action.res).refundBillInfo.refundRecordList.map(v => ({
            recordId: v.recordId,   // 退款记录ID
            refundPathName: v.refundPathName,   // 退款单类型ID
              //  isShow: v.isShow,
            refundAmount: v.refundAmount.priceUsd.amount,   // 美元金额
            refundCurrency: v.refundAmount.priceWithExchangeRate.amount,  // 非美元金额
            rate: v.refundAmount.priceUsd.rate,   // 汇率
            rate2: v.refundAmount.priceWithExchangeRate.rate, // 汇率（转$）
            currency: v.refundAmount.priceWithExchangeRate.symbol, // 非美元币种
            max: maxv(action.res, v.refundPathId), // 最大值
            // max: maxTypes(under2Camal(action.res))[under2Camal(action.res).refundBillInfo.refundTypeId][v.refundPathId],
          }),
          ),
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
        submitValue: {
          remark: '',
          recordList: state.submitValue.recordList.map(v => assign({}, v, {
            refundAmount: '',
            refundCurrency: '',
            refund_method: '',
            account: '',
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

