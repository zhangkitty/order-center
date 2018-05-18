import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  country: [],
  site: [],
  handle_resultArr: [], // 处理结果
  handle_statusArr: [], // 处理状态
  billno: '',
  data: null,
  handle_status: null,
  handler: 'sss',
};


const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.change:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};

export default reducer;
