/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import fetch from '../../lib/fetch';
import { camel2Under, under2Camal } from '../../lib/camal';
import queryString from '../../lib/query-string';

const list = {
  initCountry: '/OrderDiffRefund/refundBillSearch',   // 获取所有搜索数据
  init: '/OrderDiffRefund/submitRefundBillSearch',    // 搜索提交
};
const details = {
  getRefundBillDetail: '/OrderRefund/getRefundBillDetail', // get info
}

// 获取所有搜索数据
export const initCountrySer = () => (
  fetch(list.initCountry, {
    method: 'GET',
  })
);

// 搜索
export const searchSubmit = (page) => {
  const keys = ['pageSize', 'pageNumber', 'billno', 'orderId', 'email', 'shippingNo', 'referenceNumber', 'telephone', 'siteFrom', 'countryName', 'paytimeStart', 'paytimeEnd', 'txnId', 'paymentMethod', 'troubleType', 'remarkUser', 'totalSelect', 'totalInput'];
  return fetch(`${list.init}?${camel2Under(queryString(keys, page))}`, {
    method: 'GET',
  })
};

export const getRefundDetailsInfo = id => (
  fetch(`${details.getRefundBillDetail}?refund_bill_id=${id}`, {
    method: 'GET',
  })
)