import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  ready: false,
  returnsInfoReady: false,
  returnsInfoData: null,
  tracking_no_url: null,
  buttonIsDone: null,
  buttonIsRefund: null,
  buttonIsRefundStatus: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.GETORDERRETURNDETAILSUCCESS:
      return assign({}, state, {
        returnsInfoReady: true,
        returnsInfoData: action.data,
        tracking_no_url: action.data.trackingNoUrl,
        buttonIsDone: action.data.buttonIsDone,
        buttonIsRefund: action.data.buttonIsRefund,
        buttonIsRefundStatus: action.data.refundStatus,
      });
    default:
      return state;
  }
};
