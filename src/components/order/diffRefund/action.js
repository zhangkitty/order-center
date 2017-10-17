/**
 * Create by liufeng on 2017/6/28
 */
import * as TYPES from './types';

// 获取订单差价退款金额信息(查询)
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

// 获取普通商品退款或COD取消商品原因、差价退款原因
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

export const subchange = (key, value) => ({
  type: TYPES.SUBMIT_CHANGE,
  key,
  value,
});

export const submitForward = data => ({
  type: TYPES.SUBMIT,
  data,
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

export const reset = () => ({
  type: TYPES.RESET,
});

export const pathchange = (k, obj) => ({
  type: TYPES.PATHCHANGE,
  k,
  obj,
});

export const changeChannelValue = (channel, key, val) => ({
  type: TYPES.CHANGE_CHANNEL_VALUE,
  channel,
  key,
  val,
});
