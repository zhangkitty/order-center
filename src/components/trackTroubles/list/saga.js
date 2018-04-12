
import { message } from 'antd';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import { hashHistory } from 'react-router';
import * as types from './types';
import { commit, getDataSuccess, remarkShow, getData, getStatusAllSet, followShowSet } from './action';
import { getFilters, getDataSer, getRemarks, addRemark, followTroubleSer, followUpSer,
  handledSer, uploadImgSer, getStatusAllSer, exportId, followShow } from '../server';

const FileSaver = require('file-saver');

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
  const data = yield followTroubleSer(action.id, action.handleStatus);
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

// 获取不同处理状态汇总信息
function* getStatusAllSage() {
  const data = yield getStatusAllSer();
  if (!data || data.code !== 0) {
    message.error(`${lan.fail}: ${data.msg}`);
    return yield put(commit('load', false));
  }
  yield put(getStatusAllSet(data.data));
  return yield put(commit('load', false));
}
// 批量导出
function* exportIdSer(action) {
  const data = yield exportId({ ids: action.data });
  const name = (new Date()).toLocaleString();
  FileSaver.saveAs(data, `${name}.xls`);
}
// 获取问题认领对应的选项配置列表
function* handleStatusSer() {
  const data = yield followShow();
  if (!data || data.code !== 0) {
    message.error(`${lan.fail}: ${data.msg}`);
  }
  return yield put(followShowSet(data.data));
}
// 跟进客服管理
function* followUpSaga() {
  const data = yield followUpSer();
  if (data && data.msg === 'no access') {
    return message.error(`${data.msg}`);
  }
  return hashHistory.push('customer-service');
}
function* saga() {
  yield takeEvery(types.getFilters, getFiltersSaga);
  yield takeEvery(types.getData, getDataSaga);
  yield takeLatest(types.getStatusAll, getStatusAllSage);
  yield takeLatest(types.remarkShow, getRemarksSaga);
  yield takeLatest(types.addRemark, addRemarkSaga);
  yield takeLatest(types.followTrouble, followTroubleSaga);
  yield takeLatest(types.handled, handledSaga);
  yield takeLatest(types.uploadImg, uploadImgSaga);
  yield takeLatest(types.exportOrder, exportIdSer);
  yield takeLatest(types.followShow, handleStatusSer);
  yield takeLatest(types.followUp, followUpSaga);
}
export default saga;
