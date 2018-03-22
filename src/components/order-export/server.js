/**
 *  Create by liufeng on 2017/12/14
 *  订单信息导出
 */
import fetch from "../../lib/fetch";
import {camel2Under} from "../../lib/camal";
import queryString from "../../lib/query-string";
import { parseQuery } from "../../lib/query-string";


const list = {
  initCountry: '/OrderExport/getOrderExportConfig',   // 获取订单导出的数据
  export: '/OrderExport/export',    // 导出
  doRefundPass: '/OrderRefund/doRefundPass', // 通过
};

// 获取订单导出的数据
export const initCountrySer = () => (
  fetch(list.initCountry, {
    method: 'GET',
  })
);

// 导出
export const exportSubmit = (page) => {
  const keys = ['export_content', 'export_method', 'param', 'enter_amount'];
  return fetch(list.export, {
    method: 'POST',
    body: JSON.stringify(parseQuery(keys, page))
  })
};

export const doRefundPassSer = data => (
  fetch(list.doRefundPass, {
    method: 'POST',
    body: JSON.stringify(data)
  })
)
