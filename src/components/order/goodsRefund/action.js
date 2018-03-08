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
export const changeRlFee = makeActionCreator(types.changeRlFee, 'val');
export const submit = makeActionCreator(types.submit, 'val');
export const changeShippingInsurance = makeActionCreator(types.changeShippingInsurance,'val')
