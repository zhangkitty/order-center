import { takeEvery, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as TYPES from './types';
import { getInfoSuccess, commit } from './action';
import { getToReturnGoodsInfo, toReturnGoodsSave } from '../server';
// TODO: lan
const lan = {
  ofail: '操作失败',
  osucess: '操作成功',
  fail: '获取数据失败',
  part: '加入部分发队列成功',
};
function* getInfoSaga(action) {
  const data = yield getToReturnGoodsInfo(action.oid, action.gid);
  if (!data || data.code !== 0) {
    return message.error(`${lan.fail}:${data.msg}`);
  }
  return yield put(getInfoSuccess(data.data));
}

function* saveSaga(action) {
  const data = yield toReturnGoodsSave(action.data);
  if (!data || data.code !== 0) {
    yield put(commit('load', false));
    return message.error(`${lan.fail}:${data.msg}`);
  }
  yield put(commit('load', false));
  return message.success(lan.osucess);
}

export default function* () {
  yield takeEvery(TYPES.GET_INFO, getInfoSaga);
  yield takeEvery(TYPES.SAVE, saveSaga);
}
