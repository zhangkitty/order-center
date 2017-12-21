import assign from 'object-assign';
import fetch from '../../../lib/fetch';
import {camel2Under,under2Camal} from '../../../lib/camal';

const entry = {
  orderDetailInfo: '/Order/getOrderDetailInfo', // 基本
  payShow: '/orderDetail/payShow', // 支付信息
  refund: '/OrderDiffRefund/getRefundBillListByOrderId', // 退款信息
  orderReturn: '/orderReturn/getReturnOrder', // 退货信息
  orderRecord: '/Order/getOrderRecord', // 订单日志
  refundEmail: '/orderDetail/refundEmail', // 更新邮箱
  getReturnGoods: '/OrderReturn/getReturnGoods', // 回货日期
  validateReturn: '/OrderReturn/validateReturn', // 退货跳转前验证
  partDelivery: '/Order/partDelivery',
  priorDelivery: '/OrderDetail/priorDelivery',
  orderBatchCheck: '/Order/orderBatchCheck',
  uploadLogisticsNumber: '/orderReturn/uploadLogisticsNumber',
  orderProfit: '/OrderDetail/orderProfit',
  rebuildRl: '/orderReturn/rebuildRl',
  cancelTheRefundBill: '/OrderDiffRefund/cancelTheRefundBill',
};
const editAddress = {
  info: '/Order/getAddressInfo',
  getAddressRequiredValues: '/Order/getAddressRequiredValues',
  city: '/Order/getCountryCityAll',
  save: '/Order/updateAddress',
}
const toReturnGoods = {
  info: '/OrderReturn/getReturnSubmitConfig',
  save: '/OrderReturn/submitReturn',
}

const goodsControl = {
  initFeedback: '/AfterSaleAccident/getQcFeedbackFrom',   // 获取所有反馈渠道配置
  initFeedbackType: '/AfterSaleAccident/getQcFeedbackType',   // 获取所有反馈原因配置
  submitData: '/AfterSaleAccident/createAfterSaleAccident',   // 提交(生成品控)
  initData: '/AfterSaleAccident/getAfterSaleAccidentInfo',   // 查看品控详情
};
const modifyDiffRefund = {
  getRefundRecordInfo: '/OrderDiffRefund/getRefundBillDetailInfo',
}
const withdraw = {
  withdraw: '/OrderDiffRefund/cashRefund',
  submitForword: '/OrderDiffRefund/submitRefund'
}

// 修改退款(商品退款，差价退款)
const changeRefund = {
  getData: '/OrderDiffRefund/getRefundBillDetailInfo',
  submit: '/OrderDiffRefund/updateRefundBillDetail'
}

// 提现退款
const cashRefund = {
  getData: '/OrderDiffRefund/cashRefund',
  submit: '/OrderRefund/applyWithDrawAndCancelWalletRefund'
}

//查看RL费用
const RL = {
    fetchrlfee :'/OrderReturn/fetchRlFee',
    postRlFeeSer:'/OrderReturn/rebuildRl'
}



const list = {
  operationGoods: '/Order/getOrderGoodsOperate',  // 商品操作查询
  orderRemark: '/order/remark',  // 备注查询
  orderSaveRemark: '/order/saveRemark',  // 添加备注
};


