import * as types from './types';

export const commit = (key, value) => ({ type: types.commit, key, value });
export const filterCommit = (key, value) => ({ type: types.filterCommit, key, value });
export const getFilters = () => ({ type: types.getFilters });
export const getData = filter => ({ type: types.getData, filter });
export const getDataSuccess = data => ({ type: types.getDataSuccess, data });
export const remarkShow = id => ({ type: types.remarkShow, id });
export const addRemark = (id, remark) => ({ type: types.addRemark, id, remark });
export const followTrouble = (id, filter) => ({ type: types.followTrouble, id, filter });
export const handled = (id, res, filter) => ({ type: types.handled, id, res, filter });
export const handledModal = id => ({ type: types.handledModal, id });
