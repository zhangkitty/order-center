import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import * as TYPES from './types';
import { initPriceInfo } from '../server';
import {

  initPriceInfoFail,
  initPriceInfoSuccess,

} from './action';

function* initPriceInfoSaga(action) {
  const data = yield initPriceInfo(action.data);
  if (!data || data.code !== 0) {
    message.error(`${__('order.' +
      'diffRefund.refund_priceinfo_failed')}: ${data.error}`);
    return yield put(initPriceInfoFail());
  }
  return yield put(initPriceInfoSuccess(data));
}


export default function* () {
  yield takeLatest(TYPES.INIT_PRICEINFO, initPriceInfoSaga);
}
