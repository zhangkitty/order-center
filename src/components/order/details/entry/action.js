import * as TYPES from './types';

export const commit = (key, value) => ({
  type: TYPES.COMMIT,
  key,
  value,
});
export const getInfo = (id, bill) => ({
  type: TYPES.GET_INFO,
  id,
  bill,
});
export const getInfoSuccess = data => ({
  type: TYPES.GET_INFO_SUCCESS,
  data,
});
export const uploadTrackAction = data => ({
  type: TYPES.UPLOAD_TRACK,
  data,
});
export const uploadTrackSuccess = () => ({
  type: TYPES.UPLOAD_TRACK_SUCCESS,
});

export const uploadTrackShow = (order_id, return_no) => ({
  type: TYPES.UPLOAD_TRACK_SHOW,
  order_id,
  return_no,
});
export const updateEmail = (id, email) => ({
  id,
  email,
  type: TYPES.UPDATE_EAMIL,
});
export const updateEmailSuccess = data => ({
  data,
  type: TYPES.UPDATE_EAMIL_SUCCESS,
});
export const backGoodsDates = data => ({
  data,
  type: TYPES.BACK_GOODS_DATES,
});
export const backGoodsDatesSuccess = data => ({
  data,
  type: TYPES.BACK_GOODS_DATES_SUCCESS,
});
export const operateReturn = (oid, gid) => ({
  oid,
  gid,
  type: TYPES.OPERATE_RETURN,
});
export const partSend = (oid, w) => ({
  oid,
  w,
  type: TYPES.PART_SEND,
});
export const preSendAction = (oid, sendType) => ({
  oid,
  sendType,
  type: TYPES.PRE_SEND,
});
export const examine = oid => ({
  oid,
  type: TYPES.EXAMINE,
});
export const examineSuccess = () => ({
  type: TYPES.EXAMINE_SUCCESS,
});

