
import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  dataSource: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
export default reducer;
