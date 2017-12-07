/**
 * Create by shenjialin on 2017/11/21
 */
import * as TYPES from './types';

export const initSearch = () => ({
  type: TYPES.INITSEARCH,
});

export const change = (key, val) => ({
  type: TYPES.CHANGE,
  key,
  val,
});

export const commit = (key, val) => ({
  type: TYPES.COMMIT,
  key,
  val,
});

export const searchSuccess = data => ({
  data,
  type: TYPES.SEARCH_SUCCESS,
});
export const searchFail = () => ({
  type: TYPES.SEARCH_FAIL,
});
export const searchList = data => ({
  type: TYPES.SEARCHLIST,
  data,
});
export const searchList_success = data => ({
  type: TYPES.SEARCHLIST_SUCCESS,
  data,
});
export const searchList_fail = data => ({
  type: TYPES.SEARCHLIST_FAIL,
  data,
});
export const deleteOrder = data => ({
  type: TYPES.DELETEORDER,
  data,
});
export const auditOrder = data => ({
  type: TYPES.AUDITORDER,
  data,
});
export const exportOrder = data => ({
  type: TYPES.EXPORTORDER,
  data,
});
export const processOrder = data => ({
  type: TYPES.PROCESSORDER,
  data,
});
export const recheckOrder = data => ({
  type: TYPES.RECHECKORDER,
  data,
});
export const deleteSuccess = data => ({
  type: TYPES.DELETESUCCESS,
  data,
});
export const deleteFail = data => ({
  type: TYPES.DELETEFAIL,
  data,
});
export const recheckSuccess = data => ({
  type: TYPES.RECHECKSUCCESS,
  data,
});
export const recheckFail = data => ({
  type: TYPES.RECHECKFAIL,
  data,
});
export const processSuccess = data => ({
  type: TYPES.PROCESSSUCCESS,
  data,
});
export const processFail = data => ({
  type: TYPES.PROCESSFAIL,
  data,
});
export const auditSuccess = data => ({
  type: TYPES.AUDITSUCCESS,
  data,
});
export const auditFail = data => ({
  type: TYPES.AUDITFAIL,
  data,
});
export const batchDelete = data => ({
  type: TYPES.BATCHDELETE,
  data,
});
export const batchDeleteSuccess = data => ({
  type: TYPES.BATCHDELETESUCCESS,
  data,
});
export const batchDeleteFail = () => ({
  type: TYPES.BATCHDELETEFAIL,
});
export const batchRecheck = data => ({
  type: TYPES.BATCHRECHECK,
  data,
});
export const batchRecheckSuccess = data => ({
  type: TYPES.BATCHRECHECKSUCCESS,
  data,
});
export const batchRecheckFail = () => ({
  type: TYPES.BATCHRECHECKFAIL,
});
