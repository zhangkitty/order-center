/**
 * Create by liufeng on 2017/6/28
 */
import * as TYPES from './types';


export const getdata = req => ({
  type: TYPES.GET_DATA,
  req,
});
export const getdataSuccess = res => ({
  type: TYPES.GET_DATA_SUCCESS,
  res,
});

export const getdataFail = () => ({
  type: TYPES.GET_DATA_FAIL,
});

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

