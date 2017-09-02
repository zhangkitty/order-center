/**
 * Create by liufeng on 2017/6/28
 */
import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import { getDataSer, getReasonSer } from '../server';
import {
  change, getDataSuccess, getReasonSuccess,
} from './action';

import * as TYPES from './types';

function* getDataSaga(action) {
  const { orderId, goodsId } = action;
  const data = yield getDataSer(orderId, encodeURIComponent(goodsId));
  if (data.code !== 0) {
    message.error(`获取商品信息失败: ${data.msg}`);
    return yield put(change('load', false));
  }
  return yield put(getDataSuccess(data.data));
}
function* getReasonSaga() {
  const data = yield getReasonSer(2);
  if (data.code !== 0) {
    message.error(`获取退款原因信息: ${data.msg}`);
    return yield put(change('load', false));
  }
  return yield put(getReasonSuccess(data.data));
}

export default function* () {
  yield takeLatest(TYPES.GET_DATA, getDataSaga);
  yield takeLatest(TYPES.GET_REASON, getReasonSaga);
}
