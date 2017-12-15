import assign from 'object-assign';
import * as TYPES from './types';

const lan = {
  取消退款: __('refund.details.Cancel_the_refund'),
};

const defaultState = {
  ready: false,
  refundBillId: '',
  dataSource: {},
  remarkInfo: { // 备注信息
    reamrkShow: false,
    remarkSource: [],
    load: false,
  },
  addRemarkInfo: { // 新增备注信息
    reamrkShow: false,
    remark: '',
    load: false,
  },
  rejectInfo: {
    reamrkShow: false,
    reason: '',
    load: false,
  },
  refundInfo: {
    load: false,
    saveLoad: false,
    data: {},
  },
  reverseRefund: {
    saveLoad: false,
    show: false,
    data: {},
  },
  changeOrderInfo: {
    show: false,
    billno: '',
    refund_record_id: '',
    refundBillId: '',
  },
  cancelTheRefundBill: {
    show: false,
    refund_bill_id: '',
    reasonRecord: '',
    load: false,
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.GET_INFO_SUCCESS:
      return assign({}, state, {
        ready: true,
        dataSource: action.data,
      });
    case TYPES.REMARK_INFO:
      return assign({}, state, {
        remarkInfo: assign({}, state.remarkInfo, {
          load: true,
          remarkSource: [],
        }),
      });
    case TYPES.REMARK_INFO_SUCCESS:
      return assign({}, state, {
        remarkInfo: assign({}, state.remarkInfo, {
          remarkSource: action.data.remarks,
          reamrkShow: true,
          load: false,
        }),
      });
    case TYPES.ADD_REMARK_INFO:
      return assign({}, state, {
        addRemarkInfo: assign({}, state.addRemarkInfo, {
          load: true,
        }),
      });
    case TYPES.REJECT_INFO:
      return assign({}, state, {
        rejectInfo: assign({}, state.rejectInfo, {
          load: true,
        }),
      });
    case TYPES.REFUND:
      return assign({}, state, {
        refundInfo: assign({}, state.refundInfo, {
          load: true,
        }),
      });
    case TYPES.REFUND_SUCCESS:
      return assign({}, state, {
        refundInfo: assign({}, state.refundInfo, {
          load: false,
          data: action.data,
        }),
      });
    case TYPES.REFUND_FAIL:
      return assign({}, state, {
        refundInfo: assign({}, state.refundInfo, {
          load: false,
        }),
      });
    case TYPES.DO_REFUND:
      return assign({}, state, {
        refundInfo: assign({}, state.refundInfo, {
          saveLoad: true,
        }),
      });
    case TYPES.DO_REFUND_SUCCESS:
      return assign({}, state, {
        refundInfo: assign({}, state.refundInfo, {
          saveLoad: false,
          data: {},
        }),
      });
    case TYPES.DO_REFUND_FAIL:
      return assign({}, state, {
        refundInfo: assign({}, state.refundInfo, {
          saveLoad: false,
        }),
      });
    case TYPES.REFUND_TXN_ID:
      return assign({}, state, {
        refundInfo: assign({}, state.refundInfo, {
          data: assign({}, state.refundInfo.data, {
            refund_txn_id: action.v,
          }),
        }),
      });
    case TYPES.SHOW_REVERSE_REFUND:
      return assign({}, state, {
        reverseRefund: assign({}, state.reverseRefund, {
          show: true,
          data: assign({}, state.reverseRefund.data, {
            record_id: Number(action.id),
          }),
        }),
      });
    case TYPES.REVERSE_REFUND:
      return assign({}, state, {
        reverseRefund: assign({}, state.reverseRefund, {
          data: assign({}, state.reverseRefund.data, {
            [action.key]: action.value,
          }),
        }),
      });
    case TYPES.REVERSE_REFUND_SAVE:
      return assign({}, state, {
        reverseRefund: assign({}, state.reverseRefund, {
          saveLoad: true,
        }),
      });
    case TYPES.REVERSE_REFUND_SAVE_FAIL:
      return assign({}, state, {
        reverseRefund: assign({}, state.reverseRefund, {
          saveLoad: false,
        }),
      });
    case TYPES.REVERSE_REFUND_SAVE_SUCCESS:
      return assign({}, state, {
        reverseRefund: assign({}, state.reverseRefund, {
          saveLoad: false,
          show: false,
          data: {},
        }),
      });
    case TYPES.CHANGE_ORDER:
      return assign({}, state, {
        changeOrderInfo: assign({}, state.changeOrderInfo, {
          show: true,
        }),
      });
    case TYPES.SAVE:
      return assign({}, state, {
        load: true,
      });
    case TYPES.COMMIT:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case TYPES.CANCELTHEREFUNDBILLSUCCESS:
      return _.merge({}, state, { dataSource: { refund_detail: { refund_status: lan.取消退款 } } }, { cancelTheRefundBill: { show: false } }, { cancelTheRefundBill: { load: false } });
    default:
      return state;
  }
};
