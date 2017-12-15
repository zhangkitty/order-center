
import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  filtersLoad: false,
  load: false,
  filters: { // 搜索条件数据源
    trouble_type: [],
    handle_status: [],
    handle_result: [],
    country: [],
    site_from: [],
  },
  filter: { // 搜索条件
    pageSize: 10,
    pageNumber: 1,
    reference_number: '',
    shipping_method_real: '',
    shipping_no: '',
    trouble_type: '',
    handle_status: '',
    handle_result: '',
    handle_user_name: '',
    shipping_country_name: '',
    site_from: '',
    add_time_from: '',
    add_time_to: '',
    delivery_time_from: '',
    delivery_time_to: '',
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.filterCommit:
      return assign({}, state, {
        filter: assign({}, state.filter, { [action.key]: action.value }),
      });
    case types.commit:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
export default reducer;
