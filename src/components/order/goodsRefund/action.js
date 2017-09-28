/**
 * Create by liufeng on 2017/6/28
 */
import * as TYPES from './types';

export const change = (key, val) => ({
  type: TYPES.CHANGE,
  key,
  val,
});

export const getData = (orderId, goodsId) => ({
  type: TYPES.GET_DATA,
  orderId,
  goodsId,
});

export const getDataSuccess = res => ({
  type: TYPES.GET_DATA_SUCCESS,
  res,
});
export const getReason = () => ({
  type: TYPES.GET_REASON,
});
export const getReasonSuccess = res => ({
  type: TYPES.GET_REASON_SUCCESS,
  res,
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

export const reset = () => ({
  type: TYPES.RESET,
});
export const checkPath = value => ({
  value,
  type: TYPES.CHECK_PATH,
});
export const usPriceChange = (value, i, rate) => ({
  value,
  i,
  rate,
  type: TYPES.US_PRICE_CHANGE,
});
export const otherPriceChange = (value, i, rate2) => ({
  value,
  i,
  rate2,
  type: TYPES.OTHER_PRICE_CHANGE,
});

export const allback = (back, rl, typeId) => ({
  type: TYPES.ALL_BACK,
  back,
  rl,
  typeId,
});
export const copyPaymentMethod = () => ({
  type: TYPES.COPY_PAYMENT_METHOD,
});

