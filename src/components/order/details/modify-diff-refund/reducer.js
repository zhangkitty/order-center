import assign from 'object-assign';
import * as TYPES from './types';
import { under2Camal } from '../../../../lib/camal';

const defaultState = {
  loading: false,
  dataSource: {},
  ready: false,
  submitValue: {
    order_id: null,
    refund_type: '',
    remark: '',
    refund_paths: [],
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.GET_DATA:
      return assign({}, state, {
        loading: true,
      });

    case TYPES.GET_DATA_SUCCESS:
      console.log(action)
      return assign({}, state, {
        dataSource: under2Camal(action.res.data),
        ready: true,
      });

    // case TYPES.INIT_PRICEINFO:
    //   return assign({}, state, {
    //     loading: true,
    //   });
    //
    // case TYPES.INIT_PRICEINFO_SUCCESS:
    //   return assign({}, state, {
    //     dataSource: action.data.data,
    //     ready: true,
    //   });
    default:
      return state;
  }
};
export default reducer;

