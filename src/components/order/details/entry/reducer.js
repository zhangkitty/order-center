import merge from 'lodash.merge';
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
  operationVisible: false,  // 操作查询
  clickVisible: false,
  visible: false,   // add
  logisticsVisible: false,  // 物流备注
  load: false,
  loadUpdata: false,
  remarkModal: {
    order_goods_id: '',
    remark: '',
  },
  exchange: {
    goods_sn: '',   // sku
    site_from: '',    // 站点
    order_goods_id: '',  // 订单商品id（被换）
    order_id: '',      // 订单id
    goods_size: '', // 新商品 size
    load: false,
    visible: false,
  },
  markTag: {},
  changeDisabled: true,  // 换货按钮状态
};

const cgsReducer = (dataSource, orderId, result) => {
  const index = dataSource.findIndex(v => Number(v.order_id) === Number(orderId));
  return [
    ...dataSource.slice(0, index),
    assign({}, dataSource[index], {
      order_goods: [
        ...dataSource[index].order_goods.map(v => (
          v.order_goods_sort === result.replace_goods_sort ?
            assign({}, v, { is_replace: 1 }) : v
        )),
        result,
      ],
    }),
    ...dataSource.slice(index + 1),
  ];
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
    // case TYPES.REMARK_FAIL:
    //   return assign({}, state, {
    //     load: false,
    //     clickVisible: true,
    //   });
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
    // case TYPES.REMARK_SAVE_FAIL:
    //   return assign({}, state, {
    //     visible: false,
    //     loadUpdata: false,
    //   });
    case TYPES.REMARK_SAVE_SUCCESS:  // 备注更新成功，备注状态改为 1
      return merge({}, state, {
        visible: false,
        loadUpdata: false,
        dataSource: merge({}, state.dataSource, { base: { order_info: { basic_info: { have_remark: 2 } } } }),
      });
    case TYPES.OPEN_MODAL_CGS:
      return assign({}, state, {
        exchange: {
          goods_sn: action.goods_sn,
          site_from: action.siteFrom,
          order_goods_id: action.goodsId,
          order_id: action.orderId,
          load: false,
          visible: true,
        },
        fetchgoodSize: [],
        changeDisabled: true,
      });
    case TYPES.GOODS_SIZE:
      return assign({}, state, {
        exchange: {
          goods_sn: action.data.goods_sn,
          site_from: action.data.site_from,
          order_goods_id: action.data.order_goods_id,
          order_id: action.data.order_id,
          load: false,
          visible: true,
        },
      });
    // case TYPES.GOODS_SIZE_FAIL:
    //   return assign({}, state, {
    //     load: false,
    //   });
    case TYPES.GOODS_SIZE_SUCCESS:
      return assign({}, state, {
        fetchgoodSize: action.data.data,
        changeDisabled: false,
      });
    case TYPES.CHANGE_GOODS:
      return assign({}, state, {
        exchange: {
          goods_sn: action.data.goods_sn,
          site_from: action.data.site_from,
          order_goods_id: action.data.order_goods_id,
          order_id: action.data.order_id,
          goods_size: action.data.goods_size,
          load: true,
          visible: true,
        },
      });
    // case TYPES.CHANGE_GOODS_FAIL:
    //   return assign({}, state, {
    //     exchange: assign({}, state.exchange, {
    //       load: false,
    //       visible: true,
    //     }),
    //   });
    case TYPES.CHANGE_GOODS_SUCCESS:
      return assign({}, state, {
        dataSource: cgsReducer(state.dataSource, action.orderId, action.data.data),
        exchange: assign({}, state.exchange, {
          load: false,
          visible: false,
        }),
      });
    default:
      return state;
  }
};
