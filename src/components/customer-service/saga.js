import { takeLatest, put } from 'redux-saga/effects';
import assign from 'object-assign';
import { message } from 'antd';
import { hashHistory } from 'react-router';
import * as types from './types';
import { initSer, editAdminInfoSer, addOrEditSer } from './server';
import {
  initSuccess, changePageSuccess, changePageSizeSuccess, deleteItemSuccess, addOrEditSerSuccess, init,
  changeValue,
} from './action';

function* initSaga(action) {
  const data = yield initSer(action);
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }
  return yield put(initSuccess(data.data));
}

function* changePageSaga(action) {
  const data = yield initSer(action);
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }
  yield put(changeValue('pageNumber', action.pageNumber));
  return yield put(changePageSuccess(data.data));
}

function* changePageSizeSaga(action) {
  const data = yield initSer(action);
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }
  return yield put(changePageSizeSuccess(data.data));
}
function* deleteItemSaga(action) {
  const temp = assign({}, action.val, {
    type: 1,
    status: 3,
  });
  const data = yield editAdminInfoSer(temp);
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }
  return yield put(deleteItemSuccess(action.val));
}

function* addOrEditSaga(action) {
  const data = yield addOrEditSer(action);
  if (!data[0] || data[0].code !== 0) {
    return message.error(`${data[0].msg}`);
  }
  if (!data[1] || data[1].code !== 0) {
    return message.error(`${data[1].msg}`);
  }
  return yield put(addOrEditSerSuccess(data, action));
}

function* addAdminUserManageSaga(action) {
  const { props } = action.val;
  const { AllUserList, selectedName, Countrys, checkedCountrys, dispatch, pageNumber, pageSize, addOrEdit } = props;
  const user_id = (+selectedName);
  const user_name = AllUserList.filter(v => v.user_id === selectedName)[0].user_name;
  const country = [];
  const country_id = [];
  Countrys.map(v => v.country_info.map((val) => {
    if (checkedCountrys.filter(k => k === val.country_id).length > 0) {
      country.push(val.country);
      country_id.push(val.country_id);
    }
    return null;
  }));
  const temp = assign({}, {
    user_id,
    user_name,
    type: addOrEdit,
    status: '1',
    country: country.join(','),
    country_id: country_id.join(','),
  });
  const data = yield editAdminInfoSer(temp);
  if (!data || data.code !== 0) {
    return message.error(`${data.msg}`);
  }
  yield dispatch(changeValue('ModalVisiable', false));
  return yield dispatch(init(pageNumber, pageSize));
}

export default function* () {
  yield takeLatest(types.init, initSaga);
  yield takeLatest(types.changePage, changePageSaga);
  yield takeLatest(types.changePageSize, changePageSizeSaga);
  yield takeLatest(types.deleteItem, deleteItemSaga);
  yield takeLatest(types.addOrEdit, addOrEditSaga);
  yield takeLatest(types.addAdminUserManage, addAdminUserManageSaga);
}
