/**
 * Create by liufeng on 2017/12/14
 */
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import {
  searchSubmit, initCountrySer, exportSubmit,
} from '../server';
import {
  searchSuccess, initCountrySuccess,
  change,
} from './action';

import * as TYPES from './types';

function* searchSaga(action) {
  const data = yield searchSubmit(action);
  if (!data || data.code !== 0) {
    yield put(change('searchLoad', false));
    return message.error(`${__('refund.list.submitTitle2')}${data.msg}`);
  }
  return yield put(searchSuccess(data));
}

function* exportSaga(action) {
  const data = yield exportSubmit(action.data);
  if (!data || data.code !== 0) {
    yield put(change('exportLoad', false));
    return message.error(`${__('returns.list.submitTitle3')}${data.msg}`);
  }
  message.success(__('returns.list.submitTitle4'));
  yield put(change('exportLoad', false));
  return window.open(data.data);
}

function* initCountrySaga() {
  const data = yield initCountrySer();
  if (!data || data.code !== 0) {
    yield put(change('load', false));
    return message.error(`${__('refund.list.submitTitle1')} ${data.msg}`);
  }
  return yield put(initCountrySuccess(data));
}

export default function* () {
  yield takeLatest(TYPES.SEARCH, searchSaga);
  yield takeLatest(TYPES.EXPORT, exportSaga);
  yield takeEvery(TYPES.INIT_COUNTRY, initCountrySaga);
}
