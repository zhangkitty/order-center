/**
 * Create by liufeng on 2017/8/30
 */
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import {
  searchSubmit, seachHighSubmit,
  initCountrySer, initSiteSer, initPaymentSer, initTroubleSer,
  initMemberSer, initOrderSer, initCancelSer, initGoodsSer,
  operationGoodsSer,
  remarkSer, remarkSaveSer,
  logisticsRemarkSer, logisticsRemarkSaveSer,
} from '../server';
import {
  searchSuccess, searchFail, searchHighFail, searchHighSuccess,
  initCountrySuccess, initCountryFail, initSiteSuccess, initSiteFail,
  initPaymentFail, initPaymentSuccess, initTroubleFail, initTroubleSuccess,
  initMemberFail, initMemberSuccess, initOrderFail, initOrderSuccess,
  initCancelFail, initCancelSuccess, initGoodsFail, initGoodsSuccess,
  operationGoodsFail, operationGoodsSuccess,
  remarkShowFail, remarkShowSuccess, remarkSaveFail, remarkSaveSuccess,
  logisticsRemarkFail, logisticsRemarkSuccess, logisticsRemarkSaveFail, logisticsRemarkSaveSuccess,
} from './action';

import * as TYPES from './types';

function* searchSaga(action) {
  console.log(action.data, 'search');
  const {
    billno, orderId, email, shippingNo, referenceNumber, telephone, txnId, remarkUser, totalInput,
  } = action.data;
  const data = yield searchSubmit(assign({}, action.data, {
    billno: billno ? encodeURIComponent(billno.trim()) : null,
    orderId: orderId ? encodeURIComponent(orderId.trim()) : null,
    email: email ? encodeURIComponent(email.trim()) : null,
    shippingNo: shippingNo ? encodeURIComponent(shippingNo.trim()) : null,
    referenceNumber: referenceNumber ? encodeURIComponent(referenceNumber.trim()) : null,
    telephone: telephone ? encodeURIComponent(telephone.trim()) : null,
    txnId: txnId ? encodeURIComponent(txnId.trim()) : null,
    remarkUser: remarkUser ? encodeURIComponent(remarkUser.trim()) : null,
    totalInput: totalInput ? encodeURIComponent(totalInput.trim()) : null,
  }));
  if (data.error) {
    message.error(`搜索失败: ${data.msg}`);
    return yield put(searchFail());
  }
  return yield put(searchSuccess(data));
}

function* searchHighSaga(action) {
  const {
    goodsSn, count,
  } = action.data;
  const data = yield seachHighSubmit(assign({}, action.data, {
    goodsSn: goodsSn ? encodeURIComponent(goodsSn.trim()) : null,
    count: count ? encodeURIComponent(count.trim()) : null,
  }));
  if (data.error) {
    message.error(`高级搜索失败: ${data.msg}`);
    return yield put(searchHighFail());
  }
  return yield put(searchHighSuccess(data));
}

function* initCountrySaga() {
  const data = yield initCountrySer();
  if (!data || data.code !== 0) {
    message.error(`获取国家失败: ${data.msg}`);
    return yield put(initCountryFail());
  }
  return yield put(initCountrySuccess(data));
}

function* initSiteSaga() {
  const data = yield initSiteSer();
  if (!data || data.code !== 0) {
    message.error(`获取站点失败: ${data.msg}`);
    return yield put(initSiteFail());
  }
  return yield put(initSiteSuccess(data));
}

function* initPaymentSaga() {
  const data = yield initPaymentSer();
  if (!data || data.code !== 0) {
    message.error(`获取支付方式失败: ${data.msg}`);
    return yield put(initPaymentFail());
  }
  return yield put(initPaymentSuccess(data));
}

function* initTroubleSaga() {
  const data = yield initTroubleSer();
  if (!data || data.code !== 0) {
    message.error(`获取问题件类型失败: ${data.msg}`);
    return yield put(initTroubleFail());
  }
  return yield put(initTroubleSuccess(data));
}

function* initMemberSaga() {
  const data = yield initMemberSer();
  if (!data || data.code !== 0) {
    message.error(`获取会员等级失败: ${data.msg}`);
    return yield put(initMemberFail());
  }
  return yield put(initMemberSuccess(data));
}

