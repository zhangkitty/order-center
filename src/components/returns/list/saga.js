/**
 * Create by liufeng on 2017/8/30
 */
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import {
  searchSubmit, initCountrySer, exportSubmit,exportASer
} from '../server';
import {
  searchSuccess, initCountrySuccess,
  change,
} from './action';

import * as TYPES from './types';

function* searchSaga(action) {
  const {
    return_order_id, order_no, email, tracking_no, good_sn, sort_by, LogisticsChannels,
  } = action.data;
  const data = yield searchSubmit(assign({}, action.data, {
    return_order_id: return_order_id ? encodeURIComponent(return_order_id.trim()) : null,
    order_no: order_no ? encodeURIComponent(order_no.trim()) : null,
    email: email ? encodeURIComponent(email.trim()) : null,
    tracking_no: tracking_no ? encodeURIComponent(tracking_no.trim()) : null,
    good_sn: good_sn ? encodeURIComponent(good_sn.trim()) : null,
    sort_by,
    shipping_method: LogisticsChannels,
  }));
  if (!data || data.code !== 0) {
    yield put(change('searchLoad', false));
    return message.error(`${__('refund.list.submitTitle2')}${data.msg}`);
  }
  return yield put(searchSuccess(data));
}

function* exportSaga(action) {
  const temp = assign({}, action.data, {
    shipping_method: action.data.LogisticsChannels,
  });
  const data = yield exportSubmit(temp);
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

function* exportASaga(action) {
  const data = yield exportASer(action);
}

export default function* () {
  yield takeLatest(TYPES.SEARCH, searchSaga);
  yield takeLatest(TYPES.EXPORT, exportSaga);
  yield takeEvery(TYPES.INIT_COUNTRY, initCountrySaga);
  yield takeEvery(TYPES.exportA, exportASaga);
}
