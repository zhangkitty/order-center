import fetch from '../../lib/fetch';
import queryString from '../../lib/query-string';
import { camel2Under } from '../../lib/camal';

const list = {
  getData: '/OrderLogisticsTroubles/getPagedList',
  getFilter: '/OrderLogisticsTroubles/getSearchFilters',
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
