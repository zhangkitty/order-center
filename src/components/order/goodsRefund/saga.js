/**
 * Create by liufeng on 2017/6/28
 */
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import { getDataSer } from '../server';
import {
  change, getDataSuccess,
} from './action';

import * as TYPES from './types';

function* getDataSaga(action) {
  const { orderId, goodsId } = action;
  const data = yield getDataSer(orderId, encodeURIComponent(goodsId));
  if (data.error) {
    message.error(`查找失败: ${data.error}`);
    return yield put(change('load', false));
  }
  console.log('res', data);
  return yield put(getDataSuccess(data));
}

export default function* () {
  yield takeLatest(TYPES.GET_DATA, getDataSaga);
}
