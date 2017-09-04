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

export const search = data => ({
  type: TYPES.SEARCH,
  data,
});
export const searchSuccess = data => ({
  data,
  type: TYPES.SEARCH_SUCCESS,
});
export const searchFail = () => ({
  type: TYPES.SEARCH_FAIL,
});

export const searchHigh = data => ({
  type: TYPES.SEARCH_HIGH,
  data,
});
export const searchHighSuccess = data => ({
  data,
  type: TYPES.SEARCH_HIGH_SUCCESS,
});
export const searchHighFail = () => ({
  type: TYPES.SEARCH_HIGH_FAIL,
});

export const initCountry = () => ({
  type: TYPES.INIT_COUNTRY,
});
export const initCountrySuccess = data => ({
  type: TYPES.INIT_COUNTRY_SUCCESS,
  data,
});
export const initCountryFail = () => ({
  type: TYPES.INIT_COUNTRY_FAIL,
});

export const initSite = () => ({
  type: TYPES.INIT_SITE,
});
export const initSiteSuccess = data => ({
  type: TYPES.INIT_SITE_SUCCESS,
  data,
});
export const initSiteFail = () => ({
  type: TYPES.INIT_SITE_FAIL,
});

export const initPayment = () => ({
  type: TYPES.INIT_PAYMENT,
});
export const initPaymentSuccess = data => ({
  type: TYPES.INIT_PAYMENT_SUCCESS,
  data,
});
export const initPaymentFail = () => ({
  type: TYPES.INIT_PAYMENT_FAIL,
});

export const initTrouble = () => ({
  type: TYPES.INIT_TROUBLE,
});
export const initTroubleSuccess = data => ({
  type: TYPES.INIT_TROUBLE_SUCCESS,
  data,
});
export const initTroubleFail = () => ({
  type: TYPES.INIT_TROUBLE_FAIL,
});

// 会员等级
export const initMember = () => ({
  type: TYPES.INIT_MEMBER,
});
export const initMemberSuccess = data => ({
  type: TYPES.INIT_MEMBER_SUCCESS,
  data,
});
export const initMemberFail = () => ({
  type: TYPES.INIT_MEMBER_FAIL,
});

// 订单状态
export const initOrder = () => ({
  type: TYPES.INIT_ORDER,
});
export const initOrderSuccess = data => ({
  type: TYPES.INIT_ORDER_SUCCESS,
  data,
});
export const initOrderFail = () => ({
  type: TYPES.INIT_ORDER_FAIL,
});

// 取消类型
export const initCancel = () => ({
  type: TYPES.INIT_CANCEL,
});
export const initCancelSuccess = data => ({
  type: TYPES.INIT_CANCEL_SUCCESS,
  data,
});
export const initCancelFail = () => ({
  type: TYPES.INIT_CANCEL_FAIL,
});

// 商品状态
export const initGoods = () => ({
  type: TYPES.INIT_GOODS,
});
export const initGoodsSuccess = data => ({
  type: TYPES.INIT_GOODS_SUCCESS,
  data,
});
export const initGoodsFail = () => ({
  type: TYPES.INIT_GOODS_FAIL,
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
export const goodSizeSuccess = data => ({
  type: TYPES.GOODS_SIZE_SUCCESS,
  data,
});
export const goodSizeFail = () => ({
  type: TYPES.GOODS_SIZE_FAIL,
});

// 换货
export const changeGoods = id => ({
  type: TYPES.CHANGE_GOODS,
  id,
});
export const changeGoodsSuccess = data => ({
  type: TYPES.CHANGE_GOODS_SUCCESS,
  data,
});
export const changeGoodsFail = () => ({
  type: TYPES.CHANGE_GOODS_FAIL,
});

// 删除换货
export const delChange = id => ({
  type: TYPES.DEL_CHANGE,
  id,
});
export const delChangeSuccess = data => ({
  type: TYPES.DEL_CHANGE_SUCCESS,
  data,
});
export const delChangeFail = () => ({
  type: TYPES.DEL_CHANGE_FAIL,
});
export const batchOperate = (url, data) => ({
  type: TYPES.BATCH_OPERATE,
  url,
  data,
});
export const cancelRisk = id => ({
  type: TYPES.CANCEL_RISK,
  id,
});
export const cancelRiskSuccess = (data, id) => ({
  type: TYPES.CANCEL_RISK_SUCCESS,
  data,
  id,
});
export const cancelTroubleTag = (troubleId, orderId) => ({
  type: TYPES.CANCEL_TROUBLE_TAG,
  troubleId,
  orderId,
});
export const cancelTroubleTagSuccess = oid => ({
  type: TYPES.CANCEL_TROUBLE_TAG_SUCCESS,
  oid,
});
export const markTag = oid => ({
  type: TYPES.MARK_TAG,
  oid,
});
export const updateOrderTag = data => ({
  type: TYPES.UPDATE_ORDER_TAG,
  data,
});
export const updateOrderTagSuccess = data => ({
  type: TYPES.UPDATE_ORDER_TAG_SUCCESS,
  data,
});
