/**
 * Create by liufeng on 2017/6/28
 * #44905 liufeng ,提交成功后，关闭页面
 */
import { message } from 'antd';
import { hashHistory } from 'react-router';
import { put, takeLatest } from 'redux-saga/effects';
import { getDataSer, goodsRefundSubmit } from '../server';
import {
  change, getDataSuccess,
} from './action';

import * as TYPES from './types';

function* getDataSaga(action) {
  const { orderId } = action;
  const data = yield getDataSer(orderId);
  if (!data || data.code !== 0) {
    message.error(`${__('order.goodsRefund.get_goodsinfo_fail')}: ${data.msg}`);
    return yield put(change('load', false));
  }
  return yield put(getDataSuccess(data.data));
}

function* submitSaga(action) {
  const data = yield goodsRefundSubmit(action.data);
  if (!data || data.code !== 0) {
    message.error(`${__('order.goodsRefund.submit_fail')}: ${data.msg}`);
    return yield put(change('submitLoad', false));
  }
  message.success(__('common.sagaTitle25'));
  // return setTimeout(window.close, 3000); // 关闭窗口
}

export default function* () {
  yield takeLatest(TYPES.GET_DATA, getDataSaga);
  yield takeLatest(TYPES.SUBMIT, submitSaga);
}
