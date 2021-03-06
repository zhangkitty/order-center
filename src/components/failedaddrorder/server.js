/**
 * Create by shenjialin on 2017/9/20
 */
import assign from 'object-assign';
import fetch from '../../lib/fetch';

const list = {
  init: '/OrderCheckAddress/getSearchCondition',    //选项初始化
  searchList: '/OrderCheckAddress/getOrderCheckAddressList',    //列表搜索
  deleteOrder: '/OrderCheckAddress/deleteData',    //订单删除
  auditOrder: '/OrderCheckAddress/auditAddress',    //订单审核
  processOrder: '/OrderCheckAddress/process',       //订单处理
  recheckOrder: '/OrderCheckAddress/checkAddress',       //订单重复校验
  exportOrder: '/OrderCheckAddress/batchExport',       //订单导出
};

export const initSearch = (page) => {
  return fetch(`${list.init}`, {
    method: 'GET',
  })
};

export const searchFailedAddrList = (data) => {
  return fetch(`${list.searchList}`, {
    method: 'post',
    body: JSON.stringify(assign({},data,{
      countries:data.countries.join(','),
      site_from:data.site_from.join(',')
    })),
  })
};

export const deleteOrder = (data) => {
  return fetch(`${list.deleteOrder}`, {
    method: 'post',
    body: JSON.stringify(data),
  })
};

export const auditOrder = (data) => {
  return fetch(`${list.auditOrder}`, {
    method: 'post',
    body: JSON.stringify(data),
  })
};

export const processOrder = (data) => {
  return fetch(`${list.processOrder}`, {
    method: 'post',
    body: JSON.stringify(data),
  })
};

export const recheckOrder = (data) => {
  return fetch(`${list.recheckOrder}`, {
    method: 'post',
    body: JSON.stringify(data),
  })
};

export const exportOrder = (data) => {
  return fetch(`${list.exportOrder}`, {
    method: 'post',
    body: JSON.stringify(data),
  })
};

export const batchrReviewedSer=(data)=>{
  return fetch(`/OrderCheckAddress/auditAddress?ids=${data}`,{
    method:'get',
  })
}

export const batchProcessSer=(data)=>{
  return fetch(`/OrderCheckAddress/process?id=${data}`,{
    method:'get'
  })
}
