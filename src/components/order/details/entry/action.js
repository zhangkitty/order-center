import * as TYPES from './types';

export const commit = (key, value) => ({
  type: TYPES.COMMIT,
  key,
  value,
});
export const commit2 = (key, value) => ({
  type: TYPES.COMMIT_REFUND,
  key,
  value,
});
export const getInfo = (id, bill, key) => ({
  type: TYPES.GET_INFO,
  id,
  bill,
  key,
});
export const getInfoSuccess = (data, key) => ({
  type: TYPES.GET_INFO_SUCCESS,
  data,
  key,
});
export const uploadTrackAction = data => ({
  type: TYPES.UPLOAD_TRACK,
  data,
});
export const uploadTrackSuccess = () => ({
  type: TYPES.UPLOAD_TRACK_SUCCESS,
});

export const uploadTrackShow = (order_id, return_no, key) => ({
  type: TYPES.UPLOAD_TRACK_SHOW,
  order_id,
  return_no,
  key,
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
export const preSendAction = (oid, sendType, billno, activeKey) => ({
  oid,
  sendType,
  billno,
  activeKey,
  type: TYPES.PRE_SEND,
});
export const examine = oid => ({
  oid,
  type: TYPES.EXAMINE,
});
export const examineSuccess = () => ({
  type: TYPES.EXAMINE_SUCCESS,
});
export const profitShowAction = id => ({
  type: TYPES.PROFIT_SHOW,
  id,
});
export const genRl = (id, oid, bid) => ({
  type: TYPES.GEN_RL,
  id,
  oid,
  bid,
});
export const cancelRefund = id => ({
  type: TYPES.CANCEL_REFUND,
  id,
});

export const fetchRlFee = id => ({
  type: TYPES.FETCHRLFEE,
  id,
});

export const rebuildRl = d => ({
  type: TYPES.REBUILDRL,
  d,
});
// 商品操作查询
export const operationGoods = id => ({
  type: TYPES.OPERATION_GOODS,
  id,
});
export const operationGoodsSuccess = data => ({
  type: TYPES.OPERATION_GOODS_SUCCESS,
  data,
});

// 弹窗
export const openModal = (orderId, remark) => ({
  type: TYPES.OPEN_MODAL,
  orderId,
  remark,
});

// 备注显示
export const remarkShow = id => ({
  type: TYPES.REMARK,
  id,
});
export const remarkShowSuccess = data => ({
  type: TYPES.REMARK_SUCCESS,
  data,
});


// 备注更新
export const remarkSave = (orderId, remark) => ({
  type: TYPES.REMARK_SAVE,
  orderId,
  remark,
});
export const remarkSaveSuccess = data => ({
  type: TYPES.REMARK_SAVE_SUCCESS,
  data,
});

// 物流问题反馈
export const createQs = pkgNum => ({
  pkgNum,
  type: TYPES.TRACK_TROUBLE,
});

// 物流问题反馈 创建问题
export const trackTroubleSubmit = form => ({
  form,
  type: TYPES.TRACK_TROUBLE_SUBMIT,
});


// 填写退款账号
export const refundAccount = data => ({
  type: TYPES.REFUND_ACCOUNT,
  data,
});
export const refundAccountSuccess = data => ({
  type: TYPES.REFUND_ACCOUNT_SUCCESS,
  data,
});

export const confirmReceived = (deliveryNumber, id, bill, base) => ({
  type: TYPES.CONFIRM_RECEIVED,
  deliveryNumber,
  id,
  bill,
  base,
});

// 物流反馈问题备注
export const switchRemark = (types, numbers) => ({
  type: TYPES.SWITCH_REMARK,
  types,
  numbers,
});

export const switchRemarkSet = data => ({
  type: TYPES.SWITCH_REMARK_SET,
  data,
});

// 物流反馈问题备注保存
export const questionRemarkSave = (types, note, numbers) => ({
  type: TYPES.QUESTION_REMARK_SAVE,
  types,
  note,
  numbers,
});

export const questionRemarkSaveSet = () => ({
  type: TYPES.QUESTION_REMARK_SAVE_SET,
});

// 关闭沟通记录
export const closeRemark = () => ({
  type: TYPES.CLOSE_REMARK,
});

// 显示修改rl的弹出层
export const showRLModal = (code, id) => ({
  type: TYPES.SHOW_RL_MODAL,
  code,
  id,
});


export const putRLList = data => ({
  type: TYPES.PUT_RL_LIST,
  data,
});

// 更改 RL
export const changeRl = rl => ({
  type: TYPES.CHANGE_RL,
  rl,
});

export const clearRL = () => ({
  type: TYPES.CLEAR_RL,
});
