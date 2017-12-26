
import { message } from 'antd';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import * as types from './types';
import { commit, getDataSuccess, remarkShow, getData } from './action';
import { getFilters, getDataSer, getRemarks, addRemark, followTroubleSer, handledSer, uploadImgSer } from '../server';

const lan = {
  ofail: __('order.entry.submit_info'),
  osucess: __('order.entry.submit_info1'),
  fail: __('order.entry.submit_info6'),
  dataFail: __('order.entry.submit_info2'),
};

function* getFiltersSaga() {
  const data = yield getFilters();
  if (!data || data.code !== 0) {
    message.error(`${lan.fail}: ${data.msg}`);
    return yield put(commit('filtersLoad', false));
  }
  return yield put(commit('filters', data.data));
}
function* getDataSaga(action) {
  const data = yield getDataSer(action.filter);
  if (!data || data.code !== 0) {
    message.error(`${lan.fail}: ${data.msg}`);
    return yield put(commit('load', false));
  }
  yield put(getDataSuccess(data.data));
  return yield put(commit('load', false));
}

function* getRemarksSaga(action) {
  const data = yield getRemarks(action.id);
  if (!data || data.code !== 0) {
    message.error(`${lan.fail}: ${data.msg}`);
    return yield put(commit('remarkLoad', false));
  }
  yield put(commit('remarkData', data.data || []));
  return yield put(commit('remarkLoad', false));
}
function* addRemarkSaga(action) {
  const data = yield addRemark(action.id, action.remark);
  if (!data || data.code !== 0) {
    message.error(`${lan.ofail}: ${data.msg}`);
    return yield put(commit('remarkLoad', false));
  }
  message.success(lan.osucess);
  yield put(commit('remarkLoad', false));
  yield put(commit('remark', ''));
  return yield put(remarkShow(action.id));
}
function* followTroubleSaga(action) {
  const data = yield followTroubleSer(action.id);
  if (!data || data.code !== 0) {
    message.error(`${lan.fail}: ${data.msg}`);
    return yield put(commit('load', false));
  }
  yield put(commit('load', false));
  message.success(lan.osucess);
  return yield put(getData(action.filter));
}
function* handledSaga(action) {
  const data = yield handledSer(action.id, action.res);
  if (!data || data.code !== 0) {
    message.error(`${lan.fail}: ${data.msg}`);
    return yield put(commit('load', false));
  }
  yield put(commit('load', false));
  yield put(commit('handledShow', false));
  message.success(lan.osucess);
  return yield put(getData(action.filter));
}
function* uploadImgSaga(action) {
  const data = yield uploadImgSer(action.id, action.imgList);
  if (!data || data.code !== 0) {
    message.error(`${lan.fail}: ${data.msg}`);
    return yield put(commit('load', false));
  }
  yield put(commit('load', false));
  yield put(commit('uploadShow', false));
  message.success(lan.osucess);
  return yield put(getData(action.filter));
}
function* saga() {
  yield takeEvery(types.getFilters, getFiltersSaga);
  yield takeEvery(types.getData, getDataSaga);
  yield takeLatest(types.remarkShow, getRemarksSaga);
  yield takeLatest(types.addRemark, addRemarkSaga);
  yield takeLatest(types.followTrouble, followTroubleSaga);
  yield takeLatest(types.handled, handledSaga);
  yield takeLatest(types.uploadImg, uploadImgSaga);
}
export default saga;
