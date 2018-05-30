import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  selectedRowKeys: null,
  selectedRows: null,
  processedShow: false,
  order_id: '',
  id: '',
  countryArr: [],
  country_id: [],
  siteArr: [],
  site_from: [],
  handle_statusArr: [], // 处理状态
  handle_status: '待处理',
  handle_resultArr: [], // 处理结果
  handle_result: '全部',
  myhandle_status: null,
  myhandle_result: null,
  billno: '',
  data: null,
  handler: '',
  dataSource: [],
  total: 0,
  page_number: 1,
  page_size: 10,
  current: 1,
  fetchRemark: [],
  remarkValue: '',
  transRemark: '',
  markTag: '', // 订单标记中的物流备注
  markTagShow: false,
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
