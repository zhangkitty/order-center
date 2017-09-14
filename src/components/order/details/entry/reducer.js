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
          action.data,
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
    default:
      return state;
  }
};
