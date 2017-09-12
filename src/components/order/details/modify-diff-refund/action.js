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
export const activation = data => ({
  type: TYPES.ACTIVATION,
  data,
});
export const change = (key, val) => ({
  type: TYPES.CHANGE,
  key,
  val,
});
export const subchange = (key, value) => ({
  type: TYPES.SUBMIT_CHANGE,
  key,
  value,
});
