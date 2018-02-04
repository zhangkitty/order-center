import { put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import * as TYPES from './types';
import { initManualSyncMallOrderSer, manualSyncMallOrderSer } from './server';
import { change } from './action';

const lan = {
  站点必填: '站点必填',
  订单号必填: '订单号必填',
};
function* initManualSyncMallOrderSaga() {
  const data = yield initManualSyncMallOrderSer();
  if (!data || data.code !== 0) {
    message.error(`${data.msg}`);
  } else {
    return yield put(change('typeList', Object.values(data.data.typeList)));
  }
  return null;
}

function* submitSaga(action) {
  const { value } = action;
  if (value.type === null) {
    return message.warning(lan.站点必填);
  }
  if (value.billno === null || value.billno.length === 0) {
    return message.warning(lan.订单号必填);
  }
  yield put(change('submitloading', true));
  const data = yield manualSyncMallOrderSer(value);
  yield put(change('submitloading', false));
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }
  return message.success(`${data.msg}`);
}

export default function* () {
  yield takeLatest(TYPES.INITMANUALSYNCMALLORDER, initManualSyncMallOrderSaga);
  yield takeLatest(TYPES.SUBMIT, submitSaga);
}
