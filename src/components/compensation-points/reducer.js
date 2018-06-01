
import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  listselectedRowKeys: [],
  listselectedRows: [],
  id: null,
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
  // 新增
  selectedRows2: [],
  modalShow2: false,
  COD_status2: null,
  country2: [],
  order_status2: null,
  siteFrom2: [],
    // 编辑
  selectedRows3: [],
  modalShow3: false,
  COD_status3: null,
  country3: [],
  order_status3: null,
  siteFrom3: [],
  // 克隆
  selectedRows4: [],
  modalShow4: false,
  COD_status4: null,
  country4: [],
  order_status4: null,
  siteFrom4: [],
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
