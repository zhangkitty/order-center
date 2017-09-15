import { takeEvery, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as TYPES from './types';
import { getInfoSuccess, commit } from './action';
import { getToReturnGoodsInfo, toReturnGoodsSave } from '../server';

const lan = {
  ofail: __('order.entry.submit_info'),
  osucess: __('order.entry.submit_info1'),
  fail: __('order.entry.submit_info2'),
  part: __('order.entry.submit_info3'),
};
function* getInfoSaga(action) {
  const data = yield getToReturnGoodsInfo(action.oid, action.gid);
  if (!data || data.code !== 0) {
    return message.error(`${lan.fail}:${data.msg}`);
  }
  return yield put(getInfoSuccess(data.data));
}

function* saveSaga(action) {
  const data = yield toReturnGoodsSave(action.data);
  if (!data || data.code !== 0) {
    yield put(commit('load', false));
    return message.error(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('load', false));
  return message.success(lan.osucess);
}

export default function* () {
  yield takeEvery(TYPES.GET_INFO, getInfoSaga);
  yield takeEvery(TYPES.SAVE, saveSaga);
}