function* initOrderSaga() {
  const data = yield initOrderSer();
  if (!data || data.code !== 0) {
    message.error(`获取订单状态失败: ${data.msg}`);
    return yield put(initOrderFail());
  }
  return yield put(initOrderSuccess(data));
}

function* initCancelSaga() {
  const data = yield initCancelSer();
  if (!data || data.code !== 0) {
    message.error(`获取取消类型失败: ${data.msg}`);
    return yield put(initCancelFail());
  }
  return yield put(initCancelSuccess(data));
}

function* initGoodsSaga() {
  const data = yield initGoodsSer();
  if (!data || data.code !== 0) {
    message.error(`获取商品状态失败: ${data.msg}`);
    return yield put(initGoodsFail());
  }
  return yield put(initGoodsSuccess(data));
}

// 商品操作查询
function* operationGoodsSaga(action) {
  console.log(action, 'action');
  console.log(action.id, 'action.id');
  const data = yield operationGoodsSer(action.id);
  if (!data || data.code !== 0) {
    message.error(`获取商品操作查询失败: ${data.msg}`);
    return yield put(operationGoodsFail());
  }
  return yield put(operationGoodsSuccess(data));
}

// 备注查看
function* remarkSaga(action) {
  const data = yield remarkSer(action.id);
  if (!data || data.code !== 0) {
    message.error(`获取备注失败: ${data.msg}`);
    return yield put(remarkShowFail());
  }
  return yield put(remarkShowSuccess(data));
}

// 备注更新
function* remarkSaveSaga(action) {
  const data = yield remarkSaveSer(action.orderId, action.remark); // assign({}, action.orderId, action.remark)
  if (!data || data.code !== 0) {
    message.error(`添加备注失败: ${data.msg}`);
    return yield put(remarkSaveFail());
  }
  message.success('添加备注成功');
  return yield put(remarkSaveSuccess());
}


// 物流备注查看
function* logisticsRemarkSaga(action) {
  const data = yield logisticsRemarkSer(action.id);
  if (!data || data.code !== 0) {
    message.error(`获取备注失败: ${data.msg}`);
    return yield put(logisticsRemarkFail());
  }
  return yield put(logisticsRemarkSuccess(action.id, data.data));
}

// 物流备注更新
function* logisticsRemarkSaveSaga(action) {
  const data = yield logisticsRemarkSaveSer(action.orderId, action.remark);
  if (!data || data.code !== 0) {
    message.error(`添加备注失败: ${data.msg}`);
    return yield put(logisticsRemarkSaveFail());
  }
  message.success('添加物流备注成功');
  return yield put(logisticsRemarkSaveSuccess({ orderId: action.orderId, mark: action.remark }));
}


export default function* () {
  yield takeLatest(TYPES.SEARCH, searchSaga);
  yield takeLatest(TYPES.SEARCH_HIGH, searchHighSaga);
  yield takeEvery(TYPES.INIT_COUNTRY, initCountrySaga);
  yield takeEvery(TYPES.INIT_SITE, initSiteSaga);
  yield takeEvery(TYPES.INIT_PAYMENT, initPaymentSaga);
  yield takeEvery(TYPES.INIT_TROUBLE, initTroubleSaga);
  yield takeEvery(TYPES.INIT_MEMBER, initMemberSaga);
  yield takeEvery(TYPES.INIT_ORDER, initOrderSaga);
  yield takeEvery(TYPES.INIT_CANCEL, initCancelSaga);
  yield takeEvery(TYPES.INIT_GOODS, initGoodsSaga);
  yield takeEvery(TYPES.OPERATION_GOODS, operationGoodsSaga);
  yield takeEvery(TYPES.REMARK, remarkSaga);
  yield takeEvery(TYPES.REMARK_SAVE, remarkSaveSaga);
  yield takeEvery(TYPES.LOGISITICS_REMARK, logisticsRemarkSaga);
  yield takeEvery(TYPES.LOGISITICS_REMARK_SAVE, logisticsRemarkSaveSaga);
}
