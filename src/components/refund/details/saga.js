import { takeEvery, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as TYPES from './types';
import { getInfoSuccess } from './action';
import { getRefundDetailsInfo } from '../server';

const lan = {
  ofail: __('order.entry.submit_info'),
  osucess: __('order.entry.submit_info1'),
  fail: __('order.entry.submit_info2'),
  part: __('order.entry.submit_info3'),
};
function* getInfoSaga(action) {
  const data = yield getRefundDetailsInfo(action.id);
  if (!data || data.code !== 0) {
    return message.error(`${lan.fail}:${data.msg}`);
  }
  return yield put(getInfoSuccess(data.data));
}

export default function* () {
  yield takeEvery(TYPES.GET_INFO, getInfoSaga);
}
