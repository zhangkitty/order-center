import assign from 'object-assign';
import fetch from '../../lib/fetch';

export  const initSer =(action)=>{
  return fetch(`/AdminUserManage/getAdminUserList?pageNumber=${action.pageNumber}&pageSize=${action.pageSize}`,{
    method:'get'
  })
}
