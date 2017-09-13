import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  ready: false,
  orderId: '',
  country_list: [],
  cities: [],
  citySource: [],
  districtSource: [],
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
    country_value: '',
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.GET_INFO_SUCCESS:
      return assign({}, state, {
        ready: true,
        country_list: action.data.country_list,
        submitValue: assign({}, state.submitValue, {
          order_id: state.orderId,
          gender: action.data.gender,
          first_name: action.data.first_name,
          last_name: action.data.last_name,
          country_id: action.data.country_id,
          country_value: action.data.country_list.find(v => v.id === action.data.country_id).value,
          state: action.data.state,
          city: action.data.city,
          district: action.data.district, // TODO: need
          street: action.data.street, // TODO: need
          address_line_1: action.data.address_line_1,
          address_line_2: action.data.address_line_2,
          post: action.data.post,
          telephone: action.data.telephone,
        }),
      });
    case TYPES.SAVE:
      return assign({}, state, {
        load: true,
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
