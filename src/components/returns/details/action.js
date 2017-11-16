import * as TYPES from './types';

//获取退货单详情信息
export const getOrderReturnDetail=(id)=>({
  type:TYPES.GETORDERRETURNDETAIL,
    id,
})

export const getOrderReturnDetailSuccess=(data)=>({
  type:TYPES.GETORDERRETURNDETAILSUCCESS,
    data,
})

//点击已退款按钮
export const clickRefundedButton=(id)=>({
  type:TYPES.CLICKREFUNDEDBUTTON,
  id,
})

export const clickRefundedButtonSuccess=(id)=>({
  type:TYPES.CLICKREFUNDEDBUTTONSUCCESS,
  id,
})

//点击已办结按钮
export const clickAlreadyDoneButton=(id)=>({
  type:TYPES.CLICKALREADYDONEBUTTON,
  id,
})

export const clickAlreadyDoneSuccess=(id)=>({
  type:TYPES.CLICKALREADYDONEBUTTONSUCCESS,
  id,
})
