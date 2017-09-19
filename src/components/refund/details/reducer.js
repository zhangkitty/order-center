import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  ready: false,
  refundBillId: '',
  dataSource: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.GET_INFO_SUCCESS:
      return assign({}, state, {
        ready: true,
        dataSource: action.data,
      });
    case TYPES.SAVE:
      return assign({}, state, {
        load: true,
      });
    case TYPES.COMMIT:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
