import assign from 'object-assign';
import moment from 'moment';
import * as TYPES from './types';

const defaultState = {
  ready: false,
  provinceLoad: false,
  show: false,
  orderId: '',
  country_list: [],
  cities: [],
  citySource: [],
  districtSource: [],
  addressShow: [],
  load: false,
  submitValue: {
    order_id: '',
    gender: '',
    first_name: '',
    last_name: '',
    country_id: '',
    state: '',
    city: '',
    district: '',
    street: '',
    address_line_1: '',
    address_line_2: '',
    post: '',
    telephone: '',
    country_value: '',  //
    english_name: '',  // 英文名
    passport_number: '',  // 护照号
    issue_place: '',  // 签发地址
    issue_date: moment(),  // 签发日期   moment()
    issue_date2: null,
  },
};
// 提交字段名: 页面显示名称
const addresName = {
  gender: __('order.entry.address_gender'),
  first_name: __('order.entry.address_first'),
  last_name: __('order.entry.address_last'),
  father_name: __('order.entry.address_father'),
  country_id: __('order.entry.address_country'),
  state: __('order.entry.address_state'),
  city: __('order.entry.address_city'),
  district: __('order.entry.address_district'),
  street: __('order.entry.address_street'),
  address_line_1: __('order.entry.address1'),
  address_line_2: __('order.entry.address2'),
  post: __('order.entry.address_post'),
  telephone: __('order.entry.address_telephone'),
  national_id: __('order.entry.address_national'),  // 身份证
  english_name: __('order.entry.address_english'),  // 英文名
  passport_number: __('order.entry.address_passport'),  // 护照号
  issue_place: __('order.entry.address_place'),  // 签发地址
  issue_date: __('order.entry.address_issue'),  // 签发日期
};
const getCity = (data, state, city) => {
  const obj = data.find(d => d.province_name === state);
  let citySource = [];
  let districtSource = [];
  if (obj) {
    citySource = obj.cities;
    const obj2 = citySource.find(d => d.city_name === city);
    if (obj2) {
      districtSource = obj2.district;
    }
  }
  return {
    citySource,
    districtSource,
  };
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.GET_INFO_SUCCESS:
      return assign({}, state, { // 页面初始化，赋值
        country_list: action.data.country_list,
        submitValue: assign({}, state.submitValue, {
          order_id: state.orderId,
          site_from: action.data.site_from,
          gender: action.data.gender,
          first_name: action.data.first_name,
          father_name: action.data.father_name,
          last_name: action.data.last_name,
          country_id: action.data.country_id,
          country_value: action.data.country_list.find(v => v.id === action.data.country_id).value,
          state: action.data.state,
          city: action.data.city,
          district: action.data.district,
          street: action.data.street,
          address_line_1: action.data.address_line_1,
          address_line_2: action.data.address_line_2,
          post: action.data.post,
          telephone: action.data.telephone,  // 电话号
          english_name: action.data.english_name, // 英文名
          passport_number: action.data.passport_number, // 护照号
          issue_place: action.data.issue_place,  // 签发地址
          issue_date: action.data.issue_date, // 签发日期
          issue_date2: action.data.issue_date, // 签发日期
        }),
      });
    case TYPES.GET_INFO_SHOW:
      return assign({}, state, {
        show: true,
      });
    case TYPES.GET_INFO_SHOW_SUCCESS:
      return assign({}, state, {
        ready: true,
        addressShow: action.data.map(v => assign({
          name: addresName[Object.keys(v)[0]] || Object.keys(v)[0],
          validate: Object.values(v)[0] === 1,  // 必填
          key: Object.keys(v)[0],
        })),
        show: false,
      });
    case TYPES.SAVE:
      return assign({}, state, {
        load: true,
      });
    case TYPES.GET_CITY:
      return assign({}, state, {
        provinceLoad: true,
      });
    case TYPES.GET_CITY_SUCCESS:
      return assign({}, state, {
        cities: action.data,
        citySource: getCity(action.data, state.submitValue.state, state.submitValue.city)
          .citySource,
        districtSource: getCity(action.data, state.submitValue.state, state.submitValue.city)
          .districtSource,
      });
    case TYPES.INFO_COMMIT:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          [action.key]: action.value,
        }),
      });
    case TYPES.COMMIT:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
