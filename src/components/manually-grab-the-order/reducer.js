import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  typeList: [],
  site: null,
  billno: null,
  submitloading: false,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.CHANGE:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};

export default reducer;
