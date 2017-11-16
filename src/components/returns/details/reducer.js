import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  ready: false,
  returnsInfoReady: false,
  returnsInfoData: null,
  tracking_no_url: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.GETORDERRETURNDETAILSUCCESS:
      return assign({}, state, {
        returnsInfoReady: true,
        returnsInfoData: action.data,
        tracking_no_url: action.data.trackingNoUrl,
      });
    default:
      return state;
  }
};
