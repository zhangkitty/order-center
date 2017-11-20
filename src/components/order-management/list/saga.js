import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import * as TYPES from './types';
import { commit } from './action';
import { exportLogSer } from '../server';

function* exportLog(action) {
  const data = yield exportLogSer(action.date);
  if (!data || data.code !== 0) {
    message.error(`${__('order.entry.submit_info')}: ${data.msg}`);
    return yield put(commit('dataSource', data.map((v, i) => (i === action.index ? assign({}, v, { load: false }) : v))));
  }
  return yield put(commit('dataSource', data.map((v, i) => (i === action.index ? assign({}, v, { load: false }) : v))));
}
export default function* () {
  yield takeLatest(TYPES.LOG, exportLog);
}
