/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import moment from 'moment';
import * as TYPES from './types';


const defaultState = {
  batchChooseOrder: [],
  batchChooseGoods: [],
  fetchgoodSize: [],
  dataSource: [],
  fetchCountry: [],    // 国家
  fetchSite: [],  // 站点
  fetchPayment: [],    // 支付方式
  fetchTrouble: [],  // 问题件
  fetchMemberLevel: [],  // 会员等级
  fetchOrderStatus: [],    // 订单状态
  fetchCancelReason: [],  // 取消类型
  fetchGoodsStatus: [],  // 商品状态
  fetchOperation: [],  // 操作状态
  fetchRemark: [], // 备注
  fetchLogisticsRemark: '', // 物流备注
  queryString: {
    pageSize: 10,
    pageNumber: 1,
    billno: null,    // 订单号
    orderId: null,   // 订单ID
    email: null,    //
    shippingNo: null,  // 发货号
    referenceNumber: null,    // 包裹号
    telephone: null,    // 手机号
    paytimeStart: moment(Date.now()).subtract(7, 'd').format('YYYY-MM-DD'),   // 付款时间
    paytimeEnd: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD'),          // 付款时间
    siteFrom: null,   // 站点
    countryName: null,   // 国家
    txnId: null,   // 付款流水号
    paymentMethod: null,   // 支付方式
    troubleType: null,   // 问题件类型-选中后显示标记人
    trouble_user: null,   // 标记人
    totalSelect: null,   // 美金金额比较符
    totalInput: null,   // 美金金额
  },
  searchType: 0,
  queryString2: {
    pageSize: 10,
    pageNumber: 1,
    paytimeStart2: moment(Date.now()).subtract(7, 'd').format('YYYY-MM-DD'),   // 付款时间
    paytimeEnd2: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD'),          // 付款时间
    siteFrom2: null,   // 站点
    countryName2: null,   // 国家
    paymentMethod2: null,   // 支付方式
    troubleType2: null,   // 问题件类型
    goodsSn: null,    // sku
    yoho_count: null,   // 有货件数
    memberLevel: null,    // 会员等级
    orderStatus: null,  // 订单状态 - 订单状态=“已取消”，显示 取消类型
    cancelReason: null,  // 取消类型
    goodsStatus: null,  // 商品状态  -选中订单状态，显示 商品状态
    handleTimeStart: null,   // 商品状态更新时间
    handleTimeEnd: null,          // 商品状态更新时间
  },
  queryString3: {   // 历史订单
    pageSize: 10,
    pageNumber: 1,
    siteFrom: null,   // 站点
    memberId: null,    // 会员等级
  },
  searchLoad: false,
  operationVisible: false,  // 操作查询
  clickVisible: false,
  visible: false,   // add
  logisticsVisible: false,  // 物流备注
  load: false,
  loadUpdata: false,
  total: 0,
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
};
const cgsReducer = (dataSource, orderId, result) => {
  const index = dataSource.findIndex(v => v.order_id === orderId);
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
const delChange = (data, oid, gid, sort) => data.map((v) => {
  if (v.order_id === oid) {
    const flag = v.order_goods
      .filter(r => r.replace_goods_sort === sort && r.order_goods_id !== gid)
      .filter(r => Number(r.goods_status) !== 74)
      .length;
    return assign({}, v, {
      order_goods: v.order_goods
        .map((d) => {
          if (d.order_goods_id === gid) {
            return assign({}, d, { goods_status: 74, is_replace: 3 });  // 删除换货，商品的状态
          }
          if (!flag && d.order_goods_sort === sort) {
            return assign({}, d, { is_replace: 0 }); // 被换全部删除后，改原商品状态
          }
          return d;
        }),
    });
  }
  return v;
});
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.COMMIT:
      return assign({}, state, {
        queryString: assign({}, state.queryString, {
          [action.key]: action.val,
        }),
      });
    case TYPES.COMMIT_HIGH:
      return assign({}, state, {
        queryString2: assign({}, state.queryString2, {
          [action.key]: action.val,
        }),
      });
    case TYPES.COMMIT3:
      return assign({}, state, {
        exchange: assign({}, state.exchange, {
          [action.key]: action.val,
        }),
      });
    case TYPES.CHANGE:
      return assign({}, state, {
        [action.key]: action.val,
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
    case TYPES.SEARCH:
      return assign({}, state, {
        queryString: action.data,
        searchLoad: true,
        searchType: 0,
      });
    case TYPES.SEARCH_FAIL:
      return assign({}, state, {
        searchLoad: false,
      });
    case TYPES.SEARCH_SUCCESS:
      return assign({}, state, {
        // dataSource: action.data.data.map((v, i) => assign({}, v, { key: i })),
        dataSource: action.data.data,
        total: action.data.total,
        searchLoad: false,
      });
    case TYPES.SEARCH_HIGH:
      return assign({}, state, {
        queryString2: action.data,
        searchLoad: true,
        searchType: 1,
      });
    case TYPES.SEARCH_HIGH_FAIL:
      return assign({}, state, {
        searchLoad: false,
      });
    case TYPES.SEARCH_HIGH_SUCCESS:
      return assign({}, state, {
        dataSource: action.data.data,
        total: action.data.total,
        searchLoad: false,
      });
    case TYPES.SEARCH_HISTORY:
      return assign({}, state, {
        queryString3: action.data,
        searchLoad: true,
        searchType: 2,
      });
    case TYPES.SEARCH_HISTORY_FAIL:
      return assign({}, state, {
        searchLoad: false,
      });
    case TYPES.SEARCH_HISTORY_SUCCESS:
      return assign({}, state, {
        dataSource: action.data.data,
        total: action.data.total,
        searchLoad: false,
      });
    case TYPES.INIT_DATA:   // 初始化数据
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_DATA_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_DATA_SUCCESS:
      return assign({}, state, {
        fetchCountry: action.data.data.country, // 国家
        fetchSite: action.data.data.site,   // 站点
        fetchPayment: action.data.data.payment_method,  // 支付方式
        fetchTrouble: action.data.data.trouble_type,  // 问题件类型
        fetchMemberLevel: action.data.data.member_level,  // 会员等级
        fetchOrderStatus: action.data.data.order_status, // 订单状态
        fetchCancelReason: action.data.data.cancel_type, // 取消类型
        fetchGoodsStatus: action.data.data.order_goods_status,   // 商品状态
        load: false,
      });
    case TYPES.OPERATION_GOODS:
      return assign({}, state, {
        load: true,
        operationVisible: false,
      });
    case TYPES.OPERATION_GOODS_FAIL:
      return assign({}, state, {
        load: false,
        operationVisible: true,
      });
    case TYPES.OPERATION_GOODS_SUCCESS:
      return assign({}, state, {
        fetchOperation: action.data.data,
        load: false,
        operationVisible: true,
      });
    case TYPES.REMARK:
      return assign({}, state, {
        load: true,
      });
    case TYPES.REMARK_FAIL:
      return assign({}, state, {
        load: false,
        clickVisible: true,
      });
    case TYPES.REMARK_SUCCESS:
      return assign({}, state, {
        fetchRemark: action.data.data,
        clickVisible: true,
        load: false,
      });
    case TYPES.REMARK_SAVE:
      return assign({}, state, {
        loadUpdata: true,
      });
    case TYPES.REMARK_SAVE_FAIL:
      return assign({}, state, {
        visible: false,
        loadUpdata: false,
      });
    case TYPES.REMARK_SAVE_SUCCESS:  // 备注更新成功，备注状态改为 1
      return assign({}, state, {
        visible: false,
        loadUpdata: false,
        dataSource: state.dataSource.map(v => (
          v.order_id === action.data.orderId ?
            assign({}, v, {
              // transhRemark: action.mark,
              have_remark: 1,
            }) : v
        )),
      });
    case TYPES.LOGISITICS_REMARK:
      return assign({}, state, {
        load: true,
      });
    case TYPES.LOGISITICS_REMARK_FAIL:
      return assign({}, state, {
        load: false,
        logisticsVisible: true,
      });
    case TYPES.LOGISITICS_REMARK_SUCCESS:  // 物流备注查看
      return assign({}, state, {
        fetchLogisticsRemark: action.data,
        logisticsVisible: true,
        load: false,
        dataSource: state.dataSource.map(v => (
          v.order_id === action.id ?
            assign({}, v, { transhRemark: action.data }) : v
        )),
      });
    case TYPES.LOGISITICS_REMARK_SAVE:
      return assign({}, state, {
        // loadUpdata: true,
      });
    case TYPES.LOGISITICS_REMARK_SAVE_FAIL:
      return assign({}, state, {
        // loadUpdata: false,
      });
    case TYPES.LOGISITICS_REMARK_SAVE_SUCCESS:   // 物流备注更新成功
      return assign({}, state, {
        // logisticsVisible: false,
        // loadUpdata: false,
        dataSource: state.dataSource.map(v => (
          v.order_id === action.data.orderId ?
            assign({}, v, {
              transhRemark: action.data.mark,
              have_remark: 1,
              have_remark_admin: 1,
            }) : v
        )),
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
    case TYPES.GOODS_SIZE_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.GOODS_SIZE_SUCCESS:
      return assign({}, state, {
        fetchgoodSize: action.data.data,
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
    case TYPES.CHANGE_GOODS_FAIL:
      return assign({}, state, {
        exchange: assign({}, state.exchange, {
          load: false,
          visible: true,
        }),
      });
    case TYPES.CHANGE_GOODS_SUCCESS:
      return assign({}, state, {
        dataSource: cgsReducer(state.dataSource, action.orderId, action.data.data),
        exchange: assign({}, state.exchange, {
          load: false,
          visible: false,
        }),
      });
    case TYPES.CANCEL_RISK_SUCCESS:
      return assign({}, state, {
        dataSource: state.dataSource.map(v => (
          v.order_id === action.id ? assign({}, v, { cancelRiskDesc: action.data }) : v
        )),
      });
    case TYPES.CANCEL_TROUBLE_TAG_SUCCESS:
      return assign({}, state, {
        dataSource: state.dataSource.map(v => (
          v.order_id === action.oid ? assign({}, v, { is_trouble: 0 }) : v
        )),
      });
    case TYPES.MARK_TAG:
      return assign({}, state, {
        markTag: {
          order_id: action.oid,
          markTagVisible: true,
        },
      });
    case TYPES.UPDATE_ORDER_TAG_SUCCESS:    // 标记问题件更新成功，备注(have_remark) 状态 改为1
      return assign({}, state, {
        dataSource: state.dataSource.map(v => (
          v.order_id === action.data.order_id ?
            assign({}, v, {
              is_trouble: action.data.is_trouble,
              have_remark: 1,
            }) : v
        )),
        markTag: assign({}, state.markTag, { markTagVisible: false }),
      });
    case TYPES.DEL_CHANGE:
      return state;
    case TYPES.DEL_CHANGE_FAIL:
      return state;
    case TYPES.DEL_CHANGE_SUCCESS:
      return assign({}, state, {
        dataSource: delChange(state.dataSource, action.oid, action.gid, action.sort),
      });
    case TYPES.BATCH_CHECK_SUCCESS:    // 批量审核
      return assign({}, state, {
        dataSource: state.dataSource.map(v => {
          if (action.data.order_ids.indexOf(v.order_id) > -1) {
            return assign({}, v, {
              order_status_title: '已审核',
              order_status: '2',
            });
          } else {
            return v;
          }
        }),
      });
    case TYPES.BATCH_DELETE_SUCCESS:    // 批量平台取消,删除订单
      return assign({}, state, {
        dataSource: state.dataSource.filter(v => {
          return action.data.order_ids.indexOf(v.order_id) < 0; // 删除订单
        }),
      });
    case TYPES.BATCH_PART_SUCCESS:    // 批量部分发
      return assign({}, state, {
        dataSource: state.dataSource.map(v => {
          if (action.data.order_ids.indexOf(v.order_id) > -1) {
            return assign({}, v, {
              order_status_title: '部分发货',
              order_status: '4',
            });
          } else {
            return v;
          }
        }),
      });
    default:
      return state;
  }
};
export default reducer;

