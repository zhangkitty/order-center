/**
 * Create by liufeng on 2017/6/28
 */
import * as types from './types';
import { makeActionCreator } from '../../../lib/deal-func';

export const init = makeActionCreator(types.init, 'orderId', 'goodsId');
export const change = makeActionCreator(types.change, 'key', 'val');
export const initSerSuccess = makeActionCreator(types.initSerSuccess, 'data');
export const changeChannelValue = makeActionCreator(types.changeChannelValue, 'channel', 'key', 'val');
export const changeShipping = makeActionCreator(types.changeShipping, 'val');
export const changeRadioValue = makeActionCreator(types.changeRadioValue, 'val');
export const changeInput = makeActionCreator(types.changeInput);
export const changeRlFee = makeActionCreator(types.changeRlFee, 'val');
export const submit = makeActionCreator(types.submit, 'val');
export const changeShippingInsurance = makeActionCreator(types.changeShippingInsurance, 'val');
export const subchange = (key, value) => ({
  type: types.SUBMIT_CHANGE,
  key,
  value,
});

export const submitForward = data => ({
  type: types.SUBMIT,
  data,
});

export const reset = () => ({
  type: types.RESET,
});


// 订单列表-商品退款申请获取的返回信息
export const getData = (orderId, goodsId) => ({
  type: types.GET_DATA,
  orderId,
  goodsId,
});

export const getDataSuccess = res => ({
  type: types.GET_DATA_SUCCESS,
  res,
});

// 获取普通商品退款或COD取消商品原因、差价退款原因
export const getReason = () => ({
  type: types.GET_REASON,
});
export const getReasonSuccess = res => ({
  type: types.GET_REASON_SUCCESS,
  res,
});

export const checkPath = value => ({
  value,
  type: types.CHECK_PATH,
});
export const usPriceChange = (value, i, rate) => ({
  value,
  i,
  rate,
  type: types.US_PRICE_CHANGE,
});
export const otherPriceChange = (value, i, rate2) => ({
  value,
  i,
  rate2,
  type: types.OTHER_PRICE_CHANGE,
});

export const allback = (back, rl, typeId) => ({
  type: types.ALL_BACK,
  back,
  rl,
  typeId,
});
export const copyPaymentMethod = () => ({
  type: types.COPY_PAYMENT_METHOD,
});

export const changeRefundMethod = () => ({
  type: types.changeRefundMethod,
});
