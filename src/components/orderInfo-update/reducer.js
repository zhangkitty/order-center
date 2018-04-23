import * as types from './type';
import assign from 'object-assign';

const defaultState = {
  SelectValue: [],
  uploadType: null,
  selectValueReady: true,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.getOrderUploadListSuccess:
      return assign({}, state, {
        SelectValue: action.val,
      });
    case types.change:
      return assign({}, state, {
        [action.key]: [action.value],
      });
    default:
      return state;
  }
};

export default reducer;
