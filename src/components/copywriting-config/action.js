
import * as types from './types';

export const changeValue = (key, value) => ({ type: types.changeValue, key, value });

export const orderReturnLabelQueryAll = () => ({ type: types.orderReturnLabelQueryAll });
