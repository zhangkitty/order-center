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

export const addPointRewardHandleSer =action=>{
  const {props} = action
  debugger;
  const keys = ["site_from","country_id","is_cod", "orderStatus", "point_id", "point_name",'parent_id','point_type_id']
  const temp = assign({},props,{
    site_from:props.siteFrom2.join(','),
    country_id:props.country2.join(','),
    is_cod:props.COD_status2,
    orderStatus:props.order_status2,
    point_id:props.selectedRows2.map(v=>v.point).join(','),
    point_name:props.selectedRows2.map(v=>v.type_name).join(','),
    parent_id:props.selectedRows2.map(v=>v.parent_id).join(','),
    point_type_id:props.selectedRows2.map(v=>v.point_type_id).join(',')
  })

  return fetch('/Order/addPointRewardHandle',{
    method:'post',
    body:JSON.stringify(parseQuery(keys,temp))
  })
}

export const editPointRewardHandleSer =action=>{
  const {props} =  action;
  const keys = ["site_from","country_id","is_cod", "orderStatus", "point_id", "point_name",'id']
  const temp = assign({},props,{
    site_from:props.siteFrom3.join(','),
    country_id:props.country3.join(','),
    is_cod:props.COD_status3,
    orderStatus:props.order_status3,
    point_id:props.selectedRows3.map(v=>v.point).join(','),
    point_name:props.selectedRows3.map(v=>v.type_name).join(','),
    parent_id:props.selectedRows3.map(v=>v.parent_id).join(','),
    point_type_id:props.selectedRows3.map(v=>v.point_type_id).join(',')
  })

  return fetch('/Order/editPointRewardHandle',{
    method:'post',
    body:JSON.stringify(parseQuery(keys,temp))
  })
}

export const copyPointRewardHandleSer=action=>{
  const {props} =  action;
  const keys = ["site_from","country_id","is_cod", "orderStatus", "point_id", "point_name"]
  const temp = assign({},props,{
    site_from:props.siteFrom4.join(','),
    country_id:props.country4.join(','),
    is_cod:props.COD_status4,
    orderStatus:props.order_status4,
    point_id:props.selectedRows4.map(v=>v.point).join(','),
    point_name:props.selectedRows4.map(v=>v.type_name).join(','),
    parent_id:props.selectedRows4.map(v=>v.parent_id).join(','),
    point_type_id:props.selectedRows4.map(v=>v.point_type_id).join(',')
  })

  return fetch('/Order/copyPointRewardHandle',{
    method:'post',
    body:JSON.stringify(parseQuery(keys,temp))
  })
}

export const delPointRewardSer = action=>{
  const {listselectedRows}  = action.props
  const keys = ['id']
  const temp = assign({},action.props,{
    id:listselectedRows.map(v=>v.id).join(',')
  })
  return fetch('/Order/delPointReward',{
    method:'post',
    body:JSON.stringify(parseQuery(keys,temp))
  })
}


