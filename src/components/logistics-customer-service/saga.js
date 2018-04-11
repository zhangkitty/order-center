import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as types from './types';
import { initSer } from './server';
import { initSuccess } from './action';

function* initSaga(action) {
  const data = yield initSer(action);
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }
  return yield put(initSuccess(data.data));
}

export default function* () {
  yield takeLatest(types.init, initSaga);
}
