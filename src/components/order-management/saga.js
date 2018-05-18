import assign from 'object-assign';
import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as types from './types';
import {
  getListPlatFormSer,
  getListLogisticChannelSer,
  changePageSer,
  addLogisticChannelSer,
  editSer,
  delLogisticChannelSer,
  modifyLogisticChannelSer,
} from './server';
import {
  change,
  fetchEditDataSuccess, getListLogisticChannel,
} from './action';

export function* getListPlatFormSaga(action) {
  const data = yield getListPlatFormSer(action);
  if (data.code !== 0) {
    return message.info(`${data.msg}`);
  }
  return yield put(change('allPlatForm', data.data.platform_list));
}

export function* getListLogisticChannelSaga(action) {
  const data = yield getListLogisticChannelSer(action);
  if (!data && data.code !== 0) {
    return message.info(`${data.msg}`);
  }
  yield put(change('totalItem', data.data.total_count));
  yield put(change('currentPage', 1));
  return yield put(change('logistic_channel_list', data.data.logistic_channel_list));
}

export function* changePageSaga(action) {
  const data = yield changePageSer(action);
  if (data.code !== 0) {
    return message.info(`${data.msg}`);
  }
  yield put(change('currentPage', action.page));
  yield put(change('page_size', action.pageSize));
  return yield put(change('logistic_channel_list', data.data.logistic_channel_list));
}

export function* addLogisticChannelSaga(action) {
  const data = yield addLogisticChannelSer(action);
  if (data.code !== 0) {
    return message.info(`${data.msg}`);
  }
  yield put(change('addShow', false));
  yield put(change('addLogistics1', ''));
  yield put(change('addLogistics2', ''));
  yield put(change('addTrackSite', ''));
  yield put(change('Logistics1', ''));
  yield put(change('Logistics2', ''));
  yield put(getListLogisticChannel(assign({}, action.props, {
    Logistics1: '',
    Logistics2: '',
  })));
  return message.info(`${data.msg}`);
}

export function* editSaga(action) {
  const data = yield editSer(action);
  if (data.code !== 0) {
    return message.info(`${data.msg}`);
  }
  yield put(change('id', action.id));
  yield put(change('editShow', true));
  yield put(fetchEditDataSuccess(data.data));
  return null;
}

export function* delLogisticChannelSaga(action) {
  const data = yield delLogisticChannelSer(action);
  if (data.code !== 0) {
    return message.info(`${data.msg}`);
  }
  message.success(`${data.msg}`);
  yield put(change('selectedRows', []));
  yield put(change('selectedRowKeys', []));
  yield put(getListLogisticChannel(action.props));
  return null;
}

export function* modifyLogisticChannelSaga(action) {
  const data = yield modifyLogisticChannelSer(action);
  if (data.code !== 0) {
    return message.info(`${data.msg}`);
  }
  message.success(`${data.msg}`);
  yield put(change('editShow', false));
  yield put(getListLogisticChannel(action.props));
  return null;
}


export default function* () {
  yield takeLatest(types.getListPlatForm, getListPlatFormSaga);
  yield takeLatest(types.getListLogisticChannel, getListLogisticChannelSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.addLogisticChannel, addLogisticChannelSaga);
  yield takeLatest(types.edit, editSaga);
  yield takeLatest(types.delLogisticChannel, delLogisticChannelSaga);
  yield takeLatest(types.modifyLogisticChannel, modifyLogisticChannelSaga);
}
