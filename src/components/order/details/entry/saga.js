import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import { hashHistory } from 'react-router';
import * as TYPES from './types';
import { commit, getInfo, getInfoSuccess, updateEmailSuccess, backGoodsDatesSuccess, examineSuccess } from './action';
import {
  getInfoSer,
  rebuildrlSer,
  updateEmailSer,
  backGoodsDatesSer,
  operateReturnSer,
  partSendSer,
  preSendSer,
  examineSer,
  uploadtrack,
  profitShowSer,
  genRlSer,
  cancelRefundSer,
  fetchrlfeeSer,
} from '../server';

const lan = {
  ofail: __('order.entry.submit_info'),
  osucess: __('order.entry.submit_info1'),
  fail: __('order.entry.submit_info6'),
  part: __('order.entry.submit_info7'),
};
/* eslint prefer-const: 0 */
/* eslint consistent-return: 0 */
function* getInfoSaga(action) {
  const promise = getInfoSer(action.id, action.bill)[action.key];
  const data = yield promise();
  if (!data || data.code !== 0) {
    return message.warning(`${lan.fail}:${data.msg}`);
  }

  return yield put(getInfoSuccess(data.data, action.key));
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
// 优先发货
function* preSendSaga(action) {
  console.log(action, 'action,优先发货');
  const data = yield preSendSer(action.oid, action.sendType);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }

  yield put(getInfo(action.oid, action.billno, action.activeKey));
 // yield put(commit('preSend', +!action.sendType));
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
  const data = yield genRlSer(action.id, action.oid);
  yield put(commit('rlLoading', false));
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  return yield put(getInfo(action.oid, action.bid, 'orderReturn'));
}
function* cancelRefundSaga(action) {
  const data = yield cancelRefundSer(action.id);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  return message.success(lan.osucess);
}
// 获取RL费用
function* fetchrlfeeSaga(action) {
  const data = yield fetchrlfeeSer(action.id);
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('rlFee', data.data));
}

// 提交RL费用
function* rebuildrlSaga(action) {
  const data = yield rebuildrlSer(action.d);
  yield put(commit('confirmLoading', false));
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  return message.success(`${data.msg}`);
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
  yield takeLatest(TYPES.CANCEL_REFUND, cancelRefundSaga);
  yield takeLatest(TYPES.FETCHRLFEE, fetchrlfeeSaga);
  yield takeLatest(TYPES.REBUILDRL, rebuildrlSaga);
}
