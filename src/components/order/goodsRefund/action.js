/**
 * Create by liufeng on 2017/6/28
 */
import * as TYPES from './types';


export const getData = orderId => ({
  type: TYPES.GET_DATA,
  orderId,
});

