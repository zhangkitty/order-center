/**
 * Create by liufeng on 2017/6/28
 * #44905 liufeng ,提交成功后，关闭页面
 */
import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import { getDataSer, getReasonSer, cancelRefundSubmit } from '../server';
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
  const data = yield getReasonSer(5);
  if (data.code !== 0) {
    message.error(`${__('order.goodsRefund.get_backmoney_fail')}: ${data.msg}`);
    return yield put(change('load', false));
  }
  return yield put(getReasonSuccess(data.data));
}
function* submitSaga(action) {
  const data = yield cancelRefundSubmit(action.data);
  if (data.code !== 0) {
    message.error(`${__('order.goodsRefund.submit_fail')}: ${data.msg}`);
    return yield put(change('submitLoad', false));
  }
  message.success(`${__('common.sagaTitle23')}:${data.msg}`);
  return setTimeout(window.close, 3000); // 关闭窗口
}

export default function* () {
  yield takeLatest(TYPES.GET_DATA, getDataSaga);
  yield takeLatest(TYPES.GET_REASON, getReasonSaga);
  yield takeLatest(TYPES.SUBMIT, submitSaga);
}
