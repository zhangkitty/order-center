import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import { hashHistory } from 'react-router';
import assign from 'object-assign';
import * as TYPES from './types';

import {
  commit, getInfo, getInfoSuccess, updateEmailSuccess, backGoodsDatesSuccess, examineSuccess,
  operationGoodsSuccess,
  remarkShowSuccess, remarkSaveSuccess, remarkShow,
  switchRemarkSet, questionRemarkSaveSet, switchRemark,
} from './action';

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
  operationGoodsSer,
  remarkSer,
  remarkSaveSer,
  getTroubleTypes,
  trackTroublePublish,
  refundAccountSer,
  confirmReceivedServer,
  switchRemarkSer,
  questionRemarkSer,
} from '../server';

const lan = {
  ofail: __('order.entry.submit_info'),   // 操作失败
  osucess: __('order.entry.submit_info1'),  // 操作成功
  fail: __('order.entry.submit_info6'), // 获取数据失败
  part: __('order.entry.submit_info7'), // 加入部分发队列成功
  dataFail: __('order.entry.submit_info2'), // 获取数据失败
  shipping_error: __('order.entry.confirm_received_error'),
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
 // console.log(action, 'action,优先发货');
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
  if (data.data === null) {
    yield put(commit('reFeeValue', 0));
  }
}

// 提交RL费用
function* rebuildrlSaga(action) {
  const data = yield rebuildrlSer(action.d);
  yield put(commit('confirmLoading', false));
  if (!data || data.code !== 0) {
    return message.warning(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('reFeeValue', 0));
  yield message.success(`${data.msg}`);
  yield put(commit('rlmodal', false));
  yield put(getInfo(action.d.order_id, action.d.billno, 'orderReturn'));
}


// 商品操作查询
function* operationGoodsSaga(action) {
  const data = yield operationGoodsSer(action.id);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle10')}${data.msg}`);
    yield put(commit('load', 'false'));
    return yield put(commit('operationVisible', 'true'));
   // return yield put(operationGoodsFail());
  }
  return yield put(operationGoodsSuccess(data));
}

// 备注查看
function* remarkSaga(action) {
  const data = yield remarkSer(action.id);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle11')} ${data.msg}`);
    yield put(commit('load', 'false'));
    return yield put(commit('clickVisible', 'true'));
  //  return yield put(remarkShowFail());
  }
  return yield put(remarkShowSuccess(data));
}

// 备注更新
function* remarkSaveSaga(action) {
  const data = yield remarkSaveSer(action.orderId, action.remark);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle12')}${data.msg}`);
    return yield put(commit('loadUpdata', 'false'));
    // return yield put(remarkSaveFail());
  }
  message.success(__('common.sagaTitle13'));
  yield put(remarkShow(action.orderId));
  return yield put(remarkSaveSuccess({ orderId: action.orderId, mark: action.remark }));
}
// 获取物流反馈问题原因
function* getTrackTroubleReason() {
  const data = yield getTroubleTypes();
  if (!data || data.code !== 0) {
    message.error(`${lan.dataFail}: ${data.msg}`);
    return yield put(commit('trackTroubleLoad', false));
  }
  yield put(commit('trackTroubleShow', true));
  yield put(commit('trackTroubleLoad', false));
  return yield put(commit('trackTroubleTypes', data.data));
}
// 获取物流反馈问题创建
function* trackTroubleSubmit(action) {
  const data = yield trackTroublePublish(action.form);
  if (!data || data.code !== 0) {
    message.error(`${lan.ofail}: ${data.msg}`);
    return yield put(commit('trackTroubleForm', assign({}, action.form, { trackTroubleSubmitLoad: false })));
  }
  yield put(commit('trackTroubleForm', assign({}, action.form, { trackTroubleSubmitLoad: false })));
  yield put(commit('trackTroubleShow', false));
  return message.success(lan.osucess);
}

// 填写退款账号
function* refundAccountSaga(action) {
  const data = yield refundAccountSer(action.data);
  if (!data || data.code !== 0) {
    return message.error(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('RefundShow', false));
  return message.success(lan.osucess);
}
// 确认收货
function* confirmReceivedSaga({ deliveryNumber, id, bill, base }) {
  if (!deliveryNumber) {
    message.error(lan.shipping_error);
    return;
  }
  const result = yield confirmReceivedServer(deliveryNumber);
  if (result.code === 0) {
    message.success(lan.osucess);
    yield put(getInfo(id, bill, base));
  } else {
    message.error(`${lan.ofail}:${result.msg}`);
  }
}
// 物流问题反馈备注查看
function* switchRemarkSaga(action) {
  const data = yield switchRemarkSer(action.types, action.numbers);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle11')} ${data.msg}`);
  }
  return yield put(switchRemarkSet(data.data));
}

// 物流问题反馈备注保存
function* questionRemarkSaga(action) {
  console.log(action.numbers);
  const data = yield questionRemarkSer(action.types, action.note, action.numbers);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle12')}${data.msg}`);
  }
  message.success(__('common.sagaTitle13'));
  yield put(questionRemarkSaveSet());
  yield put(switchRemark(action.types, action.numbers));
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
  yield takeEvery(TYPES.OPERATION_GOODS, operationGoodsSaga);
  yield takeEvery(TYPES.REMARK, remarkSaga);
  yield takeEvery(TYPES.REMARK_SAVE, remarkSaveSaga);
  yield takeLatest(TYPES.TRACK_TROUBLE, getTrackTroubleReason);
  yield takeLatest(TYPES.TRACK_TROUBLE_SUBMIT, trackTroubleSubmit);
  yield takeLatest(TYPES.REFUND_ACCOUNT, refundAccountSaga);
  yield takeLatest(TYPES.CONFIRM_RECEIVED, confirmReceivedSaga);
  yield takeLatest(TYPES.SWITCH_REMARK, switchRemarkSaga);
  yield takeLatest(TYPES.QUESTION_REMARK_SAVE, questionRemarkSaga);
}
