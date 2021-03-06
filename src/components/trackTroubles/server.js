import fetch from '../../lib/fetch';
import queryString from '../../lib/query-string';
import { camel2Under } from '../../lib/camal';

const list = {
  getData: '/OrderLogisticsTroubles/getPagedList',
  getFilter: '/OrderLogisticsTroubles/getSearchFilters',
  getRemarks: '/OrderLogisticsTroubles/getNotes',
  addRemark: '/OrderLogisticsTroubles/addNote',
  followTrouble: '/OrderLogisticsTroubles/follow',
  handledSer: '/OrderLogisticsTroubles/handle',
  uploadImgSer: '/OrderLogisticsTroubles/upload',
  getStatusInfo: '/OrderLogisticsTroubles/getStatistics',
  exportId: '/OrderLogisticsTroubles/export',
  getFollowShow: '/OrderLogisticsTroubles/getFollowConfig',
  submitEdit: '/OrderLogisticsTroubles/modify',
  submitDelete: '/OrderLogisticsTroubles/batchDelete',
};

export const getDataSer = (filter) => {
  const keys = [
    'pageSize', 'pageNumber',
    'reference_number', 'shipping_method_real', 'shipping_no', 'trouble_type', 'handle_status', 'handle_result', 'handle_user_name',
    'shipping_country_name', 'site_from', 'add_time_from', 'add_time_to', 'delivery_time_from', 'delivery_time_to', 'add_user_name',
    'payment_method', 'post_trouble_type', 'member_level'
  ];
  return fetch(`${list.getData}?${queryString(camel2Under(keys), camel2Under(filter))}`, {
    method: 'GET',
  })
};
export const getFilters = () => (
  fetch(list.getFilter, {
    method: 'GET'
  })
);
export const getRemarks = id => (
  fetch(`${list.getRemarks}?trouble_id=${id}`, {
    method: 'GET'
  })
);

export const addRemark = (id, note) => (
  fetch(list.addRemark, {
    method: 'post',
    body: JSON.stringify({ trouble_id: +id, note }),
  })
);

export const followTroubleSer = (id, status) => (
  fetch(list.followTrouble, {
    method: 'post',
    body: JSON.stringify({ trouble_id: +id, handle_status: +status }),
  })
);
export const handledSer = (id, res) => (
  fetch(list.handledSer, {
    method: 'post',
    body: JSON.stringify({ trouble_id: +id, handle_result: +res }),
  })
);
export const uploadImgSer = (id, files) => {
  const formData = new FormData();
  const data = files.filter(v => !(v.uid <= 0)).map(v => v.file);
  data.forEach(v =>  formData.append('files[]', v));
  formData.append('trouble_id', id);
  return fetch(list.uploadImgSer, {
    method: 'post',
    body: formData,
  }, {});
};

//获取不同处理状态汇总信息
export const getStatusAllSer = () => (
  fetch(list.getStatusInfo, {
    method: 'GET',
  })
);

// 批量导出
export const exportId = (data) => {
  return fetch(`${list.exportId}`, {
    method: 'post',
    body: JSON.stringify(data),
  })
};

//获取问题认领对应的选项配置
export const followShow = () => {
  return fetch(list.getFollowShow, {
    method: 'GET',
  })
};

export const followUpSer =()=>{
  return fetch(`/AdminUserManage/getAdminUserList?page_number=${1}&page_size=${10}`,{
    method:'get'
  })
}

export const submitEditServer = da => {
  return fetch(list.submitEdit, {
    method: 'POST',
    body: JSON.stringify(da)
  })
};

export const submitDeleteServer = li => {
  return fetch(list.submitDelete, {
    method: 'POST',
    body: JSON.stringify({ trouble_ids: li.join(',') })
  })
};
