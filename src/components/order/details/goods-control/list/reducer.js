/**
 * Created by liufeng on 2017/9/7.
 */
import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
 // dataSource: [],
  fetchFeedback: [],
  fetchFeedbackType: [],
  queryVal: {},
  queryString: {
    order_id: null,
    billno: null,
    goods_id: null,
    goods_sn: null,
    feedback_type: null,   // 反馈类型
    feedback_reason: {
      name: '',
      children: [],
    },   // 品控类型（原因id）
    feedback_thumb: [],   //  图片
    remark: null,
  },
  loadInit: false,
  submitLoad: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return defaultState;
    case TYPES.COMMIT:
      return assign({}, state, {
        queryString: assign({}, state.queryString, {
          [action.key]: action.val,
        }),
      });
    case TYPES.CHANGE_SELECT_OPTIONS:
      return assign({}, state, {
        queryString: assign({}, state.queryString, {
          feedback_reason: assign({}, state.queryString.feedback_reason, {
            name: action.key,
            children: action.val,
          }),
        }),
      });
    case TYPES.CHANGE:
      return assign({}, state, {
        [action.key]: action.val,
      });
    case TYPES.INIT_FEEDBACK:
      return assign({}, state, {
        loadInit: true,
      });
    case TYPES.INIT_FEEDBACK_FAIL:
      return assign({}, state, {
        loadInit: false,
      });
    case TYPES.INIT_FEEDBACK_SUCCESS:
      return assign({}, state, {
        fetchFeedback: action.data.data,
        loadInit: false,
      });
    case TYPES.INIT_FEEDBACK_TYPE:
      return assign({}, state, {
        loadInit: true,
      });
    case TYPES.INIT_FEEDBACK_TYPE_FAIL:
      return assign({}, state, {
        loadInit: false,
      });
    case TYPES.INIT_FEEDBACK_TYPE_SUCCESS:
      return assign({}, state, {
        fetchFeedbackType: action.data.data,
        loadInit: false,
      });
    case TYPES.SUBMIT:
      return assign({}, state, {
        // queryString: action.data,
        submitLoad: true,
      });
    case TYPES.SUBMIT_FAIL:
      return assign({}, state, {
        submitLoad: false,
      });
    case TYPES.SUBMIT_SUCCESS:
      return assign({}, state, {
      //  dataSource: action.data.data,
        submitLoad: false,
      });
    default:
      return state;
  }
};
export default reducer;
