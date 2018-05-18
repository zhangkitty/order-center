import fetch from '../../lib/fetch'
import {parseQuery} from '../../lib/query-string'


export const initSer = ()=>{
  return Promise.all([
      fetch(`/AdminUserManage/getCountry`,{method:'get'}),
      fetch(`/OrderUserMark/getSearchConfig`,{method:'get'})
  ]).then(res=>res)
}


export const searchSer = action=>{
  const keys = ['billno', 'start_time','end_time','handle_status','country_id','site_from','handle_result','handler','page_size','page_number']
  return fetch(`/OrderUserMark/userMarkList`,
      {
        method:'post'
      })
}
