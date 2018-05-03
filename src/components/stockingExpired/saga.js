import { put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import * as TYPES from './types';
import { getoverstocksearchconditionsSer, getoverstocklistSer } from './server';
import { change } from './action';
import moment from 'moment';


const lan = {
  时间必填: '时间必填',
  选择的时间不能超过一个月: '选择的时间不能超过一个月',
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

export default function* () {
  yield takeLatest(TYPES.GETOVERSTOCKSEARCHCONDITIONS, getOverStockSearchConditionsSaga);
  yield takeLatest(TYPES.GETOVERSTOCKLIST, getOverStockListSaga);
}
