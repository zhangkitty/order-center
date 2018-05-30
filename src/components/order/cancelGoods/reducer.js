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
    reason: { reasonId: null, goodsIds: [] },
    remark: '',
  },
  remainingPriceTotalUnder50: false,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.GET_DATA_SUCCESS:
      const { order_goods } = action.res;
      const { order_price_info } = action.res;
      console.log(order_price_info);
      const { wait_refund_price } = order_price_info;
      const cancelItems = `Cancel items:${order_goods.map(v => v.goods_sort).join(',')}\n`;
      const RefundAmount = `Refund amount: ${wait_refund_price.price_usd.amount_with_symbol}`;
      console.log(cancelItems);
      return assign({}, state, {
        ready: true,
        dataSource: under2Camal(action.res),
        remainingPriceTotalUnder50: action.res.remainingPriceTotalUnder50,
        submitValue: assign({}, state.submitValue, {
          remark: `${cancelItems}${RefundAmount}`,
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

