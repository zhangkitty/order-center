/**
 * Create by liufeng on 2017/9/28
 */
import fetch from "../../lib/fetch";
import {camel2Under} from "../../lib/camal";
import queryString from "../../lib/query-string";
import { parseQuery } from "../../lib/query-string";


const list = {
  initCountry: '/OrderReturn/getOrderReturnSearchConfig',   // 获取所有搜索数据
  init: '/OrderReturn/getOrderReturnList',    // 搜索提交
  export: '/OrderReturn/excelOrderReturn',    // 导出
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
  const keys = ['page_size', 'page_number','shipping_type',
    'return_order_id', 'order_no', 'email', 'tracking_no', 'good_sn', 'source_site', 'insurance_states', 'trouble_state','sort_by',
    'return_order_status', 'refund_status', 'shipping_status', 'order_type', 'receiver_country', 'return_label_type', 'warehouse',
    'member_level', 'payment', 'time_tag', 'start_time', 'end_time', 'sort_order'];
  return fetch(`${list.init}?${queryString(keys, page)}`, {
    method: 'GET',
  })
};

// 导出
export const exportSubmit = (page) => {
  const keys = [
    'return_order_id', 'order_no', 'email', 'tracking_no', 'good_sn', 'source_site', 'insurance_states', 'trouble_state',
    'return_order_status', 'refund_status', 'shipping_status', 'order_type', 'receiver_country', 'return_label_type', 'warehouse',
    'member_level', 'payment', 'time_tag', 'start_time', 'end_time', 'sort_order'];
  return fetch(list.export, {
    method: 'POST',
    body: JSON.stringify(parseQuery(keys, page))
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
