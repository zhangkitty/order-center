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
