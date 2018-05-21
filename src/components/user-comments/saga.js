import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as types from './types';
import {
  initSer,
  searchSer,
  changePageSer,
} from './server';
import { change } from './action';


function* initSaga(action) {
  const data = yield initSer(action);
  if (data[0].code !== 0) {
    return message.info(`${data[0].msg}`);
  }
  if (data[1].code !== 0) {
    return message.info(`${data[0].msg}`);
  }
  const country = [{ country: '请选择', country_id: null }];
  data[0].data.map(v => v.country_info.map(k => country.push(k)));
  yield put(change('countryArr', country));
  yield put(change('siteArr', data[1].data.data.site));
  yield put(change('handle_resultArr', data[1].data.data.handle_result));
  yield put(change('handle_statusArr', data[1].data.data.handle_status));

  return null;
}

function* searchSaga(action) {
  const data = yield searchSer(action);
  if (data.code !== 0) {
    return message.info(`${data.msg}`);
  }
  yield put(change('dataSource', data.data.list));
  yield put(change('total', data.data.total));
  return null;
}

function* changePage(action) {
  const data = yield changePageSer(action);
  if (data.code !== 0) {
    return message.info(`${data.msg}`);
  }
  yield put(change('page_number', action.page));
  yield put(change('current', action.page));
  yield put(change('dataSource', data.data.list));
  return null;
}


export default function* () {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.search, searchSaga);
  yield takeLatest(types.changePage, changePage);
}
