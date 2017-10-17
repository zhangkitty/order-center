/**
 * Created by liufeng on 2017/9/7.
 */
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Link, hashHistory } from 'react-router';
import assign from 'object-assign';
import { initFeedbackSer, initFeedbackTypeSer, submitDataSer, initDataSer } from '../../server';
import {
  initData,
  initFeedbackFail, initFeedbackSuccess, initFeedbackTypeFail, initFeedbackTypeSuccess,
  submitDataFail, submitDataSuccess, initDataFail, initDataSuccess,
} from './action';

import * as TYPES from './types';

function* initFeedbackSaga() {
  const data = yield initFeedbackSer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle3')}${data.msg}`);
    return yield put(initFeedbackFail());
  }
  return yield put(initFeedbackSuccess(data));
}

function* initFeedbackTypeSaga() {
  const data = yield initFeedbackTypeSer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle3')}${data.msg}`);
    return yield put(initFeedbackTypeFail());
  }

  return yield put(initFeedbackTypeSuccess(data));
}

// 详情
function* initDataSaga(action) {
  const data = yield initDataSer(action.order_id, action.id);
  if (!data || data.code !== 0) {
    message.error(`${data.msg}`);
    return yield put(initDataFail());
  }
 // message.success(__('common.sagaTitle25'));
  return yield put(initDataSuccess(data));
}

function* submitDataSaga(action) {
  const { remark } = action.data;
  const data = yield submitDataSer(assign({}, action.data, {
    remark: remark ? remark.trim() : null,
  }));
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle26')} ${data.msg}`);
    return yield put(submitDataFail());
  }
  message.success(__('common.sagaTitle25'));
  hashHistory.push(`/order/details/entry/${action.data.order_id}/${action.data.billno}`);
  return yield put(submitDataSuccess(data));
}

export default function* () {
  yield takeEvery(TYPES.INIT_FEEDBACK, initFeedbackSaga);
  yield takeEvery(TYPES.INIT_FEEDBACK_TYPE, initFeedbackTypeSaga);
  yield takeEvery(TYPES.SUBMIT, submitDataSaga);
  yield takeLatest(TYPES.INIT_DATA, initDataSaga);
}
