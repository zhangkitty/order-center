/**
 * Create by liufeng on 2017/6/28
 */
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import { searchSubmit } from '../server';
import {
  searchSuccess, searchFail,
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

export default function* () {
  yield takeLatest(TYPES.SEARCH, searchSaga);
}
