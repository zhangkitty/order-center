/**
 * Create by liufeng on 2017/9/28
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
  listRefundRemark: '/OrderRefund/listRefundRemark', // 备注信息
  addRefundRemark: '/OrderRefund/addRefundRemark', // 新增备注
  rejectRefund: '/orderRefund/rejectRefund', // 驳回
  etOrderRefundRecord: '/OrderRefund/getOrderRefundRecord', // 退款记录信息
  doRefund: '/OrderRefund/doRefund', // 提交退款
  doRefundAgain: '/OrderRefund/doRefundAgain', // 重新退款
  doRefundPass: '/OrderRefund/doRefundPass', // 通过
}

// 获取所有搜索数据
export const initCountrySer = () => (
  fetch(list.initCountry, {
    method: 'GET',
  })
);

// 搜索
export const searchSubmit = (page) => {
  const keys = ['pageSize', 'pageNumber', 'refund_bill_id', 'billno', 'email', 'add_user', 'handle_user',
    'refund_bill_type', 'refund_bill_status', 'refund_path_id', 'refund_path_status', 'site_from', 'apply_start_time', 'apply_end_time',
    'country_id', 'member_level', 'refund_start_time', 'refund_end_time', 'sorting_rule'];
  return fetch(`${list.init}?${queryString(camel2Under(keys), camel2Under(page))}`, {
    method: 'GET',
  })
};

export const getRefundDetailsInfo = id => (
  fetch(`${details.getRefundBillDetail}?refund_bill_id=${id}`, {
    method: 'GET',
  })
)

export const remarkInfoSer = id => (
  fetch(details.listRefundRemark, {
    method: 'POST',
    body: JSON.stringify({ refund_bill_id: id })
  })
)

export const addRemarkInfoSer = (id, remark) => (
  fetch(details.addRefundRemark, {
    method: 'POST',
    body: JSON.stringify({ refund_bill_id: id, remark })
  })
)

export const rejectInfoSer = (id, reason) => (
  fetch(details.rejectRefund, {
    method: 'POST',
    body: JSON.stringify({ refund_id: id, reason })
  })
)
export const refundSer = id => (
  fetch(`${details.etOrderRefundRecord}?record_id=${id}`, {
    method: 'GET',
  })
);
export const doRefundSer = data => (
  fetch(details.doRefund, {
    method: 'POST',
    body: JSON.stringify(data)
  })
)
export const doRefundAgainSer = data => (
  fetch(details.doRefundAgain, {
    method: 'POST',
    body: JSON.stringify(data)
  })
)
export const doRefundPassSer = data => (
  fetch(details.doRefundPass, {
    method: 'POST',
    body: JSON.stringify(data)
  })
)
