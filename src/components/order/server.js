/**
 * Create by liufeng on 2017/6/28
 */
import fetch from '../../lib/fetch';
import { camel2Under } from '../../lib/camal';
import queryString from '../../lib/query-string';

const list = {
  init: '/Order/orderList',    // 普通搜索
  initHigh: '/Order/orderListAdv',    // 高级搜索
  initCountry: '/Order/getCountry',   // 获取所有国家
  initSite: '/Site/getSite',   // 获取所有站点
  initPayment: '/Order/getPaymentMethod', // 获取支付方式列表
  initTrouble: '/Order/getTroubleType',    // 获取问题件类型列表
  initMember: '/Order/getMemberLevel',    // 会员等级列表
  initOrder: '/Order/getOrderStatusType',    // 订单状态 -
  initCance: '/Order/getCancelType',    // 取消类型列表 --
  initGoods: '/Order/getOrderGoodsStatusType',    // 商品状态列表--
};

const diffRefund = {
  initReasonList: '/OrderRefund/getRefundReason', //获取差价退款原因列表
  initPriceInfo: '/OrderDiffRefund/getOrderDiffRefundPriceInfo', //获取订单差价退款金额信息(查询)(接口负责人:周利宝)
  submitOrder: '/OrderDiffRefund/submitOrderDiffRefund'   //订单差价退款（提交）(接口负责人:周利宝)
}

const goodsRefund = {
  getData: '/OrderRefund/getRefundInfo',
  getReason: '/OrderRefund/getRefundReason',
  submit: '/OrderRefund/submit',
};

export const searchSubmit = (page) => {
  const keys = ['pageSize', 'pageNumber', 'billno', 'orderId', 'email', 'shippingNo', 'referenceNumber', 'telephone', 'siteFrom', 'countryName', 'paytimeStart', 'paytimeEnd', 'txnId', 'paymentMethod', 'troubleType', 'remarkUser', 'totalSelect', 'totalInput', 'searchType'];
  return fetch(`${list.init}?${queryString(camel2Under(keys), page)}`, {
    method: 'GET',
  })
};

export const seachHighSubmit = (page) => {
  const keys = ['pageSize', 'pageNumber','paytimeStart', 'paytimeEnd', 'siteFrom', 'countryName', 'paymentMethod', 'troubleType', 'goodsSn', 'count', 'memberLevel', 'orderStatus', 'cancelReason', 'goodsStatus', 'handleTimeStart', 'handleTimeEnd', 'searchType'];
  return fetch(`${list.initHigh}?${queryString(camel2Under(keys), page)}`, {
    method: 'GET',
  })
};

export const initCountrySer = () => (
  fetch(list.initCountry, {
    method: 'GET',
  })
);

export const initSiteSer = () => (
  fetch(list.initSite, {
    method: 'GET',
  })
);

export const initPaymentSer = () => (
  fetch(list.initPayment, {
    method: 'GET',
  })
);

export const initTroubleSer = () => (
  fetch(list.initTrouble, {
    method: 'GET',
  })
);

// 会员等级
export const initMemberSer = () => (
  fetch(list.initMember, {
    method: 'GET',
  })
);
// 订单状态
export const initOrderSer = () => (
  fetch(list.initOrder, {
    method: 'GET',
  })
);
// 取消类型
export const initCancelSer = () => (
  fetch(list.initCance, {
    method: 'GET',
  })
);
// 商品状态
export const initGoodsSer = () => (
  fetch(list.initGoods, {
    method: 'GET',
  })
);




export const initReasonList = (data) =>{
    return fetch(`${diffRefund.initReasonList}?type=${data.type}`,{
        method: 'GET'
    })
}

export const initPriceInfo = (data)=>{
    return fetch(`${diffRefund.initPriceInfo}?order_id=${data.order_id}`,{
        method: 'GET'
    })
}

export const submitOrder = data=>{
  console.log(data)
  console.log('==========')
  console.log(JSON.stringify(data))
    return fetch(`${diffRefund.submitOrder}`,{
        method: 'POST',
        body:JSON.stringify(data),
    })
}
export const getDataSer = (orderId, goodsId) => (
  fetch(`${goodsRefund.getData}?order_id=${orderId}&goods_id=${goodsId}`,{
    method: 'GET',
  })
);
export const getReasonSer = (type) => (
  fetch(`${goodsRefund.getReason}?type=${type}`, {
    method: 'GET',
  })
);

export const goodsRefundSubmit = d => (
  fetch(goodsRefund.submit, {
    method: 'POST',
    body: JSON.stringify(camel2Under(d)),
  })
);

