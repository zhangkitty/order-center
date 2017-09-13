import fetch from '../../../lib/fetch';

const entry = {
  orderDetailInfo: '/Order/getOrderDetailInfo', // 基本
  payShow: '/orderDetail/payShow', // 支付信息
  refund: '/OrderDiffRefund/getRefundBillListByOrderId', // 退款信息
  orderReturn: '/orderReturn/getReturnOrder', // 退货信息
  orderRecord: '/Order/getOrderRecord', // 订单日志
  refundEmail: '/orderDetail/refundEmail', // 更新邮箱
  getReturnGoods: '/OrderReturn/getReturnGoods',
  validateReturn: '/OrderReturn/validateReturn', // 退货跳转前验证
  partDelivery: '/Order/partDelivery',
  priorDelivery: '/OrderDetail/priorDelivery',
  orderBatchCheck: '/Order/orderBatchCheck',
  uploadLogisticsNumber: '/orderReturn/uploadLogisticsNumber',
  orderProfit: '/OrderDetail/orderProfit',
  rebuildRl: '/orderReturn/rebuildRl',
};
const editAddress = {
  info: '/Order/getAddressInfo',
  city: '/Order/getCountryCityAll',
  save: '/Order/updateAddress',
}
const toReturnGoods = {
  info: '/OrderReturn/getReturnSubmitConfig',
  save: '/Order/submitReturn',
}

const goodsControl = {
  initFeedback: '/AfterSaleAccident/getQcFeedbackFrom',   // 获取所有反馈渠道配置
  initFeedbackType: '/AfterSaleAccident/getQcFeedbackType',   // 获取所有反馈原因配置
  submitData: '/AfterSaleAccident/createAfterSaleAccident',   // 提交(生成品控)
  initData: '/AfterSaleAccident/getAfterSaleAccidentInfo',   // 查看品控详情
};
const modifyDiffRefund = {
  initPriceInfo: '/OrderDiffRefund/getRefundRecordInfo', //获取订单差价退款金额信息(查询)(接口负责人:周利宝)
}
const withdraw = {
  withdraw : '/OrderDiffRefund/cashRefund',
  submitForword: '/OrderDiffRefund/submitRefund'
}

export function* getInfo(id, bill) {
  const base = fetch(`${entry.orderDetailInfo}?order_id=${id}`, {
    method: 'GET',
  });
  const pay = fetch(`${entry.payShow}?order_id=${id}`, {
    method: 'GET',
  });
  const refund = fetch(`${entry.refund}?order_id=${id}`, {
    method: 'GET',
  });
  const orderReturn = fetch(entry.orderReturn, {
    method: 'post',
    body: JSON.stringify({ order_id: Number(id), billno: bill }),
  });
  const logs = fetch(`${entry.orderRecord}?order_id=${id}`, {
    method: 'GET',
  });
  let result = { base, pay, refund, orderReturn, logs };
  const arr = Object.keys(result);
  for (let i = 0; i < arr.length; i += 1) {
    try {
      result[arr[i]] = yield result[arr[i]];
      result[arr[i]] = result[arr[i]] || {};
    } catch (e) {
      result[arr[i]] = {};
    }
  }
  return result;
}
export const updateEmailSer = (order_id, email) => (
  fetch(entry.refundEmail, {
    method: 'POST',
    body: JSON.stringify({ order_id: Number(order_id), email }),
  })
);
export const backGoodsDatesSer = data => (
  fetch(entry.getReturnGoods, {
    method: 'POST',
    body: JSON.stringify(data),
  })
);
export const operateReturnSer = (oid, gid) => (
  fetch(`${entry.validateReturn}?order_id=${oid}&goods_id=${gid}`, {
    method: 'get',
  })
);
export const partSendSer = (order_ids, inventory_type) => (
  fetch(entry.partDelivery, {
    method: 'POST',
    body: JSON.stringify({ order_ids, inventory_type }),
  })
);
export const preSendSer = (order_id, type) => (
  fetch(entry.priorDelivery, {
    method: 'POST',
    body: JSON.stringify({ order_id, type }),
  })
);
export const examineSer = order_ids => (
  fetch(entry.orderBatchCheck, {
    method: 'POST',
    body: JSON.stringify({ order_ids }),
  })
);
export const uploadtrack = data => (
  fetch(entry.uploadLogisticsNumber, {
    method: 'POST',
    body: JSON.stringify(data),
  })
);
export const profitShowSer = id => (
  fetch(entry.orderProfit, {
    method: 'POST',
    body: JSON.stringify({ order_id: Number(id) }),
  })
);
export const getAddressInfo = id => (
  fetch(`${editAddress.info}?order_id=${id}`, {
  method: 'get',
}))
export const getcitySer = value => (
  fetch(`${editAddress.city}?value=${value}`, {
    method: 'get',
  })
)
export const editAddresSave = data => (
  fetch(editAddress.save, {
    method: 'POST',
    body: JSON.stringify(data),
  })
)
export const getToReturnGoodsInfo = (oid, gid) => (
  fetch(`${toReturnGoods.info}?order_id=${oid}&goods_id=${gid}`, {
    method: 'get',
  })
)

export const toReturnGoodsSave = data => (
  fetch(toReturnGoods.save, {
    method: 'POST',
    body: JSON.stringify(data),
  })
)

// 反馈渠道配置
export const initFeedbackSer = () => (
  fetch(goodsControl.initFeedback, {
    method: 'GET',
  })
);

// 反馈渠道配置
export const initFeedbackTypeSer = () => (
  fetch(goodsControl.initFeedbackType, {
    method: 'GET',
  })
);

// 品控-提交
export const submitDataSer = data => (
  fetch(goodsControl.submitData, {
    method: 'POST',
    body: JSON.stringify(data),
  })
);

// 查看品控详情
export const initDataSer = (order_id, id) => (
  fetch(`${goodsControl.initData}?order_id=${order_id}&goods_id=${id}`, {
    method: 'get',
  })
);
export const genRlSer = id => (
  fetch(entry.rebuildRl, {
    method: 'POST',
    body: JSON.stringify({return_order_id: Number(id)}),
  })
);
export const initPriceInfo = (data)=>{
  return fetch(`${modifyDiffRefund.initPriceInfo}?order_id=${data.order_id}`,{
    method: 'GET'
  })
}
export const initWithDraw = (orderId) =>{
  return fetch(`${withdraw.withdraw}?order_id=${orderId}`,{
    method: 'GET'
  })
}
export const submitForword = (req) => {
  return fetch(withdraw.submitForword,{
    method: 'POST',
    body: JSON.stringify(camel2Under({
      req
    })),
  })
}