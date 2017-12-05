/**
 * Create by shenjialin on 2017/11/25
 */
import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import {
  initSearch,
  searchFailedAddrList,
  deleteOrder,
  auditOrder,
  processOrder,
  recheckOrder,
  exportOrder,
} from '../server';
import {
  searchSuccess, searchList_success, searchList_fail, deleteSuccess, deleteFail,
  recheckSuccess, recheckFail, processSuccess, processFail, auditSuccess, auditFail,
  batchDeleteSuccess, batchDeleteFail, batchRecheckSuccess, batchRecheckFail,
} from './action';
import * as TYPES from './types';
const FileSaver = require('file-saver');

function* searchSaga(action) {
  const data = yield initSearch();
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle')}${data.msg}`);
  }
  return yield put(searchSuccess(data));
}

function* searchFailedAddrListSaga(action) {
  const data = yield searchFailedAddrList(action.data);
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle')}${data.msg}`);
    return yield put(searchList_fail());
  }
  return yield put(searchList_success(data));
}

function* deleteOrderSaga(action) {
  const data = yield deleteOrder({ids: [action.data.id]});
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle')}${data.msg}`);
    return yield put(deleteFail({myIndex: action.data.myIndex}));
  }
  return yield put(deleteSuccess({data: data, myIndex: action.data.myIndex}));
}

function* batchDeleteSaga(action) {
  const data = yield deleteOrder({ids: action.data});
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle')}${data.msg}`);
    return yield put(batchDeleteFail());
  }
  return yield put(batchDeleteSuccess(data));
}

function* auditOrderSaga(action) {
  const data = yield auditOrder({ids: [action.data.id]});
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle')}${data.msg}`);
    return yield put(auditFail({myIndex: action.data.myIndex}));
  }
  return yield put(auditSuccess({data: data, myIndex: action.data.myIndex}));
}

function* processOrderSaga(action) {
  const data = yield processOrder({id: action.data.id});
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle')}${data.msg}`);
    return yield put(processFail({myIndex: action.data.myIndex}));
  }
  return yield put(processSuccess({data: data, myIndex: action.data.myIndex}));
}

function* recheckOrderSaga(action) {
  const data = yield recheckOrder({order_id: [action.data.id]});
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle')}${data.msg}`);
    return yield put(recheckFail({myIndex: action.data.myIndex}));
  }
  return yield put(recheckSuccess({data: data, myIndex: action.data.myIndex}));
}
function* batchRecheckSaga(action) {
  const data = yield recheckOrder({order_id: action.data});
  if (!data || data.code !== 0) {
    message.error(`${__('common.sagaTitle')}${data.msg}`);
    return yield put(batchRecheckFail());
  }
  return yield put(batchRecheckSuccess(data));
}

function* exportOrderSaga(action) {
  const data = yield exportOrder({ids: action.data});
  const name = (new Date()).toLocaleString();
  FileSaver.saveAs(data, `${name}.xls`);
}

export default function* () {
  yield takeLatest(TYPES.INITSEARCH, searchSaga);
  yield takeLatest(TYPES.SEARCHLIST, searchFailedAddrListSaga);
  yield takeLatest(TYPES.DELETEORDER, deleteOrderSaga);
  yield takeLatest(TYPES.AUDITORDER, auditOrderSaga);
  yield takeLatest(TYPES.EXPORTORDER, exportOrderSaga);
  yield takeLatest(TYPES.PROCESSORDER, processOrderSaga);
  yield takeLatest(TYPES.RECHECKORDER, recheckOrderSaga);
  yield takeLatest(TYPES.BATCHDELETE, batchDeleteSaga);
  yield takeLatest(TYPES.BATCHRECHECK, batchRecheckSaga);
}
