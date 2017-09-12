import { message } from 'antd';
import { hashHistory } from 'react-router';
import { put, takeLatest } from 'redux-saga/effects';
import { initWithDraw, submitForword } from '../server';
import {
   getDataSuccess,
} from './action';

import * as TYPES from './types';

function* getDataSaga(action) {
  const { orderId } = action;
  const data = yield initWithDraw(orderId);
  if (data.code !== 0) {
    message.error(`${__('order.goodsRefund.get_goodsinfo_fail')}: ${data.msg}`);
  }
  if (data.data.page_to === 'cod') {
    return hashHistory.push(`/order/cancelGoods/${orderId}/${goodsId}`);
  }
  return yield put(getDataSuccess(data.data));
}

function* submitForwardSaga(action) {
  const data = yield submitForword(action.req);
}

export default function* () {
  yield takeLatest(TYPES.GET_DATA, getDataSaga);
  yield takeLatest(TYPES.SUBMITFORWARD, submitForwardSaga);
}
