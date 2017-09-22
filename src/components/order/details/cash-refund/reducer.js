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
    orderId: null,
    memberId: null,
    refundType: null,
    refundPaths: [],
    site_from: null,
    notWithdrawAmount: '',   // 提现金额
    canWithdrawAmount: '',   // 不可提现金额
    remark: '',
    max: '',
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.GET_DATA_SUCCESS:
      // console.log(under2Camal(action.res).walletExtractable.priceUsd.amount, '123');
      return assign({}, state, {
        dataSource: under2Camal(action.res),
        submitValue: assign({}, state.submitValue, {
          refundPaths: under2Camal(action.res).walletExtractable.priceUsd.amount,
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
          refundList: state.submitValue.refundList.map(v => assign({}, v, {
            refundAmount: '',
            refundAmount2: '',
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

