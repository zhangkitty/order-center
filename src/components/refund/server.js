/**
 * Create by liufeng on 2017/9/28
 */
import assign from 'object-assign'
import fetch from "../../lib/fetch";
import {camel2Under} from "../../lib/camal";
import queryString from "../../lib/query-string";


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
  changeOrder: '/OrderReturn/modifyOrderIdByRefundRecordId', // 更改订单号
  cancelTheRefundBill:'/OrderDiffRefund/cancelTheRefundBill'
}

// 获取所有搜索数据
export const initCountrySer = () => (
  fetch(list.initCountry, {
    method: 'GET',
  })
);

// 搜索
export const searchSubmit = (page) => {
  const  temp  =assign({},page,{
    pay_time_from:page.payment_start_time,
    pay_time_to:page.payment_end_time,
  })
  const keys = ['pageSize', 'pageNumber', 'refund_bill_id', 'billno', 'email', 'add_user', 'handle_user','trouble_type',
    'refund_bill_type', 'refund_bill_status', 'refund_path_id', 'refund_path_status', 'site_from', 'apply_start_time', 'apply_end_time',
    'country_id', 'member_level', 'refund_method', 'refund_start_time', 'refund_end_time', 'sorting_rule','pay_time_from','pay_time_to',
  'trouble_mark','auto_refund'];
  return fetch(`${list.init}?${queryString(camel2Under(keys), camel2Under(temp))}`, {
    method: 'GET',
  })
};

export const getRefundDetailsInfo = (id, billno)=> (
  fetch(`${details.getRefundBillDetail}?refund_bill_id=${id}&billno=${billno}`, {
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
// 更改订单号
export const changeOrderSer = (billno, refund_record_id) => (
  fetch(details.changeOrder, {
    method: 'POST',
    body: JSON.stringify({ billno: billno, refund_record_id: refund_record_id })
  })
)

//取消提现退款
export const canceltherefundbillSer=(refund_bill_id,reasonRecord)=>(
  fetch(details.cancelTheRefundBill,{
    method:'POST',
    body:JSON.stringify({
      refund_bill_id:refund_bill_id,
      cancel_reason:reasonRecord
    })
  })
)

export const markTroubleBillSer = action =>{
  return fetch(`/OrderRefund/markTroubleBill`,{
    method:'post',
    body:JSON.stringify(
        {
          refund_bill_id:+action.refund_bill_id,
          action:action.action,
        }
    )
  })
}

export const remarkSer = action=>{
  return fetch(`/order/remark?order_id=${action.order_id}`,
      {
        method:'get',
      }
      )
}

export const newRemarkSaveSer = (action)=>{
  const temp = {
    order_id:action.order_id,
    remark:action.info,
  }
  return fetch(`/order/saveRemark`,{
    method:'post',
    body:JSON.stringify(temp)
  })
}
