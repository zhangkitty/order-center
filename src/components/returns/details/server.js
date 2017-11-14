import fetch from '../../../lib/fetch';
import { camel2Under, under2Camal } from '../../../lib/camal';

const details = {
  getOrderReturnDetail: '/OrderReturn/getOrderReturnDetail', // 退货单详情

}

export  const  getOrderReturnDetail=(id)=>(
  fetch(`${details.getOrderReturnDetail}?return_order_id=${id}`,{
    method: 'GET',
  }).then(res=>under2Camal(res))
)