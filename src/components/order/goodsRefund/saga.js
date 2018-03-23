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
  请至少选择一个退款路径: '请至少选择一个退款路径',
  请选择取消商品的原因: '请选择取消商品的原因',
  缺少必填项: '缺少必填项',
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
  const cod = val.dataSource.orderPriceInfo.isCod;
  function filterAccount(path) {
    if (path.refundPathId <= 2) return true;
    if (path.refundPathId === 3 && !cod) return true;
    switch (path.refund_method) {
      case 'Paytm':
        return path.account;
      case 'PayPal':
        return path.account;
      case 'yes bank':
        return path.bank_code && path.card_number && path.customer_name && path.issuing_city;
      default:
        return false;
    }
  }
  const arr = val.refundPaths.filter(v => v.checked === true)
      .filter(filterAccount)
      .filter(v => v.isShow === 1)
      .filter(v => v.refundPathId === 1 || v.refundPathId === val.radioValue)
      .map(v => assign({}, v, {
        account: v.card_number ? v.card_number : v.account,
      }));
  if (arr.length === 0) {
    return message.warning(lan.缺少必填项);
  }
  for (let [i, len] = [0, arr.length]; i < len; i += 1) {
    if (arr[i].refund_method === 'Paytm' && (arr[i].account.length !== 10)) {
      return message.warning(__('common.errorPaytm'));
    }
  }
  const tempArray = val.refundPaths.filter(v => v.checked === true)
      .filter(v => v.refundPathId === 1 || v.refundPathId === val.radioValue);
  if (tempArray.length !== arr.length) {
    return message.warning(lan.缺少必填项);
  }
  const tempArr = camel2Under(arr);
  // 0都不退，1都退，2退运费，3退运险费
  let temp_is_return_freight_insurance;
  if (val.shipping === 0 && val.shippingInsurance === 0) {
    temp_is_return_freight_insurance = 0;
  } else if (val.shipping === 1 && val.shippingInsurance === 1) {
    temp_is_return_freight_insurance = 1;
  } else if (val.shipping === 1 && val.shippingInsurance === 0) {
    temp_is_return_freight_insurance = 2;
  } else if (val.shipping === 0 && val.shippingInsurance === 1) {
    temp_is_return_freight_insurance = 3;
  } else {
    temp_is_return_freight_insurance = null;
  }
  const data = {
    order_id: +val.routeParams.orderId,
    order_goods_ids: val.routeParams.goodsId,
    refund_paths: tempArr,
    reason: val.reasonId,
    remark: val.remark,
    rl_amount: val.rlFee,
    is_return_freight_insurance: temp_is_return_freight_insurance,
  };
  if (!val.reasonId) {
    return message.warning(lan.请选择取消商品的原因);
  }
  yield put(change('submitLoad', true));
  const temp = yield submitSer(data);
  yield put(change('submitLoad', false));
  if (temp.code !== 0) {
    return message.error(`${temp.msg}`);
  }
  message.success(`${lan.退款成功}`);
  // return setTimeout(window.close, 3000); // 关闭窗口
}
export default function* () {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.submit, submitSaga);
}
