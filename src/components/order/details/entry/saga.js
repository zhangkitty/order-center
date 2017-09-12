import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import { hashHistory } from 'react-router';
import * as TYPES from './types';
import { commit, getInfoSuccess, updateEmailSuccess, backGoodsDatesSuccess, examineSuccess } from './action';
import { getInfo, updateEmailSer, backGoodsDatesSer, operateReturnSer, partSendSer, preSendSer, examineSer, uploadtrack, profitShowSer, genRlSer } from '../server';

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
    return message.warning(`${lan.fail}:${data.msg}`);
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
  return hashHistory.push(`order/details/to-return-goods/${action.oid}/${action.gid}`);
}
function* partSendSaga(action) {
  const data = yield partSendSer(action.oid, action.w);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('partSendBtn', true));
  return message.success(lan.part);
}
function* preSendSaga(action) {
  const data = yield preSendSer(action.oid, action.sendType);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('preSend', +!action.sendType));
  return message.success(lan.osucess);
}
function* examineSaga(action) {
  const data = yield examineSer(action.oid);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  yield put(examineSuccess());
  return message.success(lan.osucess);
}
function* uploadTrackSaga(action) {
  const data = yield uploadtrack(action.data);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('uploadTrack', { show: false }));
  return message.success(lan.osucess);
}
function* profitShowSaga(action) {
  const data = yield profitShowSer(action.id);
  if (!data || data.code !== 0) {
    yield put(commit('profitLoad', false));
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('profitShow', true));
  yield put(commit('profitLoad', false));
  return yield put(commit('profit', data.data));
}
function* genRlSaga(action) {
  const data = yield genRlSer(action.id);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  return hashHistory.push(`/order/details/entry/${action.oid}/${action.bid}/goods_rejected`);
}
export default function* () {
  yield takeEvery(TYPES.GET_INFO, getInfoSaga);
  yield takeLatest(TYPES.UPDATE_EAMIL, updateEmailSaga);
  yield takeLatest(TYPES.BACK_GOODS_DATES, backGoodsDatesSaga);
  yield takeLatest(TYPES.OPERATE_RETURN, operateReturnSaga);
  yield takeLatest(TYPES.PART_SEND, partSendSaga);
  yield takeLatest(TYPES.PRE_SEND, preSendSaga);
  yield takeLatest(TYPES.EXAMINE, examineSaga);
  yield takeLatest(TYPES.UPLOAD_TRACK, uploadTrackSaga);
  yield takeLatest(TYPES.PROFIT_SHOW, profitShowSaga);
  yield takeLatest(TYPES.GEN_RL, genRlSaga);
}
