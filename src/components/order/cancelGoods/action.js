/**
 * Create by liufeng on 2017/6/28
 */
import * as TYPES from './types';

export const change = (key, val) => ({
  type: TYPES.CHANGE,
  key,
  val,
});

// 订单列表-商品退款申请获取的返回信息
export const getData = (orderId, goodsId) => ({
  type: TYPES.GET_DATA,
  orderId,
  goodsId,
});
export const getDataSuccess = res => ({
  type: TYPES.GET_DATA_SUCCESS,
  res,
});
// 获取普通商品退款或COD取消商品原因、差价退款原因
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
