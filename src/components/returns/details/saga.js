import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import assign from 'object-assign';
import * as TYPES from './types';
import {getOrderReturnDetail,getOrderRefund,getUpdateStatus} from './server'
import {getOrderReturnDetailSuccess,clickRefundedButtonSagaSuccess,getOrderReturnDetail} from "./action"
import {hashHistory} from 'react-router'

const lan = {
  ofail: __('order.entry.submit_info'),
  osucess: __('order.entry.submit_info1'),
  fail: __('order.entry.submit_info2'),
  part: __('order.entry.submit_info3'),
};

//获取退货单详情信息
function* getOrderReturnDetailSaga(action) {
  const data = yield getOrderReturnDetail(action.id)
  console.log(data,data)
  if(!data||data.code!==0){
    return message.error(`${lan.fail}:${data.msg}`);
  }
  return yield put(getOrderReturnDetailSuccess(data.data))
}

//点击已退款按钮，将退款结果推送给退货中心
function* clickRefundedButtonSaga(action) {
  const data = yield getOrderRefund(action.id)
  if(!data||data.code!==0){
    return message.error(`${lan.fail}:${data.msg}`);
  }
  // return hashHistory.push('/')
  yield put(getOrderReturnDetail(id)))
}

//点击已办结按钮
function *clickAlreadyDoneButtonSaga(action) {
  const data=yield getUpdateStatus(action.id)
  if(!data||data.code!==0){
    return message.error(`${lan.fail}:${data.msg}`);
  }
  //
}

export default function* () {
  yield takeEvery(TYPES.GETORDERRETURNDETAIL,getOrderReturnDetailSaga)
  yield takeLatest(TYPES.CLICKREFUNDEDBUTTON,clickRefundedButtonSaga)
  yield takeLatest(TYPES.CLICKALREADYDONEBUTTON,clickAlreadyDoneButtonSaga)
}
