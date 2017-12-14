/**
 * Create by liufeng on 2017/12/14
 */
import * as TYPES from './types';

export const init = () => ({
  type: TYPES.INIT,
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

export const search = data => ({
  type: TYPES.SEARCH,
  data,
});
export const searchSuccess = data => ({
  data,
  type: TYPES.SEARCH_SUCCESS,
});

export const initCountry = () => ({
  type: TYPES.INIT_COUNTRY,
});
export const initCountrySuccess = data => ({
  type: TYPES.INIT_COUNTRY_SUCCESS,
  data,
});

