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

const lan = {
  缺少必填项: '缺少必填项',
};

function filterAccount(path) {
  switch (path.refundMethod) {
    case 'Paytm':
      return path.account;
    case 'PayPal':
      return path.account;
    case 'yes bank':
      return path.bankCode && path.account && path.customer && path.issuingCity;
    default:
      return true;
  }
}

function* getDataSaga(action) {
  const { orderId } = action;
  const data = yield cashDataSer(orderId);
  if (!data || data.code !== 0) {
    message.error(`${__('order.goodsRefund.get_goodsinfo_fail')}: ${data.msg}`);
    return yield put(change('load', false));
  }
  return yield put(getDataSuccess(data.data));
}

function* submitSaga(action) {
  if (action.data.refundPaths.filter(filterAccount).length < 1) {
    return message.warning(lan.缺少必填项);
  }
  yield put(change('submitLoad', true));
  const data = yield cashRefundSubmit(action.data);
  if (!data || data.code !== 0) {
    message.error(`${__('order.goodsRefund.submit_fail')}: ${data.msg}`);
    return yield put(change('submitLoad', false));
  }
  message.success(__('common.sagaTitle25'));
  yield put(change('submitDisabled', true));  // 提交成功，按钮置灰
  return yield put(change('submitLoad', false));
}

export default function* () {
  yield takeLatest(TYPES.GET_DATA, getDataSaga);
  yield takeLatest(TYPES.SUBMIT, submitSaga);
}
