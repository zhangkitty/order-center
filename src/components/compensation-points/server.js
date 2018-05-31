import assign from 'object-assign'

import fetch from '../../lib/fetch'

import {parseQuery} from '../../lib/query-string'

export const pointRewardConfigSer =  action=>(
    fetch('/Order/pointRewardConfig',{
      method:'post'
    })
)

export const pointRewardListSer  =action=>{
  const {props,page,pageSize}  = action
  const keys = ['page_number','page_size','site_from','country_id','is_cod','orderStatus']
  const temp = assign({},props,{
    site_from:props.siteFrom1.join(','),
    country_id:props.country1.join(','),
    is_cod:props.COD_status1,
    orderStatus:props.order_status1,
    page_number:page?page:props.page_number,
    page_size:pageSize?pageSize:props.page_size,
  })
  return fetch(`/Order/pointRewardList`,{
    method:'post',
    body:JSON.stringify(parseQuery(keys,temp))
  })
}



