import assign from 'object-assign';
import * as TYPES from './types';
import moment from 'moment';

const defaultState = {
  // 初始化信息
  InitInfo: {
    site: [],
    overStockDate: [],
    isCod: [],
    status: [],
    isTrouble: [],
  },

  // 选中的site
  chooseSite: null,
  // 选中超过审核天数
  chooseDays: null,

  // SKU的值
  SKU: null,
  // 订单类型
  orderType: null,
  // 是否cod
  is_cod: null,
  // 商品状态
  commodityStatus: null,
  // 订单号
  billno: null,
  // 时间范围
  dataRange: [moment().subtract(29, 'days'), moment()],

  // 列表数据
  TableData: [],
  // 分页信息
  total: 0,
  tableLoading: false,
  pageNumber: 1,
  pageSize: 10,
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

