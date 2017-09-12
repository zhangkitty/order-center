/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';
import { under2Camal } from '../../../../lib/camal';


const defaultState = {
  ready: false,
  dataSource: {},
  reasons: [],
  fetchType: [],
  fetchWarehouse: [],
  clickVisible: false,
  load: false,
  loadUpdata: false,
  total: 0,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.GET_DATA_SUCCESS:
      return assign({}, state, {
        ready: true,
        dataSource: under2Camal(action.res),
      });

    default:
      return state;
  }
};

export default reducer;

