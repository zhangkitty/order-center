/**
 * Create by liufeng on 2017/6/28
 */
import * as TYPES from './types';

export const getOverStockSearchConditions = () => ({
  type: TYPES.GETOVERSTOCKSEARCHCONDITIONS,
});

export const change = (key, val) => ({
  type: TYPES.CHANGE,
  key,
  val,
});

export const getOverStockList = val => ({
  type: TYPES.GETOVERSTOCKLIST,
  val,
});
