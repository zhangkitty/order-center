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

export const commit = (key, val, actype) => ({
  type: TYPES.COMMIT,
  key,
  val,
  actype,
});

export const initFeedback = () => ({
  type: TYPES.INIT_FEEDBACK,
});
export const initFeedbackSuccess = data => ({
  type: TYPES.INIT_FEEDBACK_SUCCESS,
  data,
});
export const initFeedbackFail = () => ({
  type: TYPES.INIT_FEEDBACK_FAIL,
});

export const initFeedbackType = () => ({
  type: TYPES.INIT_FEEDBACK_TYPE,
});
export const initFeedbackTypeSuccess = data => ({
  type: TYPES.INIT_FEEDBACK_TYPE_SUCCESS,
  data,
});
export const initFeedbackTypeFail = () => ({
  type: TYPES.INIT_FEEDBACK_TYPE_FAIL,
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
