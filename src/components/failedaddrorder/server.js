/**
 * Create by liufeng on 2017/9/20
 */
import assign from 'object-assign';
import fetch from '../../lib/fetch';
// import { camel2Under, under2Camal } from '../../lib/camal';
// import queryString from '../../lib/query-string';

// 订单列表
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
    body: JSON.stringify(data),
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