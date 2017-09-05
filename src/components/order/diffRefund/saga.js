/**
 * Create by liufeng on 2017/6/28
 */
import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import * as TYPES from './types';
import { initReasonList, initPriceInfo, submitOrder } from '../server';
import {
initReasonListSuccess,
initReasonListFail,
initPriceInfoFail,
initPriceInfoSuccess,
commitSuccess,
commitFail,
} from './action';


function* initReasonListSaga(action) {
  const data = yield initReasonList(action.data);
  if (!data || data.code !== 0) {
    message.error(`{__('order.diffRefund.reason_list_failed')}: ${data.error}`);
    return yield put(initReasonListFail());
  }
  return yield put(initReasonListSuccess(data));
}

function* initPriceInfoSaga(action) {
  const data = yield initPriceInfo(action.data)
  console.log(data)
  if (!data || data.code !== 0) {
    message.error(`\`{__('order.diffRefund.refund_priceinfo_failed')}: ${data.error}`);
    return yield put(initPriceInfoFail());
  }
  return yield put(initPriceInfoSuccess(data));
}

function* submitSaga(action) {
  const data = yield submitOrder(action.data);
  if (data.code !== 0) {
    message.error(`${__('order.goodsRefund.submit_fail')}: ${data.msg}`);
    return yield put(change('submitLoad', false));
  }
  return yield put(change('submitLoad', false));
}

export default function* () {
  yield takeLatest(TYPES.INIT_REASONLIST, initReasonListSaga);
  yield takeLatest(TYPES.INIT_PRICEINFO, initPriceInfoSaga);
  yield takeLatest(TYPES.SUBMIT, submitSaga);
}