export const getInfoSer = (id, bill) => {
  const base = () => fetch(`${entry.orderDetailInfo}?order_id=${id}`, {
    method: 'GET',
  });
  const pay = () => fetch(`${entry.payShow}?order_id=${id}`, {
    method: 'GET',
  });
  const refund = () => fetch(`${entry.refund}?order_id=${id}`, {
    method: 'GET',
  });
  const orderReturn = () => fetch(entry.orderReturn, {
    method: 'post',
    body: JSON.stringify({order_id: Number(id), billno: bill}),
  });
  const logs = () => fetch(`${entry.orderRecord}?order_id=${id}`, {
    method: 'GET',
  });
  return {base, pay, refund, orderReturn, logs};
}
export const updateEmailSer = (order_id, email) => (
  fetch(entry.refundEmail, {
    method: 'POST',
    body: JSON.stringify({order_id: Number(order_id), email}),
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
    body: JSON.stringify({order_ids, inventory_type}),
  })
);
export const preSendSer = (order_id, type) => (
  fetch(entry.priorDelivery, {
    method: 'POST',
    body: JSON.stringify({order_id, type}),
  })
);
export const examineSer = order_ids => (
  fetch(entry.orderBatchCheck, {
    method: 'POST',
    body: JSON.stringify({order_ids}),
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
    body: JSON.stringify({order_id: Number(id)}),
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
export const genRlSer = (id,oid) => (
  fetch(entry.rebuildRl, {
    method: 'POST',
    body: JSON.stringify({return_order_id: Number(id),order_id:Number(oid)}),
  })
);
export const initPriceInfo = (data) => {
  return fetch(`${modifyDiffRefund.initPriceInfo}?order_id=${data.order_id}`, {
    method: 'GET'
  })
}
export const getRefundRecordInfo = (data) => {
  return fetch(`${modifyDiffRefund.getRefundRecordInfo}?refund_bill_id=${data.refund_bill_id}`, {
    method: 'GET'
  })
}
export const initWithDraw = (orderId) => {
  return fetch(`${withdraw.withdraw}?order_id=${orderId}`, {
    method: 'GET'
  })
}
export const submitForword = (req) => {
  return fetch(withdraw.submitForword, {
    method: 'POST',
    body: JSON.stringify(camel2Under({
      req
    })),
  })
}
export const cancelRefundSer = id => (
  fetch(entry.cancelTheRefundBill, {
    method: 'POST',
    body: JSON.stringify({refund_bill_id: Number(id)}),
  })
)


//  修改退款
export const getDataSer = (orderId) => (
  fetch(`${changeRefund.getData}?refund_bill_id=${orderId}`, {
    method: 'GET',
  })
);

export const goodsRefundSubmit = d => {
  // let wantList = [];  // 筛选多余参数
  // d.refundList.map(item => {
  //   let temp = {};
  //   temp.recordId = item.recordId;
  //   temp.refundAmount = item.refundAmount;
  //   wantList.push(temp);
  // })
  // d.refundList = wantList;
  // console.log(d);
  return fetch(changeRefund.submit, {
    method: 'POST',
     body: JSON.stringify(camel2Under(d)),
  })
};


//  提现退款
export const cashDataSer = (orderId) => (
  fetch(`${cashRefund.getData}?order_id=${orderId}`, {
    method: 'GET',
  })
);

export const cashRefundSubmit = d => {
  return fetch(cashRefund.submit, {
    method: 'POST',
    body: JSON.stringify(camel2Under(d)),
   //  body: JSON.stringify(assign({}, camel2Under(d),
   //    {
   //    currency: Symbol('noneed'),
   //    rate: Symbol('noneed'),
   //    rate2: Symbol('noneed'),
   //    refund_amount: Symbol('noneed'),
   //    refund_amount2: Symbol('noneed'),
   //    refund_method: Symbol('noneed'),
   //    account: Symbol('noneed'),
   //  }
   //  )),
  })
};
export const addressShow = (site, countryId) => (
  fetch(`${editAddress.getAddressRequiredValues}?site_from=${site}&country_id=${countryId}`, {
    method: 'GET',
  })
)


// 商品操作查询
export const operationGoodsSer = id => (
  fetch(`${list.operationGoods}?order_goods_id=${id}`, {
    method: 'GET',
  })
);

// 订单备注-查看
export const remarkSer = id => {
//  const keys = ['order_id'];
  return fetch(`${list.orderRemark}?order_id=${id}`, {
    method: 'GET',
  })
};

// 订单备注-更新
export const remarkSaveSer = (orderId, remark) => (
  fetch(list.orderSaveRemark, {
    method: 'POST',
    body: JSON.stringify(camel2Under({
      orderId , remark
    })),
  })
);

//查看RL费用
export const fetchrlfeeSer = (orderId)=>(
    fetch(`${RL.fetchrlfee}?order_id=${orderId}`,{
        method:'GET',
    }).then(res=>under2Camal(res))
)

//提交RL费用
export const rebuildrlSer = (d)=>(
    fetch((`${RL.postRlFeeSer}`),{
      method:'POST',
      body:JSON.stringify(camel2Under(d))
    })
)

