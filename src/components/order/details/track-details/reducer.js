import assign from 'object-assign';
import * as Types from './types';

const defaultData = {
  data: [],
};

export default (state = defaultData, action) => {
  switch (action.type) {
    case Types.PUT_DATA:
      return assign({}, state, {
        data: action.data,
      });
    default:
      return state;
  }
};
