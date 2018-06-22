import assign from 'object-assign';
import fetch from '../../../lib/fetch';
import { camel2Under,under2Camal } from  '../../../lib/camal';
import { parseQuery } from '../../../lib/query-string';

const entry = {
  orderDetailInfo: '/Order/getOrderDetailInfo', // 基本
  payShow: '/orderDetail/payShow', // 支付信息
  refund: '/OrderDiffRefund/getRefundBillListOfOrder', // 退款信息
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
  getTroubleTypes: '/OrderLogisticsTroubles/getAvailableTypes',
  trackTroublePublish: '/OrderLogisticsTroubles/publish',
  refundAccount: '/OrderRefund/addUnderlineRefund',    // 填写账户信息
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

//查看物流信息
const track = {
  details: '/Order/getTrackDetail',
}

const list = {
  operationGoods: '/Order/getOrderGoodsOperate',  // 商品操作查询
  orderRemark: '/order/remark',  // 备注查询
  confirmReceived: '/Order/confirmReceived',
  orderSaveRemark: '/order/saveRemark',  // 添加备注
};

const question = {
  switchRemark: '/OrderLogisticsTroubles/getNotes', //查看物流问题备注
  addRemarkSave: '/OrderLogisticsTroubles/addNote', //保存物流感喟问题备注
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

export const getefundbBillistbyorderidSer = (orderId)=>(
  fetch(`/OrderDiffRefund/getRefundBillListByOrderId?order_id=${orderId}`,{
    method:'get'
  })
)


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

// 物流问题记录 问题类型
export const getTroubleTypes = (pkgNum) => {
  return fetch(`${entry.getTroubleTypes}?reference_number=${pkgNum}`, {
    method: 'GET',
  })
};
// 物流问题记录 创建问题
export const trackTroublePublish = d => {
  return fetch(entry.trackTroublePublish, {
    method: 'POST',
    body: JSON.stringify(camel2Under(d)),
  })
};

//查看RL费用
export const fetchrlfeeSer = (orderId)=>(
    fetch(`${RL.fetchrlfee}?order_id=${orderId}`,{
        method:'GET',
    }).then(res=>under2Camal(res))
)

//提交RL费用
export const rebuildrlSer = (d)=>{
  const keys =  ['language', 'order_id', 'rl_fee', 'return_order_id', 'shipping_type', 'billno']
  return fetch((`${RL.postRlFeeSer}`),{
    method:'POST',
    body:JSON.stringify(camel2Under(d))
  })
}



//填写账户信息
export const refundAccountSer = (data)=> {
  const keys = ['order_id', 'refund_method', 'account_info', 'bank_code', 'account', 'customer', 'issuing_city', 'refund_method_account','card_number'];
  return fetch(entry.refundAccount, {
    method: 'POST',
    body: JSON.stringify(parseQuery(keys, data)),
  })
};

//获取物流信息

export const getInitDataServer = (id) => {
  return fetch(`${track.details}?shipping_no=${id}`, {
    method: 'GET',
  })
}

//确认收货
export const confirmReceivedServer = (deliveryNumber) => {
  return fetch(`${list.confirmReceived}?shipping_no=${deliveryNumber}`, {
    method: 'GET',
  })
}


// 物流问题反馈备注查看
export const switchRemarkSer = (types, numbers) => {
  return fetch(`${question.switchRemark}?trouble_type=${types}&reference_number=${numbers}`, {
    method: 'GET',
  })
};

// 物流问题反馈备注保存
export const questionRemarkSer = (trouble_type, note, reference_number) => (
  fetch(question.addRemarkSave, {
    method: 'post',
    body: JSON.stringify({ trouble_type, note, reference_number }),
  })
);

// 获取修改rl金额
export const showRLModalServer = (id) => (
  fetch(`/OrderReturn/getRlFeeByCurrencyCode?order_id=${id}`, {
    method: 'GET',
  })
)
// 修改rl金额
export const changeRlSerer = (id, rl) => (
  fetch(`/OrderReturn/changeRL?return_order_id=${id}&rl_charge=${rl}`, {
    method: 'GET',
  })
)



