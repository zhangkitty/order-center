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
export const getInfoShow = (site, id) => ({
  type: TYPES.GET_INFO_SHOW,
  site,
  id,
});
export const getInfoShowSuccess = data => ({
  type: TYPES.GET_INFO_SHOW_SUCCESS,
  data,
});
export const getInfoSuccess = data => ({
  type: TYPES.GET_INFO_SUCCESS,
  data,
});
export const getCity = v => ({
  v,
  type: TYPES.GET_CITY,
});
export const getCitySuccess = data => ({
  data,
  type: TYPES.GET_CITY_SUCCESS,
});
export const save = (data, billno) => ({
  data,
  billno,
  type: TYPES.SAVE,
});

