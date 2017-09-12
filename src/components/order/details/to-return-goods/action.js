import * as TYPES from './types';

export const commit = (key, value) => ({
  type: TYPES.COMMIT,
  key,
  value,
});
export const infoCommit = (key, value) => ({
  type: TYPES.INFO_COMMIT,
  key,
  value,
});
export const getInfo = (oid, gid) => ({
  type: TYPES.GET_INFO,
  oid,
  gid,
});
export const getInfoSuccess = data => ({
  type: TYPES.GET_INFO_SUCCESS,
  data,
});
export const batchChoose = data => ({
  data,
  type: TYPES.BATCH_CHOOSE,
});
export const save = data => ({
  data,
  type: TYPES.SAVE,
});

