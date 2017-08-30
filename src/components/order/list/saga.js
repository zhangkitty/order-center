/**
 * Create by liufeng on 2017/8/30
 */
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import { searchSubmit, initCountrySer, initSiteSer } from '../server';
import {
  searchSuccess, searchFail, initCountrySuccess, initCountryFail, initSiteSuccess, initSiteFail,
} from './action';

import * as TYPES from './types';

function* searchSaga(action) {
  const { goodsSn } = action.data;
  const data = yield searchSubmit(assign({}, action.data, {
    goodsSn: goodsSn ? encodeURIComponent(goodsSn.trim()) : null,
  }));
  if (data.error) {
    message.error(`查找失败: ${data.error}`);
    return yield put(searchFail());
  }
  return yield put(searchSuccess(data));
}

function* initCountrySaga() {
  const data = yield initCountrySer();
  if (!data || data.code !== 0) {
    message.error(`获取国家列表失败: ${data.error}`);
    return yield put(initCountryFail());
  }
  return yield put(initCountrySuccess(data));
}

function* initSiteSaga() {
  const data = yield initSiteSer();
  console.log('site', data);
  if (!data || data.code !== 0) {
    message.error(`获取站点列表失败: ${data.error}`);
    return yield put(initSiteFail());
  }
  return yield put(initSiteSuccess(data));
}

export default function* () {
  yield takeLatest(TYPES.SEARCH, searchSaga);
  yield takeEvery(TYPES.INIT_COUNTRY, initCountrySaga);
  yield takeEvery(TYPES.INIT_SITE, initSiteSaga);
}
