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
 // console.log(action.data, 'search');
  const {
    billno, orderId, email, shippingNo, referenceNumber, telephone, txnId, remarkUser, totalInput,
  } = action.data;
  const data = yield searchSubmit(assign({}, action.data, {
    billno: billno ? encodeURIComponent(billno.trim()) : null,
    orderId: orderId ? encodeURIComponent(orderId.trim()) : null,
    email: email ? encodeURIComponent(email.trim()) : null,
    shippingNo: shippingNo ? encodeURIComponent(shippingNo.trim()) : null,
    referenceNumber: referenceNumber ? encodeURIComponent(referenceNumber.trim()) : null,
    telephone: telephone ? encodeURIComponent(telephone.trim()) : null,
    txnId: txnId ? encodeURIComponent(txnId.trim()) : null,
    remarkUser: remarkUser ? encodeURIComponent(remarkUser.trim()) : null,
    totalInput: totalInput ? encodeURIComponent(totalInput.trim()) : null,
  }));
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle')}${data.msg}`);
    return yield put(searchFail());
  }
  return yield put(searchSuccess(data));
}


function* initCountrySaga() {
  const data = yield initCountrySer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle2')} ${data.msg}`);
    return yield put(initCountryFail());
  }
  return yield put(initCountrySuccess(data));
}

export default function* () {
  yield takeLatest(TYPES.SEARCH, searchSaga);
  yield takeEvery(TYPES.INIT_COUNTRY, initCountrySaga);
}
