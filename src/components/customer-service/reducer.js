import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  dataSource: [],
  pageNumber: 1,
  pageSize: 10,
  total: 0,
  ModalVisiable: false,
  AllUserList: [],
  Countrys: [],
  selectedName: null,
  checkedCountrys: null,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.initSuccess:
      return assign({}, state, {
        dataSource: action.val.userList,
        total: action.val.total,
      });
    case types.changePageSuccess:
      return assign({}, state, {
        dataSource: action.val.userList,
        total: action.val.total,
      });
    case types.changePageSizeSuccess:
      return assign({}, state, {
        dataSource: action.val.userList,
        total: action.val.total,
      });
    case types.deleteItemSuccess:
      return assign({}, state, {
        dataSource: state.dataSource.filter(v => v.user_id !== action.val.user_id),
        total: state.total - 1,
      });
    case types.addOrEditSerSuccess:
      const arr = action.val;
      if (action.action.val) {
        return assign({}, state, {
          ModalVisiable: true,
          AllUserList: arr[0].data,
          Countrys: arr[1].data,
          selectedName: action.action.val.user_id,
          checkedCountrys: action.action.val.country_id.split(','),
        });
      }
      return assign({}, state, {
        ModalVisiable: true,
        AllUserList: arr[0].data,
        Countrys: arr[1].data,
      });


    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.val,
      });
    default:
      return state;
  }
};

export default reducer;
