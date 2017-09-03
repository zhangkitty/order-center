/**
 * Create by liufeng on 2017/6/28
 */
import * as TYPES from './types';


export const initPriceInfo = data => ({
  type: TYPES.INIT_PRICEINFO,
  data,
});
export const initPriceInfoSuccess = data => ({
  type: TYPES.INIT_PRICEINFO_SUCCESS,
  data,
});
export const initPriceInfoFail = () => ({
  type: TYPES.INIT_PRICEINFO_FAIL,
});


export const initReasonList = data => ({
  type: TYPES.INIT_REASONLIST,
  data,
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

export const commitSuccess = data => ({
  type: TYPES.COMMITSUCCESS,
  data,
});

export const commitFail = () => ({
  type: TYPES.COMMITFAIL,
});

export const change = (key, value) => ({
  type: TYPES.CHANGE,
  key,
  value,
})

