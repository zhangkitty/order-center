/**
 * Create by liufeng on 2017/6/28
 * #44905 liufeng ,提交成功后，关闭页面
 */
import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import * as TYPES from './types';
import { initReasonList, initPriceInfo, submitOrder } from '../server';
import {
initReasonListSuccess,
initReasonListFail,
initPriceInfoSuccess,
  change,
} from './action';

const lan = {
  commit_success: __('common.sagaTitle25'),
  get_initPriceInfo_failed: __('common.sagaTitle30'),
};

function* initReasonListSaga(action) {
  const data = yield initReasonList(action.data);
  if (!data || data.code !== 0) {
    message.error(`${__('order.diffRefund.reason_list_failed')}: ${data.error}`);
    return yield put(initReasonListFail());
  }
  return yield put(initReasonListSuccess(data));
}

function* initPriceInfoSaga(action) {
  const data = yield initPriceInfo(action.data);
  if (!data || data.code !== 0) {
    message.error(lan.get_initPriceInfo_failed);
    return yield put(initReasonListFail());
  }
  return yield put(initPriceInfoSuccess(data.data));
}

function* submitSaga(action) {
  const data = yield submitOrder(action.data);
  if (data.code !== 0) {
    message.error(`${__('order.diffRefund.submit_fail')}: ${data.msg}`);
    return yield put(change('submitLoad', false));
  }
  message.success(lan.commit_success);
  yield put(change('submitdisabled', true));
  return yield put(change('submitLoad', false));  // TODO
 // return setTimeout(window.close, 3000); // 关闭窗口
}

export default function* () {
  yield takeLatest(TYPES.INIT_REASONLIST, initReasonListSaga);
  yield takeLatest(TYPES.INIT_PRICEINFO, initPriceInfoSaga);
  yield takeLatest(TYPES.SUBMIT, submitSaga);
}
