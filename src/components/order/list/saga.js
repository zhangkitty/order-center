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
} from '../server';
import {
  searchSuccess, searchFail, searchHeightFail, searchHeightSuccess,
  initCountrySuccess, initCountryFail, initSiteSuccess, initSiteFail,
  initPaymentFail, initPaymentSuccess, initTroubleFail, initTroubleSuccess,
  initMemberFail, initMemberSuccess, initOrderFail, initOrderSuccess,
  initCancelFail, initCancelSuccess, initGoodsFail, initGoodsSuccess,
  operationGoodsFail, operationGoodsSuccess,
  remarkShowFail, remarkShowSuccess, remarkSaveFail, remarkSaveSuccess,
} from './action';

import * as TYPES from './types';

function* searchSaga(action) {
  const {
    billno, orderId, email, shippingNo, referenceNumber, telephone, txnId, remarkUser, totalInput,
  } = action.data;
  const data = yield searchSubmit(assign({}, action.data, {
    billno: billno ? encodeURIComponent(billno.trim()) : null,
    orderId: billno ? encodeURIComponent(orderId.trim()) : null,
    email: billno ? encodeURIComponent(email.trim()) : null,
    shippingNo: billno ? encodeURIComponent(shippingNo.trim()) : null,
    referenceNumber: billno ? encodeURIComponent(referenceNumber.trim()) : null,
    telephone: billno ? encodeURIComponent(telephone.trim()) : null,
    txnId: billno ? encodeURIComponent(txnId.trim()) : null,
    remarkUser: billno ? encodeURIComponent(remarkUser.trim()) : null,
    totalInput: billno ? encodeURIComponent(totalInput.trim()) : null,
  }));
  if (data.error) {
    message.error(`搜索失败: ${data.error}`);
    return yield put(searchFail());
  }
  return yield put(searchSuccess(data));
}

function* searchHeightSaga(action) {
  const {
    goodsSn, count,
  } = action.data;
  const data = yield seachHighSubmit(assign({}, action.data, {
    goodsSn: goodsSn ? encodeURIComponent(goodsSn.trim()) : null,
    count: count ? encodeURIComponent(count.trim()) : null,
  }));
  if (data.error) {
    message.error(`高级搜索失败: ${data.error}`);
    return yield put(searchHeightFail());
  }
  return yield put(searchHeightSuccess(data));
}

function* initCountrySaga() {
  const data = yield initCountrySer();
  if (!data || data.code !== 0) {
    message.error(`获取国家列表失败: ${data.error}`);
    return yield put(initCountryFail());
  }
  return yield put(initCountrySuccess(data));
}

function* initSiteSaga() {
  const data = yield initSiteSer();
  if (!data || data.code !== 0) {
    message.error(`获取站点列表失败: ${data.error}`);
    return yield put(initSiteFail());
  }
  return yield put(initSiteSuccess(data));
}

function* initPaymentSaga() {
  const data = yield initPaymentSer();
  if (!data || data.code !== 0) {
    message.error(`获取支付方式失败: ${data.error}`);
    return yield put(initPaymentFail());
  }
  return yield put(initPaymentSuccess(data));
}

function* initTroubleSaga() {
  const data = yield initTroubleSer();
  if (!data || data.code !== 0) {
    message.error(`获取问题件类型失败: ${data.error}`);
    return yield put(initTroubleFail());
  }
  return yield put(initTroubleSuccess(data));
}

function* initMemberSaga() {
  const data = yield initMemberSer();
  if (!data || data.code !== 0) {
    message.error(`获取问题件类型失败: ${data.error}`);
    return yield put(initMemberFail());
  }
  return yield put(initMemberSuccess(data));
}

function* initOrderSaga() {
  const data = yield initOrderSer();
  if (!data || data.code !== 0) {
    message.error(`获取问题件类型失败: ${data.error}`);
    return yield put(initOrderFail());
  }
  return yield put(initOrderSuccess(data));
}

function* initCancelSaga() {
  const data = yield initCancelSer();
  if (!data || data.code !== 0) {
    message.error(`获取取消类型失败: ${data.error}`);
    return yield put(initCancelFail());
  }
  return yield put(initCancelSuccess(data));
}

function* initGoodsSaga() {
  const data = yield initGoodsSer();
  if (!data || data.code !== 0) {
    message.error(`获取商品状态失败: ${data.error}`);
    return yield put(initGoodsFail());
  }
  return yield put(initGoodsSuccess(data));
}

// 商品操作查询
function* operationGoodsSaga(action) {
  const data = yield operationGoodsSer(assign({}, action.data));
  if (!data || data.code !== 0) {
    message.error(`获取商品操作查询失败: ${data.error}`);
    return yield put(operationGoodsFail());
  }
  return yield put(operationGoodsSuccess(data));
}

// 备注查看
function* remarkSaga(action) {
  const data = yield remarkSer(action.id);
  if (!data || data.code !== 0) {
    message.error(`获取备注失败: ${data.error}`);
    return yield put(remarkShowFail());
  }
  return yield put(remarkShowSuccess(data));
}

// 备注更新
function* remarkSaveSaga(action) {
  const data = yield remarkSaveSer(action.orderId, action.remark); // assign({}, action.orderId, action.remark)
  if (!data || data.code !== 0) {
    message.error(`添加备注失败: ${data.error}`);
    return yield put(remarkSaveFail());
  }
  return yield put(remarkSaveSuccess());
}


export default function* () {
  yield takeLatest(TYPES.SEARCH, searchSaga);
  yield takeLatest(TYPES.SEARCH_HEIGHT, searchHeightSaga);
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
}
