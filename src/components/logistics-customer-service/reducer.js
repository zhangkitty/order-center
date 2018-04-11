import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  dataSource: [],
  pageNumber: 1,
  pageSize: 10,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.initSuccess:
      return assign({}, state, {
        dataSource: action.val,
      });
    default:
      return state;
  }
};

export default reducer;
