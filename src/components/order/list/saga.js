/**
 * Create by liufeng on 2017/8/30
 */
import { message } from 'antd';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import assign from 'object-assign';
import {
  searchSubmit, seachHighSubmit, seachHistorySubmit,
  initDataSer,
  operationGoodsSer,
  remarkSer, remarkSaveSer,
  logisticsRemarkSer, logisticsRemarkSaveSer,
  goodSizeSer, changeGoodsSer,
  batchOperateSer, getRisk, cancelTroubleTag,
  updateOrderTagSer, delChangeSer,
  batchCheckSer, batchDeleteSer, batchPartSer, noStockApplySer, noStockSer, returnAlreadyAuditSer,
  getNoGoodsListSer, underCarriageSer,
} from '../server';
import {
  searchSuccess, searchFail, searchHighFail, searchHighSuccess, searchHistoryFail, searchHistorySuccess,
  initDataFail, initDataSuccess,
  operationGoodsFail, operationGoodsSuccess,
  remarkShowFail, remarkShowSuccess, remarkSaveFail, remarkSaveSuccess,
  logisticsRemarkFail, logisticsRemarkSuccess, logisticsRemarkSaveFail, logisticsRemarkSaveSuccess,
  goodSizeFail, goodSizeSuccess, changeGoodsFail, changeGoodsSuccess,
  cancelRiskSuccess, cancelTroubleTagSuccess, updateOrderTagSuccess,
  delChangeFail, delChangeSuccess,
  batchCheckSuccess, batchDeleteSuccess, batchPartSuccess, getStockList,
  getStockListSuccess, change, changeAllSource
} from './action';

import * as TYPES from './types';

function* searchSaga(action) {
  const {
    billno, orderId, email, shippingNo, referenceNumber, telephone, txnId, trouble_user, totalInput, goodsId,
  } = action.data;
  const data = yield searchSubmit(assign({}, action.data, {
    billno: billno ? encodeURIComponent(billno.trim()) : null,
    orderId: orderId ? encodeURIComponent(orderId.trim()) : null,
    email: email ? encodeURIComponent(email.trim()) : null,
    shippingNo: shippingNo ? encodeURIComponent(shippingNo.trim()) : null,
    referenceNumber: referenceNumber ? encodeURIComponent(referenceNumber.trim()) : null,
    telephone: telephone ? encodeURIComponent(telephone.trim()) : null,
    txnId: txnId ? encodeURIComponent(txnId.trim()) : null,
    trouble_user: trouble_user ? encodeURIComponent(trouble_user.trim()) : null,
    totalInput: totalInput ? encodeURIComponent(totalInput.trim()) : null,
    goodsId: goodsId ? encodeURIComponent(goodsId.trim()) : null,
  }));
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle')}${data.msg}`);
    return yield put(searchFail());
  }
  return yield put(searchSuccess(data));
}

function* searchHighSaga(action) {
  const {
    goodsSn, count, totalInput, goodsId,
  } = action.data;
  const data = yield seachHighSubmit(assign({}, action.data, {
    goodsSn: goodsSn ? encodeURIComponent(goodsSn.trim()) : null,
    count: count ? encodeURIComponent(count.trim()) : null,
    totalInput: totalInput ? encodeURIComponent(totalInput.trim()) : null,
    goodsId: goodsId ? encodeURIComponent(goodsId.trim()) : null,
  }));
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle1')} ${data.msg}`);
    return yield put(searchHighFail());
  }
  return yield put(searchHighSuccess(data));
}

function* searchHistorySaga(action) {
  const data = yield seachHistorySubmit(assign({}, action.data));
  if (data.error) {
    message.error(`${__('common.sagaTitle')} ${data.msg}`);
    return yield put(searchHistoryFail());
  }
  return yield put(searchHistorySuccess(data));
}


// 初始化数据
function* initDataSaga() {
  const data = yield initDataSer();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle31')} ${data.msg}`);
    return yield put(initDataFail());
  }
  return yield put(initDataSuccess(data));
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
  return yield put(remarkSaveSuccess({ orderId: action.orderId, mark: action.remark }));
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

// 批量操作 (废弃)
function* batchOperateSaga(action) {
  const data = yield batchOperateSer(action.url, action.data);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  return message.success(__('common.sagaTitle23'));
}
// 风控订单取消,
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

// 批量审核
function* batchCheckSaga(action) {
  const data = yield batchCheckSer(action.url, action.data);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  message.success(__('common.sagaTitle27'));
  return yield put(batchCheckSuccess(action.data));
}

// 批量平台取消
function* batchDeleteSaga(action) {
  const data = yield batchDeleteSer(action.url, action.data);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  message.success(__('common.sagaTitle29'));
  return yield put(batchDeleteSuccess(action.data));
}

// 批量部分发
function* batchPartSaga(action) {
  const data = yield batchPartSer(action.url, action.data);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  message.success(__('common.sagaTitle28'));
  return yield put(batchPartSuccess(action.data));
}

//无货审核 批量申请
function* noStockApply(action) {
  const data = yield noStockApplySer(action.param);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  message.success(__('common.sagaTitle32'));
  return yield refreshListData();
}

//无货审核 
function* noStock(action) {
  const data = yield noStockSer(action.param);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  yield put(change('showBatchNoGoods', true));
  return yield put(getStockList(data));
}

//返回已审核
function* returnAlreadyAudit(action) {
  const data = yield returnAlreadyAuditSer(action.param);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  message.success(__('common.sagaTitle33'));
  yield put(change('showBatchNoGoods',false));
  yield put(change('showShelfNoGoods', false));
  return yield refreshListData();
}

//无货下架列表
function* getNoGoodsList(action) {
  const data = yield getNoGoodsListSer(action.param);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle22')}${data.msg}`);
  }
  return yield put(getStockListSuccess([data.data]));
}

//无货下架 提交
function* underCarriage(action) {
  const data = yield underCarriageSer(action.param);
  if (!data || data.code !== 0) {
    return message.error(`${__('common.sagaTitle35')}${data.msg}`);
  }
  message.success(__('common.sagaTitle34'));  
  yield put(change('showBatchNoGoods',false));
  yield put(change('down', ''));
  yield put(changeAllSource(['1','2','3'], false));
  return yield refreshListData();
}

export default function* () {
  yield takeEvery(TYPES.SEARCH, searchSaga);
  yield takeEvery(TYPES.SEARCH_HIGH, searchHighSaga);
  yield takeEvery(TYPES.SEARCH_HISTORY, searchHistorySaga);
  yield takeEvery(TYPES.INIT_DATA, initDataSaga);  // 初始化数据
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
  yield takeLatest(TYPES.BATCH_CHECK, batchCheckSaga);
  yield takeLatest(TYPES.BATCH_DELETE, batchDeleteSaga);
  yield takeLatest(TYPES.BATCH_PART, batchPartSaga);
  yield takeLatest(TYPES.NO_STOCK_APPLY, noStockApply);
  yield takeLatest(TYPES.NO_STOCK, noStock);
  yield takeLatest(TYPES.RETURN_ALREADY_AUDIT, returnAlreadyAudit);
  yield takeLatest(TYPES.GET_NO_GOODS_LIST, getNoGoodsList);
  yield takeLatest(TYPES.UNDER_CARRIAGE, underCarriage);
}

//刷新订单
const refreshData = () => {
  EventEmitter.emit('refresh');
};