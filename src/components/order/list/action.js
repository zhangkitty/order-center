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

export const searchHeight = data => ({
  type: TYPES.SEARCH_HEIGHT,
  data,
});
export const searchHeightSuccess = data => ({
  data,
  type: TYPES.SEARCH_HEIGHT_SUCCESS,
});
export const searchHeightFail = () => ({
  type: TYPES.SEARCH_HEIGHT_FAIL,
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
export const operationGoods = () => ({
  type: TYPES.OPERATION_GOODS,
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

// 弹窗
export const openModal = () => (
  {
    type: TYPES.OPEN_MODAL,
  }
);

