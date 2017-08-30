/**
 * Create by liufeng on 2017/6/28
 */
import fetch from '../../lib/fetch';
import queryString from '../../lib/query-string';

const list = {
  init: '/skuDay/fetchSkuDaySumPage',    // 普通搜索
  initHigh: '/skuDay/fetchSkuDaySumPage',    // 普通搜索
  initCountry: '/Order/getCountry',   // 获取所有国家
  initSite: '/Site/getSite',   // 获取所有站点
  initPayment: '/Order/getPaymentMethod', // 获取支付方式列表
  initTrouble: '/Order/getTroubleType',    // 获取问题件类型列表
};

const diffRefund = {
    initReasonList: 'index_new.php/Home/Common/getOrderDiffRefundReasonList', //获取差价退款原因列表
    initPriceInfo: 'index_new.php/Home/Common/getOrderDiffRefundPriceInfo', //获取订单差价退款金额信息(查询)(接口负责人:周利宝)
    submitOrder: 'index_new.php/Home/Common/submitOrderDiffRefund'   //订单差价退款（提交）(接口负责人:周利宝)
}


export const searchSubmit = (page) => {
  const keys = ['paytimeStart', 'paytimeEnd', 'countryName', 'siteFrom'];
  return fetch(`${list.init}?${queryString(keys, page)}`, {
    method: 'GET',
  })
};

export const seachHighSubmit = (page) => {
  const keys = ['paytimeStart', 'paytimeEnd', 'countryName', 'siteFrom'];
  return fetch(`${list.initHigh}?${queryString(keys, page)}`, {
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





export const initReasonList = () =>{
    return fetch(`${diffRefund.initReasonList}`,{
        method: 'GET'
    })
}

export const initPriceInfo = (order_id)=>{
    return fetch(`${diffRefund.initPriceInfo}?${queryString(order_id)}`,{
        method: 'GET'
    })
}

export const submitOrder = data=>{
    return fetch(`${diffRefund.submitOrder}`,{
        method: 'POST',
        body:JSON.stringify(data),
    })
}


