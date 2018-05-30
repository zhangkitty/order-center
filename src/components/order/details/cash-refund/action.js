/**
 * Create by liufeng on 2017/9/21
 */
import * as TYPES from './types';

export const change = (key, val) => ({
  type: TYPES.CHANGE,
  key,
  val,
});

export const getData = orderId => ({
  type: TYPES.GET_DATA,
  orderId,
});

export const getDataSuccess = res => ({
  type: TYPES.GET_DATA_SUCCESS,
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

export const changeRadio = () => ({
  type: TYPES.changeRadio,
});

export const changeCurrency = () => ({
  type: TYPES.changeCurrency,
});

export const changeAmount = () => ({
  type: TYPES.changeAmount,
});

