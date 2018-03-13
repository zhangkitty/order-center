import * as types from './types';

export const commit = (key, value) => ({ type: types.commit, key, value });
export const filterCommit = (key, value) => ({ type: types.filterCommit, key, value });
export const getFilters = () => ({ type: types.getFilters });
export const getData = filter => ({ type: types.getData, filter });
export const getDataSuccess = data => ({ type: types.getDataSuccess, data });
export const remarkShow = id => ({ type: types.remarkShow, id });
export const addRemark = (id, remark) => ({ type: types.addRemark, id, remark });
export const followTrouble = (id, handleStatus, filter) => ({ type: types.followTrouble, id, handleStatus, filter });
export const handled = (id, res, filter) => ({ type: types.handled, id, res, filter });
export const handledModal = id => ({ type: types.handledModal, id });
export const uploadShow = (id, imgList) => ({ type: types.uploadShow, id, imgList });
export const uploadImg = (id, imgList, filter) => ({ type: types.uploadImg, id, imgList, filter });
export const getStatusAll = () => ({ type: types.getStatusAll });
export const getStatusAllSet = data => ({ type: types.getStatusAllSet, data });
export const doSelect = idList => ({ type: types.doSelect, idList });
export const exportOrder = data => ({ type: types.exportOrder, data });
export const exportIdSet = () => ({ type: types.exportIdSet });
export const followShow = id => ({ type: types.followShow, id });
export const followShowSet = data => ({ type: types.followShowSet, data });
