import { takeLatest, put } from 'redux-saga/effects';
import * as Types from './types';
import { getInitDataServer } from '../server';
import { putData } from './action';

function* getInitDataSaga({ id }) {
  const result = yield getInitDataServer(id);
  if (result.code === 0) {
    yield put(putData(result.data));
  } else {
    //  window.location = `https://track.trackingmore.com/choose-cn-${id}.html`;
  }
}

export default function* () {
  yield takeLatest(Types.GET_INIT_DATA, getInitDataSaga);
}
