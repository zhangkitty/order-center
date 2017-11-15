import fetch from '../../../lib/fetch';
import { camel2Under, under2Camal } from '../../../lib/camal';

const details = {
  getOrderReturnDetail: '/OrderReturn/getOrderReturnDetail', // 退货单详情
  getOrderRefund:'/OrderReturn/orderRefund',//点击客服已退款按钮
  getUpdateStatus:'/OrderReturn/updateStatus'//点击已办结按钮
}

export  const  getOrderReturnDetailSer=(id)=>(
  fetch(`${details.getOrderReturnDetail}?return_order_id=${id}`,{
    method: 'GET',
  }).then(res=>under2Camal(res))
)

export const getOrderRefundSer=(id)=>(
  fetch(`${details.getOrderRefund}?return_order_id=${id}`,{
    method:'GET',
  }).then(res=>under2Camal(res))
)

export const getUpdateStatusSer=(id)=>(
  fetch(`${details.getUpdateStatus}?return_order_id=${id}`,{
    method:'GET',
  }).then(res=>under2Camal(res))
)