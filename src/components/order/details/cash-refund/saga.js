/**
 * Create by liufeng on 2017/6/28
 */
import { message } from 'antd';
import { hashHistory } from 'react-router';
import { put, takeLatest } from 'redux-saga/effects';
import { cashDataSer, cashRefundSubmit } from '../server';
import {
  change, getDataSuccess,
} from './action';

import * as TYPES from './types';

function* getDataSaga(action) {
  const { orderId } = action;
  const data = yield cashDataSer(orderId);
  if (data.code !== 0) {
    message.error(`${__('order.goodsRefund.get_goodsinfo_fail')}: ${data.msg}`);
    return yield put(change('load', false));
  }
  return yield put(getDataSuccess(data.data));
}

function* submitSaga(action) {
  const data = yield cashRefundSubmit(action.data);
  if (data.code !== 0) {
    message.error(`${__('order.goodsRefund.submit_fail')}: ${data.msg}`);
    return yield put(change('submitLoad', false));
  }
  return yield put(change('submitLoad', false));
}

export default function* () {
  yield takeLatest(TYPES.GET_DATA, getDataSaga);
  yield takeLatest(TYPES.SUBMIT, submitSaga);
}
