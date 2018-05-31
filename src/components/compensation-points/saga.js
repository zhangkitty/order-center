
import { message } from 'antd';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import * as types from './types';
import { changeValue } from './action';

import { pointRewardConfigSer, pointRewardListSer, changePageSer } from './server';


function* pointRewardConfigSaga(action) {
  const data = yield pointRewardConfigSer(action);
  if (data.code !== 0) {
    message.error(`${data.message}`);
  }
  yield put(changeValue('all_COD_status', Object.values(data.data.COD_status)));
  yield put(changeValue('all_country', data.data.country));
  yield put(changeValue('all_order_status', Object.values(data.data.order_status)));
  yield put(changeValue('all_pointType', data.data.pointType));
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


function* saga() {
  yield takeLatest(types.pointRewardConfig, pointRewardConfigSaga);
  yield takeLatest(types.pointRewardList, pointRewardListSaga);
}
export default saga;
