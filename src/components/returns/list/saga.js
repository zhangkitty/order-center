/**
 * Create by liufeng on 2017/8/30
 */
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import {
  searchSubmit, initCountrySer,
} from '../server';
import {
  searchSuccess, searchFail,
  initCountrySuccess, initCountryFail,
  commit,
} from './action';

import * as TYPES from './types';

function* searchSaga(action) {
  const {
    return_order_id, order_no, email, tracking_no, good_sn,
  } = action.data;
  const data = yield searchSubmit(assign({}, action.data, {
    return_order_id: return_order_id ? encodeURIComponent(return_order_id.trim()) : null,
    order_no: order_no ? encodeURIComponent(order_no.trim()) : null,
    email: email ? encodeURIComponent(email.trim()) : null,
    tracking_no: tracking_no ? encodeURIComponent(tracking_no.trim()) : null,
    good_sn: good_sn ? encodeURIComponent(good_sn.trim()) : null,
  }));
  console.log(data, 'data');
  if (!data || data.code !== 0) {
    yield put(commit('searchLoad', false));
    return message.error(`${__('refund.list.submitTitle2')}${data.msg}`);
  }
  return yield put(searchSuccess(data));
}


function* initCountrySaga() {
  const data = yield initCountrySer();
  if (!data || data.code !== 0) {
    message.error(`${__('refund.list.submitTitle1')} ${data.msg}`);
    return yield put(initCountryFail());
  }
  return yield put(initCountrySuccess(data));
}

export default function* () {
  yield takeLatest(TYPES.SEARCH, searchSaga);
  yield takeEvery(TYPES.INIT_COUNTRY, initCountrySaga);
}
