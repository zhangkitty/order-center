import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import assign from 'object-assign';
import * as TYPES from './types';
import { getOrderReturnDetailSer, getOrderRefundSer, getUpdateStatusSer } from './server';
import { getOrderReturnDetailSuccess, clickRefundedButtonSagaSuccess, getOrderReturnDetail } from './action';
import { hashHistory } from 'react-router';

const lan = {
  ofail: __('order.entry.submit_info'),
  osucess: __('order.entry.submit_info1'),
  fail: __('order.entry.submit_info2'),
  part: __('order.entry.submit_info3'),
  推送消息成功: __('returns.details.推送消息成功'),
};

// 获取退货单详情信息
function* getOrderReturnDetailSaga(action) {
  const data = yield getOrderReturnDetailSer(action.id);
  if (!data || data.code !== 0) {
    return message.error(`${lan.fail}:${data.msg}`);
  }
  return yield put(getOrderReturnDetailSuccess(data.data));
}

// 点击已退款按钮，将退款结果推送给退货中心
function* clickRefundedButtonSaga(action) {
  const data = yield getOrderRefundSer(action.id);
  if (!data || data.code !== 0) {
    return message.error(`${lan.fail}:${data.msg}`);
  }
  message.success(`${lan.推送消息成功}`);
  yield put(getOrderReturnDetail(action.id));
}

// 点击已办结按钮
function* clickAlreadyDoneButtonSaga(action) {
  const data = yield getUpdateStatusSer(action.id);
  if (!data || data.code !== 0) {
    return message.error(`${lan.fail}:${data.msg}`);
  }
  message.success(`${lan.推送消息成功}`);
  yield put(getOrderReturnDetail(action.id));
}

export default function* () {
  yield takeLatest(TYPES.GETORDERRETURNDETAIL, getOrderReturnDetailSaga);
  yield takeLatest(TYPES.CLICKREFUNDEDBUTTON, clickRefundedButtonSaga);
  yield takeLatest(TYPES.CLICKALREADYDONEBUTTON, clickAlreadyDoneButtonSaga);
}
