import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import * as TYPES from './types';
import { getRefundRecordInfo } from '../server';
import { initPriceInfo } from '../../server';
import {

  getdataFail,
  getdataSuccess,
  initPriceInfoFail,
  initPriceInfoSuccess,

} from './action';

function* getdataSaga(action) {
  const data = yield getRefundRecordInfo(action.req);
  if (!data || data.code !== 0) {
    message.error(`${__('order.' +
      'diffRefund.refund_priceinfo_failed')}: ${data.error}`);
    return yield put(getdataFail());
  }
  return yield put(getdataSuccess(data));
}

function* initPriceInfoSaga(action) {
  const data = yield initPriceInfo(action.data);
  if (!data || data.code !== 0) {
    message.error(`${__('order.diffRefund.refund_priceinfo_failed')}: ${data.error}`);
    return yield put(initPriceInfoFail());
  }
  return yield put(initPriceInfoSuccess(data));
}


export default function* () {
  yield takeLatest(TYPES.GET_DATA, getdataSaga);
  yield takeLatest(TYPES.INIT_PRICEINFO, initPriceInfoSaga);
}
