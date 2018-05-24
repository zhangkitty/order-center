import * as types from './types';

export const change = (key, value) => ({
  type: types.change,
  key,
  value,
});

export const init = () => ({
  type: types.init,
});

export const search = props => ({
  type: types.search,
  props,
});

export const changePage = (page, pageSize, props) => ({
  type: types.changePage,
  page,
  pageSize,
  props,
});

export const getRemarks = order_id => ({
  type: types.getRemarks,
  order_id,
});

export const saveRemark = (order_id, props) => ({
  type: types.saveRemark,
  order_id,
  props,
});

export const getTransRemark = order_id => ({
  type: types.getTransRemark,
  order_id,
});

export const saveTransRemark = (order_id, props) => ({
  type: types.saveTransRemark,
  order_id,
  props,
});

export const operateMarkStatus = props => ({
  type: types.operateMarkStatus,
  props,
});

export const tag = (props, key) => ({
  type: types.tag,
  props,
  key,
});
