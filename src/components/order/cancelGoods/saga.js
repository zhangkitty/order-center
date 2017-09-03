/**
 * Create by liufeng on 2017/6/28
 */
import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import { getDataSer, getReasonSer, goodsRefundSubmit } from '../server';
import {
  change, getDataSuccess, getReasonSuccess,
} from './action';

import * as TYPES from './types';

function* getDataSaga(action) {
  const { orderId, goodsId } = action;
  const data = yield getDataSer(orderId, encodeURIComponent(goodsId));
  if (data.code !== 0) {
    message.error(`${__('order.goodsRefund.get_goodsinfo_fail')}: ${data.msg}`);
    return yield put(change('load', false));
  }
  return yield put(getDataSuccess(data.data));
}
function* getReasonSaga() {
  const data = yield getReasonSer(2);
  if (data.code !== 0) {
    message.error(`${__('order.goodsRefund.get_backmoney_fail')}: ${data.msg}`);
    return yield put(change('load', false));
  }
  return yield put(getReasonSuccess(data.data));
}
function* submitSaga(action) {
  const data = yield goodsRefundSubmit(action.data);
  if (data.code !== 0) {
    message.error(`${__('order.goodsRefund.submit_fail')}: ${data.msg}`);
    return yield put(change('submitLoad', false));
  }
  return yield put(change('submitLoad', false));
}

export default function* () {
  yield takeLatest(TYPES.GET_DATA, getDataSaga);
  yield takeLatest(TYPES.GET_REASON, getReasonSaga);
  yield takeLatest(TYPES.SUBMIT, submitSaga);
}
