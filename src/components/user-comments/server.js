import assign from 'object-assign'
import fetch from '../../lib/fetch'
import {parseQuery} from '../../lib/query-string'


export const initSer = ()=>{
  return Promise.all([
      fetch(`/AdminUserManage/getCountry`,{method:'get'}),
      fetch(`/OrderUserMark/getSearchConfig`,{method:'get'})
  ]).then(res=>res)
}


export const searchSer = action=>{
  const keys = [
      'billno', 'start_time','end_time','handle_status',
    'country_id','site_from','handle_result','handler','page_size','page_number'
  ]
  const temp = assign({},action.props,{
    start_time:(action.props.data)&&(action.props.data)[0],
    end_time:(action.props.data)&&(action.props.data)[1],
  })
  return fetch(`/OrderUserMark/userMarkList`,
      {
        method:'post',
        body:JSON.stringify(parseQuery(keys,temp))
      })
}

export const changePageSer = action=>{
  const keys = [
    'billno', 'start_time','end_time','handle_status',
    'country_id','site_from','handle_result','handler','page_size','page_number'
  ]
  const temp = assign({},action.props,{
    start_time:(action.props.data)&&(action.props.data)[0],
    end_time:(action.props.data)&&(action.props.data)[1],
    page_number:action.page,
    page_size:action.pageSize,
  })

  return fetch(`/OrderUserMark/userMarkList`,
      {
        method:'post',
        body:JSON.stringify(parseQuery(keys,temp))
      })
}

export const getRemarksSer=action=>{
  return fetch(`/order/remark?order_id=${action.order_id}`)
}

export const saveRemarkSer = action=>{
  const order_id = action.order_id;
  const remark = action.props.remarkValue;
  return fetch(`/order/saveRemark`,{
    method:'post',
    body:JSON.stringify({order_id,remark})
  })
}


export const getTransRemarkSer = action=>{
  return fetch(`/order/logisticsRemark?order_id=${action.order_id}`)
}

export const saveTransRemarkSer = action=>{
  const order_id =action.order_id;
  const remark = action.props.transRemark;
  return fetch(`/order/saveLogisticsRemark`,{
    method:'post',
    body:JSON.stringify({order_id,remark})
  })
}

const _isArray = v=>Array.isArray(v)?v:[v];

export const operateMarkStatusSer = action=>{
  const keys = ['id','handle_result','handle_status']
  const temp = {
    id:_isArray(action.props.id),
      //传值穿反了
    handle_status:action.props.myhandle_result,
    handle_result:action.props.myhandle_status,
  }
  return fetch(`/OrderUserMark/operateMarkStatus`,{
    method:'post',
    body:JSON.stringify(parseQuery(keys,temp))
  })
}

export const tagSer=action =>{

  const table  = {
    1:{is_trouble:action.props.troubleTag,order_id:action.props.order_id,type:action.key,remak:action.props.markTag},
    2:{is_trouble:0,order_id:action.props.order_id,type:action.key},
  }
  return fetch(`/order/tag`,{method:'post',body:JSON.stringify(table[action.key])})

}

export const userMarkExportSer=action=>{
  console.log(action)
  const keys = [
    'billno', 'start_time','end_time','handle_status',
    'country_id','site_from','handle_result','handler','page_size','page_number'
  ]
  const temp = assign({},action.props,{
    start_time:(action.props.data)&&(action.props.data)[0],
    end_time:(action.props.data)&&(action.props.data)[1],
  })
  return fetch(`/OrderUserMark/userMarkExport`,
      {
        method:'post',
        body:JSON.stringify(parseQuery(keys,temp))
      })
}
