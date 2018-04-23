import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as types from './type';
import { getOrderUploadListSer } from './servers';
import { getOrderUploadListSuccess, change } from './action';

function* getOrderUploadListSaga(action) {
  yield put(change('selectValueReady', false));
  const data = yield getOrderUploadListSer(action);
  yield put(change('selectValueReady', true));
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }
  return yield put(getOrderUploadListSuccess(data.data));
}

export default function* () {
  yield takeLatest(types.getOrderUploadList, getOrderUploadListSaga);
}
