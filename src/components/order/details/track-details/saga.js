import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as Types from './types';
import { getInitDataServer } from '../server';
import { putData } from './action';


const lan = {
  dataFail: __('order.entry.submit_info2'), // 获取数据失败
};

function* getInitDataSaga({ id }) {
  const result = yield getInitDataServer(id);
  if (result.code === 0) {
    if (result.data.length > 0) {
      yield put(putData(result.data));
      return;
    }
    window.location = `https://track.trackingmore.com/choose-cn-${id}.html`;
  } else {
    message.error(`${lan.dataFail}:${result.msg}`);
  }
}

export default function* () {
  yield takeLatest(Types.GET_INIT_DATA, getInitDataSaga);
}
