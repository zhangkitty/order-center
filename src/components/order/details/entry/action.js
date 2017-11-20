import * as TYPES from './types';

export const commit = (key, value) => ({
  type: TYPES.COMMIT,
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

// 弹窗-size
export const openModalCgs = (goodsId, orderId, siteFrom) => (
  {
    type: TYPES.OPEN_MODAL_CGS,
    goodsId,
    orderId,
    siteFrom,
  }
);

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

//  sku查size
export const goodSize = data => ({
  type: TYPES.GOODS_SIZE,
  data,
});
export const goodSizeSuccess = data => ({
  type: TYPES.GOODS_SIZE_SUCCESS,
  data,
});
export const goodSizeFail = () => ({
  type: TYPES.GOODS_SIZE_FAIL,
});

// 换货
export const changeGoods = data => ({
  type: TYPES.CHANGE_GOODS,
  data,
});
export const changeGoodsSuccess = (orderId, data) => ({
  type: TYPES.CHANGE_GOODS_SUCCESS,
  data,
  orderId,
});
export const changeGoodsFail = () => ({
  type: TYPES.CHANGE_GOODS_FAIL,
});

// 删除换货
export const delChange = (oid, gid, sort) => ({
  type: TYPES.DEL_CHANGE,
  oid,
  gid,
  sort,
});
export const delChangeSuccess = (oid, gid, sort) => ({
  type: TYPES.DEL_CHANGE_SUCCESS,
  oid,
  gid,
  sort,
});
export const delChangeFail = () => ({
  type: TYPES.DEL_CHANGE_FAIL,
});

