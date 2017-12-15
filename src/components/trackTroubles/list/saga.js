
import { message } from 'antd';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import * as types from './types';
import { commit } from './action';
import { getFilters, getDataSer } from '../server';

const lan = {
  ofail: __('order.entry.submit_info'),
  osucess: __('order.entry.submit_info1'),
  fail: __('order.entry.submit_info6'),
  dataFail: __('order.entry.submit_info2'),
};

function* getFiltersSaga() {
  const data = yield getFilters();
  if (!data || data.code !== 0) {
    message.error(`${lan.ofail}: ${data.msg}`);
    return yield put(commit('filtersLoad', false));
  }
  return yield put(commit('filters', data.data));
}
function* getDataSaga(action) {
  const data = yield getDataSer(action.filter);
  if (!data || data.code !== 0) {
    message.error(`${lan.ofail}: ${data.msg}`);
    return yield put(commit('load', false));
  }
  return yield put(commit('load', false));
}

function* saga() {
  yield takeEvery(types.getFilters, getFiltersSaga);
  yield takeEvery(types.getData, getDataSaga);
}
export default saga;
