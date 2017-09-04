/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';
import { under2Camal } from '../../../lib/camal';


const defaultState = {
  loading: false,
  dataSource: {},
  PriceInfo: {},
  ReasonList: [],
  orderId: null,
  total_price: {},
  gift_card_payment_price: {},
  wallet_payment_price: {},
  card_payment_price: {},
  shipping_price: {},
  shipping_insure_price: {},
  point_payment_price: {},
  coupon_payment_price: {},
  order_can_be_refunded_price: {},
  gift_card_can_be_refunded_price: {},
  wallet_or_card_can_be_refunded_price: {},
  refund_path_list: [],
  input_list: [],
  ready: false,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT_REASONLIST:
      return assign({}, state, {
        loading: true,
      })
    case TYPES.INIT_REASONLIST_FAIL:
      return assign({}, state, {
        loading: false,
      })
    case TYPES.INIT_REASONLIST_SUCCESS:
      return assign({}, state, {
        ReasonList: action.data.data[0].children || [],
        loading: false,
      });

    case TYPES.INIT_PRICEINFO: {
      return assign({}, state, {
        loading: true,
      });
    }

    case TYPES.INIT_PRICEINFO_FAIL: {
      return assign({}, state, {
        loading: false,
      });
    }
    case TYPES.INIT_PRICEINFO_SUCCESS: {
      console.log('action', action.data);
      return assign({}, state, {
        ready: true,
        dataSource: under2Camal(action.data),
        loading: false,
        PriceInfo: action.data,
        total_price: action.data.data.order_price_info.total_price,
        gift_card_payment_price: action.data.data.order_price_info.gift_card_payment_price,
        wallet_payment_price: action.data.data.order_price_info.wallet_payment_price,
        card_payment_price: action.data.data.order_price_info.card_payment_price,
        shipping_price: action.data.data.order_price_info.shipping_price,
        shipping_insure_price: action.data.data.order_price_info.shipping_insure_price,
        point_payment_price: action.data.data.order_price_info.point_payment_price,
        coupon_payment_price: action.data.data.order_price_info.coupon_payment_price,
        order_can_be_refunded_price: action.data.data.order_price_info.order_can_be_refunded_price,
        gift_card_can_be_refunded_price: action.data.data.order_price_info.gift_card_can_be_refunded_price,
        wallet_or_card_can_be_refunded_price: action.data.data.order_price_info.wallet_or_card_can_be_refunded_price,
        refund_path_list: action.data.data.order_refund_path_list,
      });
    }

    default:
      return state;
  }
};

export default reducer;

