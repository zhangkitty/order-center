
import * as types from './type';

export const getOrderUploadList = () => ({
  type: types.getOrderUploadList,
});

export const getOrderUploadListSuccess = val => ({
  type: types.getOrderUploadListSuccess,
  val,
});

export const getOrderUploadListFailed = () => ({
  type: types.getOrderUploadListFailed,
});

export const change = (key, value) => ({
  type: types.change,
  key,
  value,
});

