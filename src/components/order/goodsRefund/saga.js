/**
 * Create by liufeng on 2017/6/28
 * #44905 liufeng ,提交，接口返回成功信息后，关闭页面
 */
import { message } from 'antd';
import assign from 'object-assign';
import { hashHistory } from 'react-router';
import { put, takeLatest } from 'redux-saga/effects';
import { initSer, submitSer } from './server';
import {
  change, initSerSuccess,
} from './action';
import { camel2Under } from '../../../lib/camal';

import * as types from './types';


const lan = {
  退款成功: '退款成功',
};


function* initSaga(action) {
  const { orderId, goodsId } = action;
  const data = yield initSer(action);
  data.map((v) => {
    if (v.code !== 0) {
      return message.error(`${v.msg}`);
    }
    return null;
  });
  if (data[1].data.pageTo === 'cod') {
    return hashHistory.push(`/order/cancelGoods/${orderId}/${goodsId}`);
  }
  yield put(change('reasons', data[0].data));
  yield put(initSerSuccess(data[1].data));
  yield put(change('ready', true));
  return null;
}

function* submitSaga({ val }) {
  const arr = val.refundPaths
      .filter(v => v.isShow === 1)
      .filter(v => (v.refundPathId === val.radioValue) || (v.refundPathId === 1))
      .map(v => assign({}, v, {
      }));
  const tempArr = camel2Under(arr);
  const data = {
    order_id: +val.routeParams.orderId,
    order_goods_ids: val.routeParams.goodsId,
    refund_paths: tempArr,
    reason: val.reasonId,
    remark: val.remark,
    rl_amount: val.rlFee,
    is_return_freight_insurance: val.shipping,
  };
  if (!val.reasonId) {
    return message.warning('信息不全');
  }
  yield put(change('submitLoad', true));
  const temp = yield submitSer(data);
  yield put(change('submitLoad', false));
  if (temp.code !== 0) {
    return message.error(`${temp.msg}`);
  }
  message.success(`${lan.退款成功}`);
  return setTimeout(window.close, 3000); // 关闭窗口
}
export default function* () {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.submit, submitSaga);
}
