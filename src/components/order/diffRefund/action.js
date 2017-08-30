/**
 * Create by liufeng on 2017/6/28
 */
import * as TYPES from './types';


export const initPriceInfo = () => ({
  type: TYPES.INIT_PRICEINFO,
});
export const initPriceInfoSuccess = data => ({
  type: TYPES.INIT_PRICEINFO_SUCCESS,
  data,
});
export const initPriceInfoFail = () => ({
  type: TYPES.INIT_PRICEINFO_FAIL,
});


export const initReasonList = () => ({
  type: TYPES.INIT_REASONLIST,
});
export const initReasonListSuccess = data => ({
  type: TYPES.INIT_REASONLIST_SUCCESS,
  data,
});
export const initReasonListFail = () => ({
  type: TYPES.INIT_REASONLIST_FAIL,
});

export const commit = data => ({
  type: TYPES.COMMIT,
  data,
});

