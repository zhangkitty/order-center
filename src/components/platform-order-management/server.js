import assign from 'object-assign'
import fetch from '../../lib/fetch'
import query,{parseQuery} from '../../lib/query-string'

export const getListPlatFormSer = ()=>(
    fetch(`/FlatOrder/listPlatform`,{
      method:'get'
    })
)

export const getListLogisticChannelSer = (action)=>{
  const keys = ['page','page_size','platform','support_custom','platform_channel','custom_channel']
  const temp = assign({},action.value,{
    'platform':action.value.choosePlatForm,
    'support_custom':action.value.chooseIsCustomize,
    'custom_channel':action.value.Logistics1,
    'platform_channel':action.value.Logistics2
  })
  return fetch(`/FlatOrder/listLogisticChannel?${query(keys,temp)}`,{
    method:'get'
  })
}

export const changePageSer=action=>{
  const keys = ['page','page_size','platform','support_custom','platform_channel','custom_channel']
  const temp = assign({},action.props,{
    'page':action.page,
    'page_size':action.pageSize,
    'platform':action.props.choosePlatForm,
    'support_custom':action.props.chooseIsCustomize,
    'custom_channel':action.props.Logistics1,
    'platform_channel':action.props.Logistics2
  })
  return fetch(`/FlatOrder/listLogisticChannel?${query(keys,temp)}`,{
    method:'get'
  })
}

export const addLogisticChannelSer=action=>{
  const table = {
    '是':1,
    '否':0,
  }
  const keys = ['platform','support_custom','custom_channel','platform_channel','tracking_website']
  const temp = assign({},action.props,{
    'platform':action.props.addChoosePlatForm,
    'support_custom':table[action.props.addChooseIsCustomize],
    'custom_channel':action.props.addLogistics1,
    'platform_channel':action.props.addLogistics2,
    'tracking_website':action.props.addTrackSite,
  })
  return fetch(`/FlatOrder/addLogisticChannel`,{
    method:'post',
    body:JSON.stringify(parseQuery(keys,temp))
  })
}

export const editSer = action=>{
  return fetch(`/FlatOrder/findLogisticChannelById?id=${+action.id}`,{
    method:'get'
  })
}
