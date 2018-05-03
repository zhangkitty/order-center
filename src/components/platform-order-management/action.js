import * as types from './types';


export const change = (key, value) => ({
  type: types.change,
  key,
  value,
});
export const getListPlatForm = () => ({
  type: types.getListPlatForm,
});

export const getListLogisticChannel = value => ({
  type: types.getListLogisticChannel,
  value,
});

export const changePage = (page, pageSize, props) => ({
  type: types.changePage,
  page,
  pageSize,
  props,
});

export const add = props => ({
  type: types.add,
  props,
});

export const edit = (id, props) => ({
  type: types.edit,
  id,
  props,
});

export const addLogisticChannel = props => ({
  type: types.addLogisticChannel,
  props,
});

export const modifyLogisticChannel = props => ({
  type: types.modifyLogisticChannel,
  props,
});

export const fetchEditDataSuccess = data => ({
  type: types.fetchEditDataSuccess,
  data,
});

export const delLogisticChannel = props => ({
  type: types.delLogisticChannel,
  props,
});
