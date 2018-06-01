
import { message } from 'antd';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import * as types from './types';
import { changeValue, pointRewardList } from './action';

import { pointRewardConfigSer, pointRewardListSer, addPointRewardHandleSer, editPointRewardHandleSer, copyPointRewardHandleSer, delPointRewardSer } from './server';


function* pointRewardConfigSaga(action) {
  const data = yield pointRewardConfigSer(action);
  if (data.code !== 0) {
    message.error(`${data.message}`);
  }
  const tempPointType = [];
  Object.values(data.data.pointType.data).map(v => v.map(k => tempPointType.push(k)));
  yield put(changeValue('all_COD_status', Object.values(data.data.COD_status)));
  yield put(changeValue('all_country', data.data.country));
  yield put(changeValue('all_order_status', Object.values(data.data.order_status)));
  yield put(changeValue('all_pointType', tempPointType));
  yield put(changeValue('all_siteFrom', data.data.siteFrom.data));
}

function* pointRewardListSaga(action) {
  const data = yield pointRewardListSer(action);
  if (data.code !== 0) {
    return message.error(`${data.message}`);
  }
  yield put(changeValue('dataSource', data.list.data));
  yield put(changeValue('total', data.list.count));
  return null;
}

function* addPointRewardHandleSaga(action) {
  const data = yield addPointRewardHandleSer(action);
  if (data.code !== 0) {
    return message.error(`${data.message}`);
  }
  message.success(`${data.message}`);
  yield put(pointRewardList(action.props));
  yield put(changeValue('modalShow2', false));
  yield put(changeValue('selectedRows2', []));
  yield put(changeValue('selectedRowKeys2', []));
  yield put(changeValue('COD_status2', null));
  yield put(changeValue('country2', []));
  yield put(changeValue('order_status2', null));
  yield put(changeValue('siteFrom2', []));
  return null;
}

function* editPointRewardHandleSaga(action) {
  const data = yield editPointRewardHandleSer(action);
  if (data.code !== 0) {
    return message.error(`${data.message}`);
  }
  message.success(`${data.message}`);
  yield put(pointRewardList(action.props));
  yield put(changeValue('modalShow3', false));
  yield put(changeValue('selectedRows3', []));
  yield put(changeValue('selectedRowKeys3', []));
  yield put(changeValue('COD_status3', null));
  yield put(changeValue('country3', []));
  yield put(changeValue('order_status3', null));
  yield put(changeValue('siteFrom3', []));
  return null;
}


function* copyPointRewardHandleSaga(action) {
  const data = yield copyPointRewardHandleSer(action);
  if (data.code !== 0) {
    return message.error(`${data.message}`);
  }
  message.success(`${data.message}`);
  yield put(pointRewardList(action.props));
  yield put(changeValue('modalShow4', false));
  yield put(changeValue('selectedRows4', []));
  yield put(changeValue('selectedRowKeys4', []));
  yield put(changeValue('COD_status4', null));
  yield put(changeValue('country4', []));
  yield put(changeValue('order_status4', null));
  yield put(changeValue('siteFrom4', []));
  return null;
}

function* delPointRewardSaga(action) {
  const data = yield delPointRewardSer(action);
  if (data.code !== 0) {
    return message.error(`${data.message}`);
  }
  message.success(`${data.message}`);
  yield put(changeValue('listselectedRows', []));
  yield put(changeValue('listselectedRowKeys', []));
  yield put(pointRewardList(action.props));
  return null;
}


function* saga() {
  yield takeLatest(types.pointRewardConfig, pointRewardConfigSaga);
  yield takeLatest(types.pointRewardList, pointRewardListSaga);
  yield takeLatest(types.addPointRewardHandle, addPointRewardHandleSaga);
  yield takeLatest(types.editPointRewardHandle, editPointRewardHandleSaga);
  yield takeLatest(types.copyPointRewardHandle, copyPointRewardHandleSaga);
  yield takeLatest(types.delPointReward, delPointRewardSaga);
}
export default saga;
