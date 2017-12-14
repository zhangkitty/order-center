import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  ready: false,
  tabsLoad: false,
  orderId: '',
  billno: '',
  activeKey: 'base',
  emailShow: false,
  warehouseShow: false,
  profitLoad: false,
  profit: '',
  warehouse: 0,
  partSendBtn: false,
  rlLoading: false,
  rlmodal: false,
  preSend: 0,
  dataSource: {
    base: {}, // 基本
    pay: {}, // 支付信息
    refund: {}, // 退款信息
    orderReturn: {},  // 退货信息
    logs: {}, // 订单日志
  },
  backReturnDate: {
    show: false,
    ready: false,
  },
  chooseGoods: [],
  uploadTrack: {
    show: false,
    order_id: '', // 订单id
    return_no: '', // 退货单号
    channel: '', // 物流渠道
    check_type: '', // 退单类型1:运单号2:凭证
    check_value: '',
    img: '',
  },
  returnEmail: '',
  rlFee: null,
  reFeeValue: 0,
  modal_return_order_id: null,
  confirmLoading: false,
  operationVisible: false,  // 操作查询
  clickVisible: false,
  visible: false,   // add
  load: false,
  loadUpdata: false,
  fetchOperation: [],  // 操作状态
  remarkModal: {   // 备注
    order_goods_id: '',
    remark: '',
  },
  changeDisabled: true,  // 换货按钮状态
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.GET_INFO:
      return assign({}, state, {
        tabsLoad: true,
      });
    case TYPES.GET_INFO_SUCCESS:
      return assign({}, state, {
        ready: true,
        tabsLoad: false,
        dataSource: assign({}, state.dataSource, {
          [action.key]: action.data || {},
        }),
        profit: '',
        profitShow: false,
      });
    case TYPES.UPDATE_EAMIL_SUCCESS:
      return assign({}, state, {
        emailShow: false,
        dataSource: assign({}, state.dataSource, {
          base: assign({}, state.dataSource.base, {
            order_info: assign({}, state.dataSource.base.order_info, {
              shipping_address: assign({}, state.dataSource.base.order_info.shipping_address, {
                email: action.data,
              }),
            }),
          }),
        }),
      });
    case TYPES.UPLOAD_TRACK_SHOW:
      return assign({}, state, {
        uploadTrack: {
          show: true,
          order_id: action.order_id,
          return_no: action.return_no,
          channel: '',
          check_type: '',
          shipping_no: '',
          return_img: '',
        },
      });
    case TYPES.BACK_GOODS_DATES:
      return assign({}, state, {
        backReturnDate: assign({}, state.backReturnDate, {
          show: true,
          ready: true,
        }),
      });
    case TYPES.BACK_GOODS_DATES_SUCCESS:
      return assign({}, state, {
        backReturnDate: assign({}, state.backReturnDate, {
          ready: false,
        },
          action.data.return_status ? action.data : { return_status_name: action.data },
          ),
      });
    case TYPES.EXAMINE_SUCCESS:
      return assign({}, state, {
        emailShow: false,
        dataSource: assign({}, state.dataSource, {
          base: assign({}, state.dataSource.base, {
            button_list: assign({}, state.dataSource.base.button_list, {
              show_review_order_button: 0,
            }),
          }),
        }),
      });
    case TYPES.PROFIT_SHOW:
      return assign({}, state, {
        profitLoad: true,
      });
    case TYPES.COMMIT:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case TYPES.OPEN_MODAL:  // add remark
      return assign({}, state, {
        // clickVisible: false,
        visible: true,
        remarkModal: {
          order_id: action.orderId,
          remark: '',
        },
      });
    case TYPES.REMARK:
      return assign({}, state, {
        load: true,
      });
    case TYPES.REMARK_SUCCESS:
      return assign({}, state, {
        fetchRemark: action.data.data || [],
        clickVisible: true,
        load: false,
      });
    case TYPES.REMARK_SAVE:
      return assign({}, state, {
        loadUpdata: true,
      });
    case TYPES.REMARK_SAVE_SUCCESS:  // 备注更新成功，备注状态改为 1
      return merge({}, state, {
        visible: false,
        loadUpdata: false,
        dataSource: merge({},
          state.dataSource, { base: { order_info: { basic_info: { have_remark: 1 } } } },
        ),
      });
    case TYPES.OPERATION_GOODS:
      return assign({}, state, {
        load: true,
        operationVisible: false,
      });
    case TYPES.OPERATION_GOODS_SUCCESS:
      return assign({}, state, {
        fetchOperation: action.data.data || [],
        load: false,
        operationVisible: true,
      });
    default:
      return state;
  }
};
