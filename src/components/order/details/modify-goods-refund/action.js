import * as TYPES from './types';


export const getData = (orderId, goodsId) => ({
  type: TYPES.GET_DATA,
  orderId,
  goodsId,
});

export const getDataSuccess = res => ({
  type: TYPES.GET_DATA_SUCCESS,
  res,
});

