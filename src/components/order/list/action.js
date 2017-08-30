/**
 * Create by liufeng on 2017/6/28
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
export const searchFail = () => ({
  type: TYPES.SEARCH_FAIL,
});

export const initCountry = () => ({
  type: TYPES.INIT_COUNTRY,
});
export const initCountrySuccess = data => ({
  type: TYPES.INIT_COUNTRY_SUCCESS,
  data,
});
export const initCountryFail = () => ({
  type: TYPES.INIT_COUNTRY_FAIL,
});

export const initSite = () => ({
  type: TYPES.INIT_SITE,
});
export const initSiteSuccess = data => ({
  type: TYPES.INIT_SITE_SUCCESS,
  data,
});
export const initSiteFail = () => ({
  type: TYPES.INIT_SITE_FAIL,
});
