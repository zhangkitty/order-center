/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';
import { under2Camal } from '../../../lib/camal';

const chanelTypeTable = {
  礼品卡: 0,
  用户支付: 1,
  钱包: 1,
  溢出线下打款: 2,
};

const defaultState = {
  loading: false,
  ready: false,
  order_id: '',
  refund_type: 2,
  remark: '',
  refundPaths: [],
  orderPriceInfo: null,
  reason: '',
};
const maxTypes = data => (
  {
    1: data.orderPriceInfo.giftCardCanBeRefundedPrice.priceUsd.amount,
    2: parseInt(data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceUsd.amount, 10) +
    (1.5 * parseInt(data.orderPriceInfo.totalPrice.priceUsd.amount, 10)),
    3: data.orderPriceInfo.walletOrCardCanBeRefundedPrice.priceUsd.amount,
    4: (1.5 * parseInt(data.orderPriceInfo.totalPrice.priceUsd.amount, 10)),
  }
);

function changeChannelProp(refundPaths, { channel, key, val }) {
  const type = refundPaths.find(item => item.refundPathId === channel).channelType;
  return refundPaths.map((chan) => {
    if (chan.refundPathId === channel) {
      return assign({}, chan, {
        [key]: val,
      });
    }
    if (chan.channelType === type) {
      return assign({}, chan, {
        checked: false,
      });
    }
    return chan;
  });
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.INIT_REASONLIST:
      return assign({}, state, {
        loading: true,
      });
    case TYPES.INIT_REASONLIST_FAIL:
      return assign({}, state, {
        loading: false,
      });
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
    case TYPES.INIT_PRICEINFO_SUCCESS:
      return assign({}, state, {
        ready: true,
        refundPaths: action.data.orderRefundPathList.map(item => assign({}, item, {
          channelType: chanelTypeTable[item.refundPathName],
        })),
        orderPriceInfo: action.data.orderPriceInfo,
        loading: false,
      });
    case TYPES.CHANGE_CHANNEL_VALUE:
      return assign({}, state, {
        refundPaths: changeChannelProp(state.refundPaths, action),
      });
    case TYPES.CHANGE:
      return assign({}, state, {
        [action.key]: action.val,
      });
    case TYPES.SUBMIT_CHANGE:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          [action.key]: action.value,
        }),
      });
    case TYPES.ACTIVATION:
      return assign({}, state, {
        active: false,
      });

    case TYPES.RESET:
      return assign({}, state, {
        remark: '',
      });

    default:
      return state;
  }
};

export default reducer;

