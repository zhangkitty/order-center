/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';
import { under2Camal } from '../../../../lib/camal';

const defaultState = {
  ready: false,
  rate1: '',
  rate2: '',
  dataSource: {},
  reasons: [],
  fetchType: [],
  fetchWarehouse: [],
  clickVisible: false,
  load: false,
  loadUpdata: false,
  total: 0,
  submitValue: {
    order_id: '',
    refund_type: 2,
    reason: null,
    remark: '',
    refund_paths: [
      {
        refund_amount: '',
        Payapl: '',
        account: '',
      },
    ],
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case TYPES.GET_DATA:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          order_id: action.orderId,
        }),
      });
    case TYPES.GET_DATA_SUCCESS:
      return assign({}, state, {
        ready: true,
        dataSource: under2Camal(action.res),
        rate1: action.res.refunded_wallet_amount.price_usd.rate,
        rate2: action.res.refunded_wallet_amount.price_with_exchange_rate.rate,
      });

    case TYPES.SUBMITFORWARD:
      return assign({}, state, {
        submitValue: state.submitValue,
      });

    case TYPES.SUBMIT_CHANGE:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          [action.key]: action.val,
        }),
      });

    case TYPES.CANCEL:
      return assign({}, state, {
        submitValue: defaultState.submitValue,
      });

    default:
      return state;
  }
};

export default reducer;

