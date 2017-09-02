/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import moment from 'moment';
import * as TYPES from './types';


const defaultState = {
  dataSource: [
    { order_id: '29464515',
      billno: 'ECCPP',
      goods_quantity: 20,
      goods_quantity_with_change: 20,
      email: 'wangke@dotfashion.cn',
      buy_cnt: '12',
      pay_time: '2017-08-23 19:20:12',
      site_from: 'ec',
      country_name: 'Germany',
      order_type: 1,
      remark_admin: ';Risk Verification, Do Not Ship (大金额待确认，不可发)',
      payment_method: 'worldpay',
      usd_price: '471.60',
      currency_price: '471.60',
      order_status: '1',
      is_trouble: '3',
      remark: ';Risk Verification, Do Not Ship (大金额待确认，不可发)',
      order_goods: [
        {
          order_goods_id: '41252120',
          order_goods_img: 'images/emmacloth.com/201508/1440729950889455716.jpg',
          goods_sn: 'skirt150819505',
          goods_attr: null,
          goods_status: '11',
          price: '22.39',
          is_replace: '0',
        }, {
          order_goods_id: '41252121',
          order_goods_img: 'images/emmacloth.com/201508/1440729950889455716.jpg',
          goods_sn: 'skirt150819504',
          goods_attr: null,
          goods_status: '11',
          price: '22.39',
          is_replace: '0',
        },
      ],
    }, { order_id: '29464516',
      billno: 'ECCPP',
      goods_quantity: 20,
      goods_quantity_with_change: 20,
      email: 'wangke@dotfashion.cn',
      buy_cnt: '12',
      pay_time: '2017-08-23 19:20:12',
      site_from: 'ec',
      country_name: 'Germany',
      order_type: 1,
      remark_admin: ';Risk Verification, Do Not Ship (大金额待确认，不可发)',
      payment_method: 'worldpay',
      usd_price: '471.60',
      currency_price: '471.60',
      order_status: '1',
      is_trouble: '3',
      remark: ';Risk Verification, Do Not Ship (大金额待确认，不可发)',
      order_goods: [
        {
          order_goods_id: '41252122',
          order_goods_img: 'images/emmacloth.com/201508/1440729950889455716.jpg',
          goods_sn: 'skirt150819503',
          goods_attr: null,
          goods_status: '11',
          price: '22.39',
          is_replace: '0',
        }, {
          order_goods_id: '41252123',
          order_goods_img: 'images/emmacloth.com/201508/1440729950889455716.jpg',
          goods_sn: 'skirt150819502',
          goods_attr: null,
          goods_status: '11',
          price: '22.39',
          is_replace: '0',
        },
      ],
    },
  ],
  // dataSource: [],
  fetchCountry: [],    // 国家
  fetchSite: [],  // 站点
  fetchPayment: [],    // 支付方式
  fetchTrouble: [],  // 问题件
  fetchMemberLevel: [],  // 会员等级
  fetchOrderStatus: [],    // 订单状态
  fetchCancelReason: [],  // 取消类型
  fetchGoodsStatus: [],  // 商品状态
  fetchOperation: [],  // 操作状态
  queryString: {
    pageSize: 10,
    pageNumber: 1,
    billno: null,    // 订单号
    orderId: null,   // 订单ID
    email: null,    //
    shippingNo: null,  // 发货号
    referenceNumber: null,    // 包裹号
    telephone: null,    // 手机号
    paytimeStart: moment(Date.now()).subtract(7, 'd').format('YYYY-MM-DD HH:mm:SS'),   // 付款时间
    paytimeEnd: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD HH:mm:SS'),          // 付款时间
    siteFrom: null,   // 站点
    countryName: null,   // 国家
    txnId: null,   // 付款流水号
    paymentMethod: null,   // 支付方式
    troubleType: null,   // 问题件类型-选中后显示标记人
    remarkUser: null,   // 标记人
    totalSelect: null,   // 美金金额比较符
    totalInput: null,   // 美金金额
    searchType: 0,   // 搜索类型
  },
  queryString2: {
    pageSize: 10,
    pageNumber: 1,
    paytimeStart: moment(Date.now()).subtract(7, 'd').format('YYYY-MM-DD HH:mm:SS'),   // 付款时间
    paytimeEnd: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD HH:mm:SS'),          // 付款时间
    siteFrom: null,   // 站点
    countryName: null,   // 国家
    paymentMethod: null,   // 支付方式
    troubleType: null,   // 问题件类型
    goodsSn: null,    // sku
    count: null,   // 有货件数
    memberLevel: null,    // 会员等级
    orderStatus: null,  // 订单状态 - 订单状态=“已取消”，显示 取消类型
    cancelReason: null,  // 取消类型
    goodsStatus: null,  // 商品状态  -选中订单状态，显示 商品状态
    handleTimeStart: moment(Date.now()).subtract(7, 'd').format('YYYY-MM-DD HH:mm:SS'),   // 商品状态更新时间
    handleTimeEnd: moment(Date.now()).add(1, 'd').format('YYYY-MM-DD HH:mm:SS'),          // 商品状态更新时间
    searchType: 1,  // 搜索类型
  },
  clickVisible: false,
  visible: false,   // add
  load: false,
  loadUpdata: false,
  total: 0,
};
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
    case TYPES.CHANGE:
      return assign({}, state, {
        [action.key]: action.val,
      });
    case TYPES.OPEN_MODAL:
      return assign({}, state, {
        clickVisible: false,
        visible: true,
      //  loadUpdata: false,
      });
    case TYPES.SEARCH:
      return assign({}, state, {
        queryString: action.data,
        load: true,
      });
    case TYPES.SEARCH_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.SEARCH_SUCCESS:
      return assign({}, state, {
        // dataSource: action.data.data.map((v, i) => assign({}, v, { key: i })),
        dataSource: action.data.data,
        total: action.data.total,   // TODO
        load: false,
      });
    case TYPES.INIT_COUNTRY:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_COUNTRY_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_COUNTRY_SUCCESS:
      return assign({}, state, {
        fetchCountry: action.data.data,
        load: false,
      });
    case TYPES.INIT_SITE:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_SITE_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_SITE_SUCCESS:
      return assign({}, state, {
        fetchSite: action.data.data,
        load: false,
      });
    case TYPES.INIT_PAYMENT:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_PAYMENT_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_PAYMENT_SUCCESS:
      return assign({}, state, {
        fetchPayment: action.data.data,
        load: false,
      });
    case TYPES.INIT_TROUBLE:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_TROUBLE_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_TROUBLE_SUCCESS:
      return assign({}, state, {
        fetchTrouble: action.data.data,
        load: false,
      });
    case TYPES.INIT_MEMBER:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_MEMBER_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_MEMBER_SUCCESS:
      return assign({}, state, {
        fetchMemberLevel: action.data.data,
        load: false,
      });
    case TYPES.INIT_ORDER:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_ORDER_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_ORDER_SUCCESS:
      return assign({}, state, {
        fetchOrderStatus: action.data.data,
        load: false,
      });
    case TYPES.INIT_CANCEL:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_CANCEL_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_CANCEL_SUCCESS:
      return assign({}, state, {
        fetchCancelReason: action.data.data,
        load: false,
      });
    case TYPES.INIT_GOODS:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_GOODS_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_GOODS_SUCCESS:
      return assign({}, state, {
        fetchGoodsStatus: action.data.data,
        load: false,
      });
    case TYPES.OPERATION_GOODS:
      return assign({}, state, {
        load: true,
      });
    case TYPES.OPERATION_GOODS_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.OPERATION_GOODS_SUCCESS:
      return assign({}, state, {
        fetchOperation: action.data.data,
        load: false,
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
    case TYPES.REMARK_SAVE_SUCCESS:
      return assign({}, state, {
        visible: false,
        loadUpdata: false,
      });
    default:
      return state;
  }
};

export default reducer;

