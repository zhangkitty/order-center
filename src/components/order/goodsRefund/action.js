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

