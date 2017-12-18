/**
 * Create by liufeng on 2017/12/14
 */
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import { printed } from '../../../lib/deal-func';
import moment from 'moment';
import {
  initCountrySer, exportSubmit,
} from '../server';
import {
  initCountrySuccess, exportSubmitSuccess, change,
} from './action';
import tpl from './print.ejs';

import * as TYPES from './types';


function* exportSaga(action) {
  const data = yield exportSubmit(action.data);
  if (!data || data.code !== 0) {
    yield put(change('exportLoad', false));
    return message.error(`${__('order-export.submitTitle3')}${data.msg}`);
  }
  message.success(__('order-export.submitTitle4'));
  yield put(change('exportLoad', false));
  yield put(exportSubmitSuccess(data));
  const lists = data.data;
  moment.locale('en');
  const add_time = moment(data.data.add_time).format('DD/MM/YYYY - h:mm'); // 下单时间 worlpay
  const pay_time = moment(data.data.add_time).format('DD/MM/YYYY - h:mm');  // 付款时间  worlpay
  const paypal_time = moment(data.data.pay_time).format('MMMM Do YYYY, h:mm:ss a');   // 付款时间  paypal
  // console.log(paypal_time, 'paypal_time');
  return yield printed(tpl({
    list: lists,
    add_time,
    pay_time,
    paypal_time,
  }), false, false, '', true, true);
}

function* initCountrySaga() {
  const data = yield initCountrySer();
  if (!data || data.code !== 0) {
  //  yield put(change('load', false));
    return message.error(`${__('order-export.submitTitle1')} ${data.msg}`);
  }
  return yield put(initCountrySuccess(data));
}

export default function* () {
  yield takeLatest(TYPES.EXPORT, exportSaga);
  yield takeEvery(TYPES.INIT_COUNTRY, initCountrySaga);
}
