
import { message } from 'antd';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import * as types from './types';
import { changeValue } from './action';

import { orderReturnLabelQueryByIdSer } from './server';


function* orderReturnLabelQueryByIdSaga(action) {
  const data = yield orderReturnLabelQueryByIdSer(action);
  if (data.error_code !== 0) {
    return message.info(`${data.msg}`);
  }
  yield put(changeValue('dataSource', data.data));
  return null;
}

function* saga() {
  yield takeLatest(types.orderReturnLabelQueryById, orderReturnLabelQueryByIdSaga);
}
export default saga;
