import fetch from '../../../lib/fetch';
import queryString from '../../../lib/query-string';
import { camel2Under, under2Camal } from '../../../lib/camal';

export const initSer  = (action)=>{
  const keys = ['orderId','goodsId',]
  const query = (`${queryString(camel2Under(keys),camel2Under(action))}`)
  return Promise.all(
    [
      fetch('/OrderRefund/getRefundReason?type=1',{
        method:'get'
      }),
      fetch(`/OrderRefund/getRefundInfo?${query}`,{
        method:'get'
      })
    ]
  ).then(res=>under2Camal(res))
}


export const submitSer = (data)=>{
  return fetch('/OrderRefund/applyOrderGoodsRefund',{
    method:'post',
    body:JSON.stringify(data)
  })
}
