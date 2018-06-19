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
  addOrEdit: null, // edit为1,add为2
  selectedNameDisabled: false,
  troubleInfoConfig: [],
  post_trouble_cate: '1',
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
    case types.addOrEditVisible:
      return assign({}, state, {
        ModalVisiable: true,
        selectedName: action.data ? action.data.user_id : '',
        checkedCountrys: action.data ? action.data.country_id.split(',') : [],
        addOrEdit: action.data ? 1 : 2,
        post_trouble_cate: action.data ? action.data.post_trouble_cate : '',
        trouble_type: action.data ? action.data.trouble_type.split(',') : [],
        start_time: action.data ? action.data.effect_time && action.data.start_time_format : '',
        end_time: action.data ? action.data.effect_time && action.data.end_time_format : '',
        selectedNameDisabled: !!(action.data),
      });
    case types.addOrEditSerSuccess:
      return assign({}, state, {
        AllUserList: action.val[0].data,
        Countrys: action.val[1].data,
        troubleInfoConfig: action.val[2],
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
