/**
 * Created by liufeng on 2017/2/8.
 */
import assign from 'object-assign';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from './types';

const defaultState = {
  name: '',
  password: '',
  open: false,
  sign: '',
  roleType: '',
  referpage: '/',
};


const excludePath = '/user/login';
const adminList = '/user/list';
const adminAdd = '/user/add';

function recordReferPage(referpage, state) {
  if (referpage.startsWith(adminList) || referpage.startsWith(adminAdd)) {
    return assign({}, state, {
      referpage: '/',
    });
  }
  if (!referpage.startsWith(excludePath)) {
    return assign({}, state, {
      referpage,
    });
  }
  return state;
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return recordReferPage(action.payload.pathname, state);
    default:
      return state;
  }
};
