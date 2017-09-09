import fetch from '../../../lib/fetch';

const entry = {
  orderDetailInfo: '/Order/getOrderDetailInfo', // 基本
  payShow: '/order/payShow', // 支付信息
  refund: '/OrderDiffRefund/getRefundBillListByOrderId', // 退款信息
  orderReturn: '/orderReturn/getReturnOrder', // 退货信息
  orderRecord: '/Order/getOrderRecord', // 订单日志
  refundEmail: '/order/refundEmail',
  getReturnGoods: '/OrderReturn/getReturnGoods',
  validateReturn: '/OrderReturn/validateReturn',
  partDelivery: '/Order/partDelivery',
  priorDelivery: '/OrderDetail/priorDelivery',
  orderBatchCheck: '/Order/orderBatchCheck',
  uploadLogisticsNumber: '/Order/uploadLogisticsNumber',
};

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
    body: JSON.stringify({ order_id, email }),
  })
);
export const backGoodsDatesSer = data => (
  fetch(entry.getReturnGoods, {
    method: 'POST',
    body: JSON.stringify(data),
  })
);
export const operateReturnSer = (oid, gid) => (
  fetch(`${entry.payShow}?order_id=${oid}&goods_id=${gid}`, {
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