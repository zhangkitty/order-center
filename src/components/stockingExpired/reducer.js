import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  // 初始化信息
  InitInfo: {
    site: [],
    overStockDate: [],
  },

  // 选中的site
  chooseSite: null,
  // 选中超过审核天数
  chooseDays: null,

  // SKU的值
  SKU: null,
  // 订单号
  billno: null,
  // 时间范围
  dataRange: null,

  // 列表数据
  TableData: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.CHANGE:
      return assign({}, state, {
        [action.key]: action.val,
      });

    default:
      return state;
  }
};


export default reducer;

