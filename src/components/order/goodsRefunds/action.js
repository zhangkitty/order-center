/**
 * Create by liufeng on 2017/6/28
 */
import * as TYPES from './types';

export const init = () => ({
  type: TYPES.INIT,
});

export const change = (key, val) => ({
  type: TYPES.CHANGE,
  key,
  val,
});

export const commit = (key, val) => ({
  type: TYPES.COMMIT,
  key,
  val,
});

export const search = data => ({
  type: TYPES.SEARCH,
  data,
});
export const searchSuccess = data => ({
  data,
  type: TYPES.SEARCH_SUCCESS,
});
export const searchFail = () => ({
  type: TYPES.SEARCH_FAIL,
});

export const initType = () => ({
  type: TYPES.INIT_TYPE,
});
export const initTypeSuccess = data => ({
  type: TYPES.INIT_TYPE_SUCCESS,
  data,
});
export const initTypeFail = () => ({
  type: TYPES.INIT_TYPE_FAIL,
});

export const initWarehouse = () => ({
  type: TYPES.INIT_WAREHOUSE,
});
export const initWarehouseSuccess = data => ({
  type: TYPES.INIT_WAREHOUSE_SUCCESS,
  data,
});
export const initWarehouseFail = () => ({
  type: TYPES.INIT_WAREHOUSE_FAIL,
});
