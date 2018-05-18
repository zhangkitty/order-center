import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as types from './types';
import {
  initSer,
  searchSer,
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
  const country = [];
  data[0].data.map(v => v.country_info.map(k => country.push(k)));
  yield put(change('country', country));

  return null;
}

function* searchSaga(action) {
  const data = yield searchSer(action);
}


export default function* () {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.search, searchSaga);
}
