import assign from 'object-assign';
import fetch from '../../lib/fetch';

export  const initSer =(action)=>{
  return fetch(`/AdminUserManage/getAdminUserList?page_number=${action.pageNumber}&page_size=${action.pageSize}`,{
    method:'get'
  })
}

export const editAdminInfoSer = (val)=>{
  return fetch('/AdminUserManage/editAdminInfo',{
    method:'post',
    body:JSON.stringify(val)
  })
}


export const addOrEditSer = () =>{
  return Promise.all([
      fetch(`/AdminUserManage/getAllUserList`,{
        method:'get'
      }),
      fetch('/AdminUserManage/getCountry',{
        method:'get'
      }),
    fetch('/AdminUserManage/getTroubleInfoConfig',{
      method:'post',
      body:JSON.stringify({})
    })
  ])
}
