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
    case TYPES.GET_DATA:
      return assign({}, state, {
        loading: true,
      });

    case TYPES.GET_DATA_SUCCESS:
      return assign({}, state, {
        dataSource: under2Camal(action.res.data),
        ready: true,
      });
    default:
      return state;
  }
};
export default reducer;

