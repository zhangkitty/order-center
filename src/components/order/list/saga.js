/**
 * Create by liufeng on 2017/8/30
 */
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import {
  searchSubmit, seachHighSubmit, seachHistorySubmit,
  initCountrySer, initSiteSer, initPaymentSer, initTroubleSer,
  initMemberSer, initOrderSer, initCancelSer, initGoodsSer,
  operationGoodsSer,
  remarkSer, remarkSaveSer,
  logisticsRemarkSer, logisticsRemarkSaveSer,
  goodSizeSer, changeGoodsSer,
  batchOperateSer, getRisk, cancelTroubleTag,
  updateOrderTagSer, delChangeSer,
} from '../server';
import {
  searchSuccess, searchFail, searchHighFail, searchHighSuccess, searchHistoryFail, searchHistorySuccess,
  initCountrySuccess, initCountryFail, initSiteSuccess, initSiteFail,
  initPaymentFail, initPaymentSuccess, initTroubleFail, initTroubleSuccess,
  initMemberFail, initMemberSuccess, initOrderFail, initOrderSuccess,
  initCancelFail, initCancelSuccess, initGoodsFail, initGoodsSuccess,
  operationGoodsFail, operationGoodsSuccess,
  remarkShowFail, remarkShowSuccess, remarkSaveFail, remarkSaveSuccess,
  logisticsRemarkFail, logisticsRemarkSuccess, logisticsRemarkSaveFail, logisticsRemarkSaveSuccess,
  goodSizeFail, goodSizeSuccess, changeGoodsFail, changeGoodsSuccess,
  cancelRiskSuccess, cancelTroubleTagSuccess, updateOrderTagSuccess,
  delChangeFail, delChangeSuccess,
} from './action';

import * as TYPES from './types';

function* searchSaga(action) {
 // console.log(action.data, 'search');
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
    message.error(`${__('common.sagaTitle')}${data.msg}`);
    return yield put(searchFail());
  }
  return yield put(searchSuccess(data));
}

function* searchHighSaga(action) {
 // console.log(action.data, 'search-high');
  const {
    goodsSn, count,
  } = action.data;
  const data = yield seachHighSubmit(assign({}, action.data, {
    goodsSn: goodsSn ? encodeURIComponent(goodsSn.trim()) : null,
    count: count ? encodeURIComponent(count.trim()) : null,
  }));
  if (data.error) {
    message.error(`${__('common.sagaTitle1')} ${data.msg}`);
    return yield put(searchHighFail());
  }
  return yield put(searchHighSuccess(data));
}

function* searchHistorySaga(action) {
  console.log(action.data, 'search-high');
  const data = yield seachHistorySubmit(assign({}, action.data));
  if (data.error) {
    message.error(`${__('common.sagaTitle')} ${data.msg}`);
    return yield put(searchHistoryFail());
  }
  return yield put(searchHistorySuccess(data));
}

function* initCountrySaga() {
  const data = yield initCountrySer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle2')} ${data.msg}`);
    return yield put(initCountryFail());
  }
  return yield put(initCountrySuccess(data));
}

function* initSiteSaga() {
  const data = yield initSiteSer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle3')}${data.msg}`);
    return yield put(initSiteFail());
  }
  return yield put(initSiteSuccess(data));
}

function* initPaymentSaga() {
  const data = yield initPaymentSer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle4')}${data.msg}`);
    return yield put(initPaymentFail());
  }
  return yield put(initPaymentSuccess(data));
}

function* initTroubleSaga() {
  const data = yield initTroubleSer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle5')}${data.msg}`);
    return yield put(initTroubleFail());
  }
  return yield put(initTroubleSuccess(data));
}

function* initMemberSaga() {
  const data = yield initMemberSer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle6')}${data.msg}`);
    return yield put(initMemberFail());
  }
  return yield put(initMemberSuccess(data));
}

function* initOrderSaga() {
  const data = yield initOrderSer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle7')}${data.msg}`);
    return yield put(initOrderFail());
  }
  return yield put(initOrderSuccess(data));
}

function* initCancelSaga() {
  const data = yield initCancelSer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle8')}${data.msg}`);
    return yield put(initCancelFail());
  }
  return yield put(initCancelSuccess(data));
}

