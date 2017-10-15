import { takeEvery, put } from 'redux-saga/effects';
import { message } from 'antd';
import { hashHistory } from 'react-router';
import * as TYPES from './types';
import { getInfoSuccess, getInfoShow, getInfoShowSuccess, commit, getCity, getCitySuccess } from './action';
import { getAddressInfo, getcitySer, editAddresSave, addressShow } from '../server';

const lan = {
  ofail: __('order.entry.submit_info'),
  osucess: __('order.entry.submit_info1'),
  fail: __('order.entry.submit_info2'),
  part: __('order.entry.submit_info3'),
};
function* getInfoSaga(action) {
  const data = yield getAddressInfo(action.id);
  if (!data || data.code !== 0) {
    return message.error(`${lan.fail}:${data.msg}`);
  }
  yield put(getInfoShow(data.data.site_from, data.data.country_id));
  yield put(getCity(data.data.country_list.find(v => v.id === data.data.country_id).value));
  return yield put(getInfoSuccess(data.data));
}
function* getInfoShowSaga(action) {
  const data = yield addressShow(action.site, action.id);
  if (!data || data.code !== 0) {
    return message.error(`${lan.fail}:${data.msg}`);
  }
  return yield put(getInfoShowSuccess(data.data));
}
function* getCitySaga(action) {
  const data = yield getcitySer(action.v);
  if (!data || data.code !== 0) {
    yield put(commit('provinceLoad', false));
    return yield put(commit('cities', []));
  }
  yield put(commit('provinceLoad', false));
  return yield put(getCitySuccess(data.data.provinces || []));
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
  yield takeEvery(TYPES.GET_INFO_SHOW, getInfoShowSaga);
  yield takeEvery(TYPES.GET_CITY, getCitySaga);
  yield takeEvery(TYPES.SAVE, saveSaga);
}
