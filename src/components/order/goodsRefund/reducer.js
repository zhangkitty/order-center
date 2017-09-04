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
  submitLoad: false,
  submitValue: {
    orderId: null,
    goodsIds: [],
    shipping: null,
    rlFee: null,
    refundPaths: [],
    reason: { reasonId: null, goodsIds: [] },
    remark: '',
  },
};
const maxTypes = data => (
  {
    1: data.orderPriceInfo.giftCardCanBeRefundedPrice.priceUsd.amount,
    2: data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceUsd.amount,
    3: data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceUsd.amount,
  }
);
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.GET_DATA_SUCCESS:
      return assign({}, state, {
        ready: true,
        dataSource: under2Camal(action.res),
        submitValue: assign({}, state.submitValue, {
          refundPaths: under2Camal(action.res).orderRefundPathList.map(v => ({
            refundTypeId: v.refundPathId,
            isShow: v.isShow,
            refundAmount: v.priceUsd.amount,
            refundAmount2: v.priceWithExchangeRate.amount,
            rate: v.priceUsd.rate,
            rate2: v.priceWithExchangeRate.rate,
            currency: v.priceWithExchangeRate.symbol,
            check: false,
            max: maxTypes(under2Camal(action.res))[v.refundPathId],
          })),
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

