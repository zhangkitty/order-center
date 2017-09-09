import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import * as TYPES from './types';
import { commit, getInfoSuccess, updateEmailSuccess, backGoodsDatesSuccess } from './action';
import { getInfo, updateEmailSer, backGoodsDatesSer, operateReturnSer, partSendSer } from '../server';

const lan = {
  ofail: '操作失败',
  osucess: '操作成功',
  fail: '获取数据失败',
  part: '加入部分发队列成功',
};
/* eslint prefer-const: 0 */
/* eslint consistent-return: 0 */
function* getInfoSaga(action) {
  const data = yield getInfo(action.id, action.bill);
  let dataSource = {};
  Object.keys(data).forEach((v) => {
    if (!data[v] || data[v].code !== 0) {
      return message.error(`${lan.fail}:${data[v].msg}`);
    }
    dataSource[v] = data[v].data;
  });
  yield put(getInfoSuccess(dataSource));
}

function* updateEmailSaga(action) {
  const data = yield updateEmailSer(action.id, action.email);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.fail}:${data[v].msg}`);
  }
  return yield put(updateEmailSuccess(action.email));
}

function* backGoodsDatesSaga(action) {
  const data = yield backGoodsDatesSer(action.data);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.fail}:${data.msg}`);
  }
  return yield put(backGoodsDatesSuccess(data.data));
}
function* operateReturnSaga(action) {
  const data = yield operateReturnSer(action.oid, action.gid);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.fail}:${data.msg}`);
  }
  // TODO: 跳转
  return message.success(lan.osucess);
}
function* partSendSaga(action) {
  const data = yield partSendSer(action.oid, action.w);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('partSendBtn', true));
  return message.success(lan.part);
}
export default function* () {
  yield takeEvery(TYPES.GET_INFO, getInfoSaga);
  yield takeLatest(TYPES.UPDATE_EAMIL, updateEmailSaga);
  yield takeLatest(TYPES.BACK_GOODS_DATES, backGoodsDatesSaga);
  yield takeLatest(TYPES.OPERATE_RETURN, operateReturnSaga);
  yield takeLatest(TYPES.PART_SEND, partSendSaga);
};

