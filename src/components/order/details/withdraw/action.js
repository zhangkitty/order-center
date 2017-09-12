import * as TYPES from './types';


export const getData = orderId => ({
  type: TYPES.GET_DATA,
  orderId,
});

export const getDataSuccess = res => ({
  type: TYPES.GET_DATA_SUCCESS,
  res,
});

export const change = (key, val) => ({
  type: TYPES.SUBMIT_CHANGE,
  key,
  val,
});

export const cancel = () => ({
  type: TYPES.CANCEL,
});


export const tell = (rate1, rate2) => ({
  type: TYPES.TELL,
  rate1,
  rate2,
});


export const submitForward = req => ({
  type: TYPES.SUBMITFORWARD,
  req,
});
