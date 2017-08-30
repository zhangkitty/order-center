/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';


const defaultState = {
  dataSource: {
    order_price_info: {
      total_price: {
        price_usd: {
          amount: 4.00,
          amount_with_symbol: '$4.00',
          rate: 1.00000,
        },
        price_with_exchange_rate: {
          amount: 4.00,
          amount_with_symbol: '4.00€',
          rate: 9.1111,
        },
      },
      gift_card_payment_price: {
        price_usd: {
          amount: 4.00,
          amount_with_symbol: '$4.00',
          rate: 1.00000,
        },
        price_with_exchange_rate: {
          amount: 4.00,
          amount_with_symbol: '4.00€',
          rate: 9.1111,
        },
      },
      wallet_payment_price: {
        price_usd: {
          amount: 4.00,
          amount_with_symbol: '$4.00',
          rate: 1.00000,
        },
        price_with_exchange_rate: {
          amount: 4.00,
          amount_with_symbol: '4.00€',
          rate: 9.1111,
        },
      },
      card_payment_price: {
        price_usd: {
          amount: 4.00,
          amount_with_symbol: '$4.00',
          rate: 1.00000,
        },
        price_with_exchange_rate: {
          amount: 4.00,
          amount_with_symbol: '4.00€',
          rate: 9.1111,
        },
      },
      shipping_price: {
        price_usd: {
          amount: 4.00,
          amount_with_symbol: '$4.00',
          rate: 1.00000,
        },
        price_with_exchange_rate: {
          amount: 4.00,
          amount_with_symbol: '4.00€',
          rate: 9.1111,
        },
      },
      shipping_insure_price: {
        price_usd: {
          amount: 4.00,
          amount_with_symbol: '$4.00',
          rate: 1.00000,
        },
        price_with_exchange_rate: {
          amount: 4.00,
          amount_with_symbol: '4.00€',
          rate: 9.1111,
        },
      },
      point_payment_price: {
        price_usd: {
          amount: 4.00,
          amount_with_symbol: '$4.00',
          rate: 1.00000,
        },
        price_with_exchange_rate: {
          amount: 4.00,
          amount_with_symbol: '4.00€',
          rate: 9.1111,
        },
      },
    },
  },
  load: false,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT_REASONLIST:
      return assign({}, state, {
        load: false,
      });
  default:
    return state;
  }
};

export default reducer;

