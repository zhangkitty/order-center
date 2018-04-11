import * as types from './types';
import { makeActionCreator } from '../../lib/deal-func';

export const init = makeActionCreator(types.init, 'pageNumber', 'pageSize');
export const initSuccess = makeActionCreator(types.initSuccess, 'val');
export const initFailed = makeActionCreator(types.initFailed);
export const changePage = makeActionCreator(types.changePage, 'pageNumber', 'pageSize');
export const changePageSuccess = makeActionCreator(types.changePageSuccess, 'val');
export const changePageSize = makeActionCreator(types.changePageSize, 'pageNumber', 'pageSize');
export const changePageSizeSuccess = makeActionCreator(types.changePageSizeSuccess, 'val');
export const deleteItem = makeActionCreator(types.deleteItem, 'val');
export const deleteItemSuccess = makeActionCreator(types.deleteItemSuccess, 'val');
export const addOrEdit = makeActionCreator(types.addOrEdit, 'val');
export const addOrEditSerSuccess = makeActionCreator(types.addOrEditSerSuccess, 'val', 'action');
export const changeValue = makeActionCreator(types.changeValue, 'key', 'val');
export const addAdminUserManage = makeActionCreator(types.addAdminUserManage, 'val');
