import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import assign from 'object-assign';
import * as TYPES from './types';
import {getOrderReturnDetail} from './server'
import {getOrderReturnDetailSuccess} from "./action"

const lan = {
  ofail: __('order.entry.submit_info'),
  osucess: __('order.entry.submit_info1'),
  fail: __('order.entry.submit_info2'),
  part: __('order.entry.submit_info3'),
};


function* getOrderReturnDetailSaga(action) {
  const data = yield getOrderReturnDetail(action.id)
  console.log(data,data)
  if(!data||data.code!==0){
    return message.error(`${lan.fail}:${data.msg}`);
  }
  return yield put(getOrderReturnDetailSuccess(data.data))
}

export default function* () {
  yield takeEvery(TYPES.GETORDERRETURNDETAIL,getOrderReturnDetailSaga)

}
