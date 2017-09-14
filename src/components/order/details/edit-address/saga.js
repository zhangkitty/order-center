import { takeEvery, put } from 'redux-saga/effects';
import { message } from 'antd';
import { hashHistory } from 'react-router';
import * as TYPES from './types';
import { getInfoSuccess, commit } from './action';
import { getAddressInfo, getcitySer, editAddresSave } from '../server';

// TODO: lan
const lan = {
  ofail: '操作失败',
  osucess: '操作成功',
  fail: '获取数据失败',
  part: '加入部分发队列成功',
};
function* getInfoSaga(action) {
  const data = yield getAddressInfo(action.id);
  if (!data || data.code !== 0) {
    return message.error(`${lan.fail}:${data.msg}`);
  }
  return yield put(getInfoSuccess(data.data));
}
function* getCitySaga(action) {
  const data = yield getcitySer(action.v);
  if (!data || data.code !== 0) {
    return yield put(commit('cities', []));
  }
  return yield put(commit('cities', data.data.provinces || []));
}
function* saveSaga(action) {
  const data = yield editAddresSave(action.data);
  if (!data || data.code !== 0) {
    yield put(commit('load', false));
    return message.error(`${lan.fail}:${data.msg}`);
  }
  yield put(commit('load', false));
  message.success(lan.osucess);
  return hashHistory.push(`order/details/entry/${action.data.order_id}/${action.billno}`);
}

export default function* () {
  yield takeEvery(TYPES.GET_INFO, getInfoSaga);
  yield takeEvery(TYPES.GET_CITY, getCitySaga);
  yield takeEvery(TYPES.SAVE, saveSaga);
}
