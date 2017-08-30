/**
 * Create by liufeng on 2017/6/28
 */
import React from 'react';
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { hashHistory } from 'react-router';
import assign from 'object-assign';
import { searchSubmit, initTypeSer, initWarehouseSer, exportAll } from '../server';
import {
  searchSuccess, searchFail, initTypeSuccess, initTypeFail, initWarehouseSuccess, initWarehouseFail,
  exportAllFail, exportAllSuccess,
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

function* initTypeSaga() {
  const data = yield initTypeSer();
  if (data.error) {
    message.error(`获取一级分类失败: ${data.error}`);
    return yield put(initTypeFail());
  }
  return yield put(initTypeSuccess(data));
}

function* initWarehouseSaga() {
  const data = yield initWarehouseSer();
  if (data.error) {
    message.error(`获取仓库失败: ${data.error}`);
    return yield put(initWarehouseFail());
  }
  return yield put(initWarehouseSuccess(data));
}

export default function* () {
  yield takeLatest(TYPES.SEARCH, searchSaga);
  yield takeLatest(TYPES.EXPORT, exportSaga);
  yield takeEvery(TYPES.INIT_TYPE, initTypeSaga);
  yield takeEvery(TYPES.INIT_WAREHOUSE, initWarehouseSaga);
}
