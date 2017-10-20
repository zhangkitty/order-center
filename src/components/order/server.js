/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import fetch from '../../lib/fetch';
import { camel2Under, under2Camal } from '../../lib/camal';
import queryString from '../../lib/query-string';

// 订单列表
const list = {
  init: '/Order/orderList',    // 普通搜索
  initHigh: '/Order/orderListAdv',    // 高级搜索
  // initCountry: '/Order/getCountry',   // 获取所有国家 // 废弃
  // initSite: '/Site/getSite',   // 获取所有站点 // 废弃
  // initPayment: '/Order/getPaymentMethod', // 获取支付方式列表 // 废弃
  // initTrouble: '/Order/getTroubleType',    // 获取问题件类型列表 // 废弃
  // initMember: '/Order/getMemberLevel',    // 会员等级列表 // 废弃
  // initOrder: '/Order/getOrderStatusType',    // 订单状态 - // 废弃
  // initCance: '/Order/getCancelType',    // 取消类型列表 -- // 废弃
  // initGoods: '/Order/getOrderGoodsStatusType',    // 商品状态列表-- // 废弃
  initData: '/Order/getSearchConfig',    // 初始化数据
  operationGoods: '/Order/getOrderGoodsOperate',  // 商品操作查询
  orderRemark: '/order/remark',  // 备注查询
  orderSaveRemark: '/order/saveRemark',  // 添加备注
  logisticsRemark: '/order/logisticsRemark',  // 物流备注查询
  logisticsRemarkSave: '/order/saveLogisticsRemark',  // 添加物流备注
  sizeBySku: '/order/listAvailabeGoodsSizeBySku',  // sku查尺码
  chageGoods: '/order/exchageOrderGoods',  // 换货
  delGoods: '/order/delExchagedOrderGoods',  // 删除换货
  getRisk: '/order/riskReason',  // 风控订单 备注
  cancelTroubleTag: '/order/tag',  // 订单标记 更新，取消

};

// 差价退款
const diffRefund = {
  initReasonList: '/OrderRefund/getRefundReason', //获取差价退款原因列表
  initPriceInfo: '/OrderDiffRefund/getOrderDiffRefundPriceInfo', //获取订单差价退款金额信息(查询)(接口负责人:周利宝)
  submitOrder: '/OrderRefund/applyDiffRefund'   //订单差价退款（提交）(接口负责人:刘梓友)
}

// 商品退款 + 商品取消
const goodsRefund = {
  getData: '/OrderRefund/getRefundInfo',
  getReason: '/OrderRefund/getRefundReason',
  submit: '/OrderRefund/submit',
  newSubmit: '/OrderRefund/applyOrderGoodsRefund',
  cancelSubmit: '/OrderRefund/applyCancelCodRefund',
};

export const searchSubmit = (page) => {
  const keys = ['pageSize', 'pageNumber', 'billno', 'orderId', 'email', 'shippingNo', 'referenceNumber', 'telephone', 'siteFrom', 'countryName', 'paytimeStart', 'paytimeEnd', 'txnId', 'paymentMethod', 'troubleType', 'trouble_user', 'totalSelect', 'totalInput'];
  return fetch(`${list.init}?${queryString(camel2Under(keys), camel2Under(page))}`, {
    method: 'GET',
  })
};

export const seachHighSubmit = (page) => {
  const keys = ['pageSize', 'pageNumber','paytimeStart', 'paytimeEnd', 'siteFrom', 'countryName', 'paymentMethod', 'troubleType', 'goodsSn', 'yoho_count', 'memberLevel', 'orderStatus', 'cancelReason', 'goodsStatus', 'handleTimeStart', 'handleTimeEnd',];
  return fetch(`${list.initHigh}?${queryString(camel2Under(keys), camel2Under(page))}`, {
    method: 'GET',
  })
};

// history order
export const seachHistorySubmit = (page) => {
  const keys = ['pageSize', 'pageNumber', 'siteFrom', 'memberId'];
  return fetch(`${list.init}?${queryString(camel2Under(keys), camel2Under(page))}`, {
    method: 'GET',
  })
};

// 初始化数据
export const initDataSer = () => (
  fetch(list.initData, {
    method: 'GET',
  })
);


// 商品操作查询
export const operationGoodsSer = id => (
  fetch(`${list.operationGoods}?order_goods_id=${id}`, {
    method: 'GET',
  })
);

// 订单备注-查看
export const remarkSer = id => {
//  const keys = ['order_id'];
  return fetch(`${list.orderRemark}?order_id=${id}`, {
    method: 'GET',
  })
};

// 订单备注-更新
export const remarkSaveSer = (orderId, remark) => (
  fetch(list.orderSaveRemark, {
    method: 'POST',
    body: JSON.stringify(camel2Under({
      orderId , remark
    })),
  })
);


// 物流备注-查看
export const logisticsRemarkSer = id => {
  const keys = ['order_id'];
  return fetch(`${list.logisticsRemark}?order_id=${id}`, {
    method: 'GET',
  })
};

// 物流备注-更新
export const logisticsRemarkSaveSer = (orderId, remark) => (
  fetch(list.logisticsRemarkSave, {
    method: 'POST',
    body: JSON.stringify(camel2Under({
      orderId , remark
    })),
  })
);

// 产品尺码-查
export const goodSizeSer = (data) => (
  fetch(list.sizeBySku, {
    method: 'POST',
    body: JSON.stringify(assign({}, data, {
      order_id: Symbol('noneed'),
      load: Symbol('noneed'),
      visible: Symbol('noneed'),
    })),
  })
);

// 换货
export const changeGoodsSer = (data) => (
  fetch(list.chageGoods, {
    method: 'POST',
    body: JSON.stringify(assign({}, data, {
      site_from: Symbol('noneed'),
      load: Symbol('noneed'),
      visible: Symbol('noneed'),
    })),
  })
);

// delGoods
export const delChangeSer = (oid, gid) => (
  fetch(list.delGoods, {
    method: 'POST',
    body: JSON.stringify({ order_id: Number(oid), order_goods_id: Number(gid)}),
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
    }).then(under2Camal)
}

export const submitOrder = data =>(
  fetch(`${diffRefund.submitOrder}`,{
        method: 'POST',
        body:JSON.stringify(camel2Under(data)),
    })
)
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
  fetch(goodsRefund.newSubmit, {
    method: 'POST',
    body: JSON.stringify(d),
  })
);
export const cancelRefundSubmit = d => (
  fetch(goodsRefund.cancelSubmit, {
    method: 'POST',
    body: JSON.stringify(camel2Under(d)),
  })
);

// 批量操作
export const batchOperateSer = (url, data) => (
  fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  })
);
export const getRisk = (order_id) => (
  fetch(`${list.getRisk}?order_id=${order_id}`, {
    method: 'get',
  })
);
export const cancelTroubleTag = (tid, oid) => (
  fetch(list.cancelTroubleTag, {
    method: 'POST',
    body: JSON.stringify({ order_id: oid, is_trouble: Number(tid), type: 2 })
  })
);
export const updateOrderTagSer = (data) => (
  fetch(list.cancelTroubleTag, {
    method: 'POST',
    body: JSON.stringify(assign({}, data, { type: 1, markTagVisible: Symbol('no') }))
  })
);

// 批量审核
export const batchCheckSer = (url, data) => (
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
);

// 批量平台取消
export const batchDeleteSer = (url, data) => (
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
);

// 批量部分发
export const batchPartSer = (url, data) => (
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
);
