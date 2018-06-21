import { message } from 'antd';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import * as types from './types';
import { } from './action';
import { orderReturnLabelQueryAllSer } from './server';


function* orderReturnLabelQueryAllSaga(action) {
  const data = yield orderReturnLabelQueryAllSer(action);
  console.log(data);
}
function* saga() {
  yield takeLatest(types.orderReturnLabelQueryAll, orderReturnLabelQueryAllSaga);
}
export default saga;
