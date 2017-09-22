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
    notWithdrawAmount: '',
    canWithdrawAmount: '',
    remark: '',
    max: '',
  },
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
          refundList: under2Camal(action.res).refundBillInfo.refundRecordList.map(v => ({
            recordId: v.recordId,   // 退款记录ID
            refundPathName: v.refundPathName,   // 退款单类型ID
            refundAmount: v.refundAmount.priceUsd.amount,   // 美元金额
            refundAmount2: v.refundAmount.priceWithExchangeRate.amount,  // 非美元金额
            rate: v.refundAmount.priceUsd.rate,   // 汇率
            rate2: v.refundAmount.priceWithExchangeRate.rate, // 汇率（转$）
            currency: v.refundAmount.priceWithExchangeRate.symbol, // 非美元币种
            max: under2Camal(action.res)[under2Camal(action.res).refundBillInfo.refundTypeId][v.refundPathId], // 最大值  TODO
              //  refundAccountTypeList: v.refund_account_type_list || [],  // 退款账户 TODO
              //  refund_method: '',   // 退款方式
              //  account: '',    // 退款金额
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

