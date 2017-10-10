/**
 * Created by liufeng on 2017/9/7.
 */
import * as TYPES from './types';

export const init = () => ({
  type: TYPES.INIT,
});

export const change = (key, val) => ({
  type: TYPES.CHANGE,
  key,
  val,
});

export const commit = (key, val) => ({
  type: TYPES.COMMIT,
  key,
  val,
});

export const changeSelectOptions = (val, key) => ({
  type: TYPES.CHANGE_SELECT_OPTIONS,
  key,
  val,
});

export const initFeedback = (loaded, query) => ({
  type: TYPES.INIT_FEEDBACK,
  loaded,
  query,
});
export const initFeedbackSuccess = data => ({
  type: TYPES.INIT_FEEDBACK_SUCCESS,
  data,
});
export const initFeedbackFail = () => ({
  type: TYPES.INIT_FEEDBACK_FAIL,
});

export const initFeedbackType = (loaded, query) => ({
  type: TYPES.INIT_FEEDBACK_TYPE,
  loaded,
  query,
});
export const initFeedbackTypeSuccess = data => ({
  type: TYPES.INIT_FEEDBACK_TYPE_SUCCESS,
  data,
});
export const initFeedbackTypeFail = () => ({
  type: TYPES.INIT_FEEDBACK_TYPE_FAIL,
});


export const initData = (order_id, id) => ({
  type: TYPES.INIT_DATA,
  order_id,
  id,
});
export const initDataSuccess = data => ({
  type: TYPES.INIT_DATA_SUCCESS,
  data,
});
export const initDataFail = () => ({
  type: TYPES.INIT_DATA_FAIL,
});

export const submitData = data => ({
  type: TYPES.SUBMIT,
  data,
});
export const submitDataSuccess = data => ({
  type: TYPES.SUBMIT_SUCCESS,
  data,
});
export const submitDataFail = () => ({
  type: TYPES.SUBMIT_FAIL,
});
