/**
 * Create by liufeng on 2017/6/28
 */
import fetch from '../../lib/fetch';
import queryString from '../../lib/query-string';

const list = {
  init: '/skuDay/fetchSkuDaySumPage',    // 列表
  initType: '/category/fetchAllFirst',   // 获取所有一级分类
  initWarehouse: '/warehouse/getWarehouseSearchList',   // 获取所有仓库
  dataExport: '/skuDay/exportSkuDaySum',   // 数据导出
};

export const searchSubmit = (page) => {
  const keys = ['pageSize', 'pageNumber','warehouseId', 'categoryFirst', 'checkDateBegin', 'checkDateEnd', 'goodsSn'];
  return fetch(`${list.init}?${queryString(keys, page)}`, {
    method: 'GET',
  })
};

export const exportAll = (page) => {
  const keys = ['warehouseId', 'categoryFirst', 'checkDateBegin', 'checkDateEnd', 'goodsSn'];
  return fetch(`${list.dataExport}?${queryString(keys, page)}`, {
    method: 'GET',
  })
};

export const initTypeSer = () => (
  fetch(list.initType, {
    method: 'GET',
  })
);

export const initWarehouseSer = () => (
  fetch(list.initWarehouse, {
    method: 'GET',
  })
);


