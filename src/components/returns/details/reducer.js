import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  ready: false,
  returnsInfoReady:false,
  returnsInfoData:null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.GETORDERRETURNDETAILSUCCESS:
      return assign({},state,{
        returnsInfoReady:true,
        returnsInfoData:action.data,
      })
    default:
      return state;
  }
};