function* initGoodsSaga() {
  const data = yield initGoodsSer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle9')} ${data.msg}`);
    return yield put(initGoodsFail());
  }
  return yield put(initGoodsSuccess(data));
}

// 商品操作查询
function* operationGoodsSaga(action) {
  const data = yield operationGoodsSer(action.id);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle10')}${data.msg}`);
    return yield put(operationGoodsFail());
  }
  return yield put(operationGoodsSuccess(data));
}

// 备注查看
function* remarkSaga(action) {
  const data = yield remarkSer(action.id);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle11')} ${data.msg}`);
    return yield put(remarkShowFail());
  }
  return yield put(remarkShowSuccess(data));
}

// 备注更新
function* remarkSaveSaga(action) {
  const data = yield remarkSaveSer(action.orderId, action.remark);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle12')}${data.msg}`);
    return yield put(remarkSaveFail());
  }
  message.success(__('common.sagaTitle13'));
  return yield put(remarkSaveSuccess());
}

// 物流备注查看
function* logisticsRemarkSaga(action) {
  const data = yield logisticsRemarkSer(action.id);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle14')}${data.msg}`);
    return yield put(logisticsRemarkFail());
  }
  return yield put(logisticsRemarkSuccess(action.id, data.data));
}

// 物流备注更新
function* logisticsRemarkSaveSaga(action) {
  const data = yield logisticsRemarkSaveSer(action.orderId, action.remark);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle15')}${data.msg}`);
    return yield put(logisticsRemarkSaveFail());
  }
  message.success(__('common.sagaTitle16'));
  return yield put(logisticsRemarkSaveSuccess({ orderId: action.orderId, mark: action.remark }));
}

// 商品尺寸查看
function* goodSizeSaga(action) {
  const data = yield goodSizeSer(action.data);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle17')}${data.msg}`);
    return yield put(goodSizeFail());
  }
  return yield put(goodSizeSuccess(data));
}

// 换货
function* changeGoodsSaga(action) {
  const data = yield changeGoodsSer(action.data);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle18')} ${data.msg}`);
    return yield put(changeGoodsFail());
  }
  message.success(__('common.sagaTitle19'));
  return yield put(changeGoodsSuccess(action.data.order_id, data));
}

// 删除换货
function* delChangeSaga(action) {
  const data = yield delChangeSer(action.oid, action.gid);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle20')}${data.msg}`);
  }
  message.success(__('common.sagaTitle21'));
  return yield put(delChangeSuccess(action.oid, action.gid, action.sort));
}

// 批量操作
function* batchOperateSaga(action) {
  const data = yield batchOperateSer(action.url, action.data);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  return message.success(__('common.sagaTitle23'));
}
function* cancelRiskSaga(action) {
  const data = yield getRisk(action.id);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  return yield put(cancelRiskSuccess(data.data, action.id));
}
function* cancelTroubleTagSaga(action) {
  const data = yield cancelTroubleTag(action.troubleId, action.orderId);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  message.success(__('common.sagaTitle23'));
  return yield put(cancelTroubleTagSuccess(action.orderId));
}
function* updateOrderTagSaga(action) {
  const data = yield updateOrderTagSer(action.data);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  message.success(__('common.sagaTitle23'));
  return yield put(updateOrderTagSuccess(action.data));
}

export default function* () {
  yield takeLatest(TYPES.SEARCH, searchSaga);
  yield takeLatest(TYPES.SEARCH_HIGH, searchHighSaga);
  yield takeLatest(TYPES.SEARCH_HISTORY, searchHistorySaga);
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
  yield takeEvery(TYPES.GOODS_SIZE, goodSizeSaga);
  yield takeEvery(TYPES.CHANGE_GOODS, changeGoodsSaga);
  yield takeLatest(TYPES.DEL_CHANGE, delChangeSaga);
  yield takeLatest(TYPES.BATCH_OPERATE, batchOperateSaga);
  yield takeLatest(TYPES.CANCEL_RISK, cancelRiskSaga);
  yield takeLatest(TYPES.CANCEL_TROUBLE_TAG, cancelTroubleTagSaga);
  yield takeLatest(TYPES.UPDATE_ORDER_TAG, updateOrderTagSaga);
}
