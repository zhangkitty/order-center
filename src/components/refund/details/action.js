import * as TYPES from './types';

export const commit = (key, value) => ({
  type: TYPES.COMMIT,
  key,
  value,
});
export const infoCommit = (key, value) => ({
  type: TYPES.INFO_COMMIT,
  key,
  value,
});
export const getInfo = id => ({
  type: TYPES.GET_INFO,
  id,
});
export const getInfoSuccess = data => ({
  type: TYPES.GET_INFO_SUCCESS,
  data,
});
export const getCity = v => ({
  v,
  type: TYPES.GET_CITY,
});
export const save = (data, billno) => ({
  data,
  billno,
  type: TYPES.SAVE,
});
export const remarkInfoShow = (id, remarkInfo) => ({
  type: TYPES.REMARK_INFO,
  id,
  remarkInfo,
});
export const remarkInfoSuccess = data => ({
  type: TYPES.REMARK_INFO_SUCCESS,
  data,
});
export const addRemark = (id, info) => ({
  id,
  info,
  type: TYPES.ADD_REMARK_INFO,
});
export const rejectInfoAction = (id, info) => ({
  id,
  info,
  type: TYPES.REJECT_INFO,
});
export const refund = (order_id, refund_bill_id, record_id, rpid, price) => ({
  order_id,
  refund_bill_id,
  record_id,
  rpid,
  price,
  type: TYPES.REFUND,
});
export const refundFail = () => ({
  type: TYPES.REFUND_FAIL,
});
export const refundSucess = data => ({
  type: TYPES.REFUND_SUCCESS,
  data,
});
export const doRefund = data => ({
  type: TYPES.DO_REFUND,
  data,
});
export const doRefundFail = () => ({
  type: TYPES.DO_REFUND_FAIL,
});
export const refundTxnId = v => ({
  type: TYPES.REFUND_TXN_ID,
  v,
});
export const reverseRefundAction = (key, value) => ({
  type: TYPES.REVERSE_REFUND,
  key,
  value,
});
export const showReverseRefund = id => ({
  type: TYPES.SHOW_REVERSE_REFUND,
  id,
});
export const reverseRefundSave = data => ({
  type: TYPES.REVERSE_REFUND_SAVE,
  data,
});
export const reverseRefundSaveFail = () => ({
  type: TYPES.REVERSE_REFUND_SAVE_FAIL,
});
export const doRefundPass = data => ({
  type: TYPES.DO_REFUND_PASS,
  data,
});