import { put, takeLatest } from 'redux-saga/effects';
import { message, Modal } from 'antd';
import * as TYPES from './types';
import { getoverstocksearchconditionsSer, getoverstocklistSer, batchRefundSer, updateSer } from './server';
import { change, getOverStockList } from './action';
import moment from 'moment';


const lan = {
  时间必填: '时间必填',
  选择的时间不能超过一个月: '选择的时间不能超过一个月',
  批量返回失败的订单: '批量返回失败的订单',
};
function* getOverStockSearchConditionsSaga() {
  const data = yield getoverstocksearchconditionsSer();
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }
  yield put(change('InitInfo', data.data));
  return null;
}

function* getOverStockListSaga(action) {
  yield put(change('selectedRowKeys', null));
  const val = action.val;
  if (!Array.isArray(val.dataRange)) {
    return message.info(lan.时间必填);
  }
  if ((moment(val.dataRange[1]).unix() - moment(val.dataRange[0]).unix()) / 3600 / 24 > 31) {
    return message.info(lan.选择的时间不能超过一个月);
  }
  yield put(change('tableLoading', true));
  const temp = {
    page_number: val.pageNumber,
    page_size: val.pageSize,
    billno: val.billno,
    site_from: val.chooseSite === '__ALL__' ? '' : val.chooseSite,
    goods_sn: val.SKU,
    over_date: val.chooseDays === '__ALL__' ? '' : val.chooseDays,
    start_time: moment(val.dataRange[0]).format('YYYY-MM-DD'),
    end_time: moment(val.dataRange[1]).format('YYYY-MM-DD'),
    // 订单状态
    status: val.commodityStatus,
    // 是否cod
    is_cod: val.is_cod,
    // 订单类型
    is_trouble: val.orderType,
  };
  const data = yield getoverstocklistSer(temp);
  yield put(change('tableLoading', false));
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }
  yield put(change('TableData', data.data));
  yield put(change('total', data.total));
  return null;
}

function* batchRefundSaga(action) {
  if (action.value.refundReason === null) {
    return message.info('退款原因必填');
  }
  if (action.value.choose_order_goods.length === 0) {
    return message.info('商品没有选');
  }
  yield put(change('confirmLoading', true));
  const data = yield batchRefundSer(action);
  yield put(change('confirmLoading', false));
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }
  if (data.data.errors.length > 0) {
    Modal.error({
      title: lan.批量返回失败的订单,
      content: (
        <div>
          {
            data.data.errors.map(v => <div>{v}</div>)
          }
        </div>
      ),
    });
  } else {
    message.success(`${data.msg}`);
  }
  yield put(change('batchRefundModalShow', false));
  yield put(getOverStockList(action.value, action.value.pageNumber));
  yield put(change('choose_order_goods', []));
  return null;
}


function* updateSaga(action) {
  if (action.value.choose_order_goods.length === 0) {
    return message.info('商品没有选');
  }
  const data = yield updateSer(action);
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }

  if (data.data.errors.length > 0) {
    Modal.error({
      title: lan.批量返回失败的订单,
      content: (
        <div>
          {
              data.data.errors.map(v => <div>{v}</div>)
            }
        </div>
      ),
    });
  } else {
    message.success(`${data.msg}`);
  }
  yield put(getOverStockList(action.value));
  yield put(change('choose_order_goods', []));
  return null;
}

export default function* () {
  yield takeLatest(TYPES.GETOVERSTOCKSEARCHCONDITIONS, getOverStockSearchConditionsSaga);
  yield takeLatest(TYPES.GETOVERSTOCKLIST, getOverStockListSaga);
  yield takeLatest(TYPES.BATCHREFUND, batchRefundSaga);
  yield takeLatest(TYPES.UPDATE, updateSaga);
}
