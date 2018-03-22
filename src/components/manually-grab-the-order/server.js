import fetch from '../../lib/fetch';
import { under2Camal } from '../../lib/camal'
import queryString from '../../lib/query-string';
// 手动同步商城订单(展示)
export const initManualSyncMallOrderSer = () => {
  return fetch('/SyncOrder/initManualSyncMallOrder', {
    method: 'GET',
  }).then(res => under2Camal(res))
}
//手动同步商城订单(提交)
export const manualSyncMallOrderSer = (value) => {
  const keys =['billno','type']
  return fetch(`/SyncOrder/manualSyncMallOrder?${queryString(keys,value)}`,{
     method:'get'
  })
}
  
