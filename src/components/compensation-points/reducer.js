
import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  total: 0,
  current: 1,
  dataSource: [],
  page_number: 1,
  page_size: 10,
  all_COD_status: [],
  all_country: [],
  all_order_status: [],
  all_pointType: [],
  all_siteFrom: [],
  // 搜索列表用
  COD_status1: null,
  country1: [],
  order_status1: null,
  siteFrom1: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
export default reducer;
