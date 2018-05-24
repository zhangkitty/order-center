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
      debugger;


      return assign({}, state, {
        ready: true,
        dataSource: under2Camal(action.res),
        remainingPriceTotalUnder50: action.res.remainingPriceTotalUnder50,
        submitValue: assign({}, state.submitValue, {
          remark: 'sfaf',
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

