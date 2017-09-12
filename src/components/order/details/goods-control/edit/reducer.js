/**
 * Created by liufeng on 2017/9/7.
 */
import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  dataSource: [],
  fetchFeedback: [],
  fetchFeedbackType: [],
  fetchData: {},
  queryVal: {},
  queryString: {
    order_id: null,
    billno: null,
    goods_id: null,
    goods_sn: null,
    feedback_type: null,   // 反馈类型
    feedback_reason: null,   // 品控类型（原因id）
    feedback_reason0: null,
    feedback_reason1: null,
    feedback_reason2: null, // 品控类型
    feedback_thumb: null,   //  图片
    remark: null,
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.COMMIT:
      return assign({}, state, {
        queryString: assign({}, state.queryString, {
          [`${action.key}`]: action.val,
        }),
      });
    case TYPES.CHANGE:
      return assign({}, state, {
        [action.key]: action.val,
      });
    case TYPES.INIT_FEEDBACK:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_FEEDBACK_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_FEEDBACK_SUCCESS:
      return assign({}, state, {
        fetchFeedback: action.data.data,
        load: false,
      });
    case TYPES.INIT_FEEDBACK_TYPE:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_FEEDBACK_TYPE_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_FEEDBACK_TYPE_SUCCESS:
      return assign({}, state, {
        fetchFeedbackType: action.data.data,
        load: false,
      });
    case TYPES.SUBMIT:
      return assign({}, state, {
        // queryString: action.data,
        load: true,
        searchType: 0,
      });
    case TYPES.SUBMIT_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.SUBMIT_SUCCESS:
      return assign({}, state, {
      //  dataSource: action.data.data,
        load: false,
      });
    case TYPES.INIT_DATA:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INIT_DATA_FAIL:
      return assign({}, state, {
        load: false,
      });
    case TYPES.INIT_DATA_SUCCESS:
      return assign({}, state, {
        queryString: action.data.data,
        load: false,
      });
    default:
      return state;
  }
};
export default reducer;
