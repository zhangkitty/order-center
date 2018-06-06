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
} from './action';

import * as TYPES from './types';

function* searchSaga(action) {
  const {
    refund_bill_id, billno, email, add_user, handle_user, trouble_mark,
  } = action.data;
  const data = yield searchSubmit(assign({}, action.data, {
    refund_bill_id: refund_bill_id ? encodeURIComponent(refund_bill_id.trim()) : null,
    billno: billno ? encodeURIComponent(billno.trim()) : null,
    email: email ? encodeURIComponent(email.trim()) : null,
    add_user: add_user ? encodeURIComponent(add_user.trim()) : null,
    handle_user: handle_user ? encodeURIComponent(handle_user.trim()) : null,
    trouble_mark: trouble_mark || null,
  }));
  if (!data || data.code !== 0) {
    message.error(`${__('refund.list.submitTitle2')}${data.msg}`);
    return yield put(searchFail());
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
