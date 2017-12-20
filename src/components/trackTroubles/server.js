import fetch from '../../lib/fetch';
import queryString from '../../lib/query-string';
import { camel2Under } from '../../lib/camal';

const list = {
  getData: '/OrderLogisticsTroubles/getPagedList',
  getFilter: '/OrderLogisticsTroubles/getSearchFilters',
  getRemarks: '/OrderLogisticsTroubles/getNotes',
  addRemark: '/OrderLogisticsTroubles/addNote',
  followTrouble: '/OrderLogisticsTroubles/follow',
  handledSer: 'OrderLogisticsTroubles/handle',
  uploadImgSer: '/OrderLogisticsTroubles/upload',
};

export const getDataSer = (filter) => {
  const keys = [
    'pageSize', 'pageNumber',
    'reference_number', 'shipping_method_real', 'shipping_no', 'trouble_type', 'handle_status', 'handle_result', 'handle_user_name',
    'shipping_country_name', 'site_from', 'add_time_from', 'add_time_to', 'delivery_time_from', 'delivery_time_to',
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

export const followTroubleSer = id => (
  fetch(list.followTrouble, {
    method: 'post',
    body: JSON.stringify({ trouble_id: +id }),
  })
);
export const handledSer = (id, res) => (
  fetch(list.followTrouble, {
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