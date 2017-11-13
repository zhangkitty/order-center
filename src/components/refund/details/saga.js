import {takeEvery, put, takeLatest} from "redux-saga/effects";
import {message} from "antd";
import assign from "object-assign";
import * as TYPES from "./types";
import {
  commit,
  getInfo,
  getInfoSuccess,
  remarkInfoSuccess,
  refundFail,
  refundSucess,
  doRefundFail,
  reverseRefundSaveFail
} from "./action";
import {
  getRefundDetailsInfo,
  remarkInfoSer,
  addRemarkInfoSer,
  rejectInfoSer,
  refundSer,
  doRefundSer,
  doRefundAgainSer,
  doRefundPassSer,
  changeOrderSer
} from "../server";

const lan = {
  ofail: __('order.entry.submit_info'),
  osucess: __('order.entry.submit_info1'),
  fail: __('order.entry.submit_info2'),
  part: __('order.entry.submit_info3'),
};
function* getInfoSaga(action) {
  const data = yield getRefundDetailsInfo(action.id);
  if (!data || data.code !== 0) {
    return message.error(`${lan.fail}:${data.msg}`);
  }
  return yield put(getInfoSuccess(data.data));
}
function* remarkInfoSaga(action) {
  const data = yield remarkInfoSer(action.id);
  if (!data || data.code !== 0) {
    yield put(commit('remarkInfo', assign({}, action.remarkInfo, { load: false })));
    return message.error(`${lan.fail}:${data.msg}`);
  }
  return yield put(remarkInfoSuccess(data.data));
}

function* addRemarkSaga(action) {
  const data = yield addRemarkInfoSer(action.id, action.info.remark);
  yield put(commit('addRemarkInfo', assign({}, action.info, { load: false })));
  if (!data || data.code !== 0) {
    return message.error(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('addRemarkInfo', assign({}, action.info, { reamrkShow: false })));
  return message.success(lan.osucess);
}

function* rejectInfoSaga(action) {
  const data = yield rejectInfoSer(action.id, action.info.reason);
  yield put(commit('rejectInfo', assign({}, action.info, { load: false })));
  if (!data || data.code !== 0) {
    return message.error(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('rejectInfo', assign({}, action.info, { reamrkShow: false })));
  message.success(lan.osucess);
  return yield put(getInfo(action.id));
}
function* refundSaga(action) {
  const data = yield refundSer(action.record_id);
  if (!data || data.code !== 0) {
    yield put(refundFail());
    return message.error(`${lan.fail}:${data.msg}`);
  }

  return yield put(refundSucess(assign({}, action, data.data)));
}

function* doRefundSaga(action) {
  const data = yield doRefundSer(action.data);
  if (!data || data.code !== 0) {
    yield put(doRefundFail());
    return message.error(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('refundInfo', { load: false, saveLoad: false, data: {} }));
  yield put(getInfo(action.data.refund_bill_id));  // 成功后调这个接口，页面刷新
  return message.success(lan.osucess);
}
function* doRefundAgainSaga(action) {
  const data = yield doRefundAgainSer(action.data);
  if (!data || data.code !== 0) {
    yield put(reverseRefundSaveFail());
    return message.error(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('reverseRefund', { saveLoad: false, show: false, data: {} }));
  yield put(getInfo(action.refundBillId));  // 成功后调这个接口，页面刷新
  return message.success(lan.osucess);
}
function* doRefundPassSaga(action) {
  const data = yield doRefundPassSer(action.data);
  if (!data || data.code !== 0) {
    return message.error(`${lan.ofail}:${data.msg}`);
  }
  yield put(getInfo(action.data.refund_bill_id));
  return message.success(lan.osucess);
}

// 更改订单号
function* changeOrderSaga(action) {
  const data = yield changeOrderSer(action.billno, action.refundBillId);
  if (!data || data.code !== 0) {
    return message.error(`${lan.ofail}:${data.msg}`);
  }
  yield put(commit('changeOrderInfo', assign({}, { show: false, billno: '' })));
  yield put(getInfo(action.refundBillId));  // 成功后调这个接口，页面刷新
  return message.success(lan.osucess);
}

export default function* () {
  yield takeEvery(TYPES.GET_INFO, getInfoSaga);
  yield takeLatest(TYPES.REMARK_INFO, remarkInfoSaga);
  yield takeLatest(TYPES.ADD_REMARK_INFO, addRemarkSaga);
  yield takeLatest(TYPES.REJECT_INFO, rejectInfoSaga);
  yield takeLatest(TYPES.REFUND, refundSaga);
  yield takeLatest(TYPES.DO_REFUND, doRefundSaga);
  yield takeLatest(TYPES.REVERSE_REFUND_SAVE, doRefundAgainSaga);
  yield takeLatest(TYPES.DO_REFUND_PASS, doRefundPassSaga);
  yield takeLatest(TYPES.CHANGE_ORDER, changeOrderSaga);
}
