/**
 * Create by liufeng on 2017/6/28
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
export const commit2 = (key, val) => ({
  type: TYPES.COMMIT_HIGH,
  key,
  val,
});
export const commitHistory = (key, val) => ({
  type: TYPES.COMMIT_HISTORY,
  key,
  val,
});

export const commit3 = (key, val) => ({
  type: TYPES.COMMIT3,
  key,
  val,
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

// 搜索
export const search = (data) => {
  sessionStorage.setItem('search', JSON.stringify({ type: '1', data }));
  return {
    type: TYPES.SEARCH,
    data,
  };
};
export const searchSuccess = data => ({
  data,
  type: TYPES.SEARCH_SUCCESS,
});
export const searchFail = () => ({
  type: TYPES.SEARCH_FAIL,
});

// 高级搜索
export const searchHigh = (data) => {
  sessionStorage.setItem('search', JSON.stringify({ type: '2', data }));
  return {
    type: TYPES.SEARCH_HIGH,
    data,
  };
};
export const searchHighSuccess = data => ({
  data,
  type: TYPES.SEARCH_HIGH_SUCCESS,
});
export const searchHighFail = () => ({
  type: TYPES.SEARCH_HIGH_FAIL,
});

// 搜索历史订单
export const searchHistory = data => ({
  type: TYPES.SEARCH_HISTORY,
  data,
});
export const searchHistorySuccess = data => ({
  data,
  type: TYPES.SEARCH_HISTORY_SUCCESS,
});
export const searchHistoryFail = () => ({
  type: TYPES.SEARCH_HISTORY_FAIL,
});


// 初始化数据
export const initData = () => ({
  type: TYPES.INIT_DATA,
});
export const initDataSuccess = data => ({
  type: TYPES.INIT_DATA_SUCCESS,
  data,
});
export const initDataFail = () => ({
  type: TYPES.INIT_DATA_FAIL,
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
export const operationGoodsFail = () => ({
  type: TYPES.OPERATION_GOODS_FAIL,
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
export const remarkShowFail = () => ({
  type: TYPES.REMARK_FAIL,
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
export const remarkSaveFail = () => ({
  type: TYPES.REMARK_SAVE_FAIL,
});

// 物流备注显示
export const logisticsRemark = id => ({
  type: TYPES.LOGISITICS_REMARK,
  id,
});
export const logisticsRemarkSuccess = (id, data) => ({
  type: TYPES.LOGISITICS_REMARK_SUCCESS,
  id,
  data,
});
export const logisticsRemarkFail = () => ({
  type: TYPES.LOGISITICS_REMARK_FAIL,
});

// 物流备注更新
export const logisticsRemarkSave = (orderId, remark) => ({
  type: TYPES.LOGISITICS_REMARK_SAVE,
  orderId,
  remark,
});
export const logisticsRemarkSaveSuccess = data => ({
  type: TYPES.LOGISITICS_REMARK_SAVE_SUCCESS,
  data,
});
export const logisticsRemarkSaveFail = () => ({
  type: TYPES.LOGISITICS_REMARK_SAVE_FAIL,
});

//  sku查size
export const goodSize = data => ({
  type: TYPES.GOODS_SIZE,
  data,
});
export const goodSizeSuccess = (data, order_goods_id) => ({
  type: TYPES.GOODS_SIZE_SUCCESS,
  data,
  order_goods_id,
});

export const changeSize = (order_goods_id, value) => ({
  type: TYPES.CHANGESIZE,
  order_goods_id,
  value,
});

export const changeMySku = (order_goods_id, sku) => ({
  type: TYPES.CHANGEMYSKU,
  order_goods_id,
  sku,
});
// 点击确定
export const changeSubmitValue = order_goods_id => ({
  type: TYPES.CHANGESUBMITVALUE,
  order_goods_id,
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

// 批量操作 (废弃)
export const batchOperate = (url, data) => ({
  type: TYPES.BATCH_OPERATE,
  url,
  data,
});

// 取消风控订单
export const cancelRisk = id => ({
  type: TYPES.CANCEL_RISK,
  id,
});
export const cancelRiskSuccess = (data, id) => ({
  type: TYPES.CANCEL_RISK_SUCCESS,
  data,
  id,
});

// 取消订单标记
export const cancelTroubleTag = (troubleId, orderId) => ({
  type: TYPES.CANCEL_TROUBLE_TAG,
  troubleId,
  orderId,
});
export const cancelTroubleTagSuccess = oid => ({
  type: TYPES.CANCEL_TROUBLE_TAG_SUCCESS,
  oid,
});

// 订单标记弹窗
export const markTag = oid => ({
  type: TYPES.MARK_TAG,
  oid,
});

// 订单标记
export const updateOrderTag = data => ({
  type: TYPES.UPDATE_ORDER_TAG,
  data,
});
export const updateOrderTagSuccess = data => ({
  type: TYPES.UPDATE_ORDER_TAG_SUCCESS,
  data,
});

// 批量审核
export const batchCheck = (url, data) => ({
  type: TYPES.BATCH_CHECK,
  url,
  data,
});
export const batchCheckSuccess = data => ({
  type: TYPES.BATCH_CHECK_SUCCESS,
  data,
});

// 批量平台取消
export const batchDelete = (url, data) => ({
  type: TYPES.BATCH_DELETE,
  url,
  data,
});
export const batchDeleteSuccess = data => ({
  type: TYPES.BATCH_DELETE_SUCCESS,
  data,
});

// 批量部分发
export const batchPart = (url, data) => ({
  type: TYPES.BATCH_PART,
  url,
  data,
});
export const batchPartSuccess = data => ({
  type: TYPES.BATCH_PART_SUCCESS,
  data,
});

// 无货审核 批量申请
export const noStockApply = ids => ({
  type: TYPES.NO_STOCK_APPLY,
  param: { order_goods_id: ids.join(',') },
});

// 无货审核
export const noStock = ids => ({
  type: TYPES.NO_STOCK,
  param: { order_goods_id: ids.join(',') },
});

// 库存清单
export const getStockList = data => ({
  type: TYPES.GET_STOCK_LIST,
  data,
});

// 返回已审核
export const returnAlreadyAudit = ids => ({
  type: TYPES.RETURN_ALREADY_AUDIT,
  param: { order_goods_id: ids.join(',') },
});


// 无货下架
export const getNoGoodsList = () => ({
  type: TYPES.GET_NO_GOODS_LIST,
});
export const getStockListSuccess = data => ({
  type: TYPES.GET_NO_GOODS_LIST_SUCCESS,
  data,
});
export const changeNoGoodsList = (v, i, checked) => ({
  type: TYPES.CHANGE_NO_GOODS_LIST,
  checked,
  v,
  i,
});
export const changeAllSource = (v, checked) => ({
  type: TYPES.CHANGE_SOURCE_CHECKED,
  v,
  checked,
});
export const underCarriage = param => ({
  type: TYPES.UNDER_CARRIAGE,
  param,
});


// 积分补偿
export const getOrderRewardPointInfo = id => ({
  type: TYPES.GETORDERREWARDPOINTINFO,
  id,
});

// 积分补偿提交
export const addPoint = (mymodaldata, addPointReason) => ({
  type: TYPES.ADDPOINT,
  mymodaldata,
  addPointReason,
});

// 提交批量换货信息
export const batchExchangeOrderGoods = data => ({
  type: TYPES.BATCHEXCHANGEORDERGOODS,
  data,
});
// 提交成功后改变BulkReturnInfo数组
export const changeBulkReturnInfo = () => ({
  type: TYPES.CHANGEBULKRETURNINFO,
});
