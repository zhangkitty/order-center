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
};

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


