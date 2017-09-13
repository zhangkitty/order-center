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
export const getInfo = id => ({
  type: TYPES.GET_INFO,
  id,
});
export const getInfoSuccess = data => ({
  type: TYPES.GET_INFO_SUCCESS,
  data,
});
export const getCity = v => ({
  v,
  type: TYPES.GET_CITY,
});
export const save = (data, billno) => ({
  data,
  billno,
  type: TYPES.SAVE,
});

