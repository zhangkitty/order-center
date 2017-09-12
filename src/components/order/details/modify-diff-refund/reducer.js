import assign from 'object-assign';
import * as TYPES from './types';
import { under2Camal } from '../../../../lib/camal';

const defaultState = {
  loading: false,
  dataSource: {},
  ready: false,
  submitValue: {
    orderId: null,
  },
};

const maxTypes = data => (
  {
    1: data.orderPriceInfo.giftCardCanBeRefundedPrice.priceUsd.amount,
    2: parseInt(data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceUsd.amount, 10) +
    (0.5 * parseInt(data.orderPriceInfo.totalPrice.priceUsd.amount, 10)),
    3: data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceUsd.amount,
    4: (0.5 * parseInt(data.orderPriceInfo.totalPrice.priceUsd.amount, 10)),
  }
);

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT_PRICEINFO_SUCCESS:
      console.log(action, 'action');
      return assign({}, state, {
        loading: false,
        dataSource: action.data.data,
        ready:true
      });
    default:
      return state;

  }
};
export default reducer;

