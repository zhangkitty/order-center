
import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  filtersLoad: false,
  load: false,
  dataSource: [],
  count: '0',
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
  remarkShow: false, // 备注弹窗开关
  remarkLoad: false, // 备注弹窗数据loading
  remarkData: [], // 备注弹窗数据
  addRemarkShow: false, // 添加备注输入框开关
  remark: '', // 备注
  troubleId: '', // 记录ID
  handledShow: false, // 已处理弹窗开关
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.getData:
    case types.followTrouble:
    case types.handled:
      return assign({}, state, {
        load: true,
      });
    case types.handledModal:
      return assign({}, state, {
        handledShow: true,
        troubleId: action.id,
      });
    case types.filterCommit:
      return assign({}, state, {
        filter: assign({}, state.filter, { [action.key]: action.value }),
      });
    case types.getDataSuccess:
      return assign({}, state, {
        dataSource: action.data.list,
        count: action.data.count,
      });
    case types.remarkShow:
      return assign({}, state, {
        remarkShow: true,
        remarkLoad: true,
        troubleId: action.id,
      });
    case types.addRemark:
      return assign({}, state, {
        remarkLoad: true,
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
