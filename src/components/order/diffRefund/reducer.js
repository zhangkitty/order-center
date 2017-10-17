/**
 * Create by liufeng on 2017/6/28
 */
import assign from 'object-assign';
import * as TYPES from './types';

const chanelTypeTable = {
  1: 0,
  2: 1,
  3: 1,
  4: 2,
};

const defaultState = {
  loading: false,
  ready: false,
  order_id: null,
  refund_type: 2,
  remark: '',
  refundPaths: [],
  ReasonList: [],
  orderPriceInfo: null,
  reason: null,
  maxTips: {},
  submitLoad: false,
  submitdisabled: false,
};

const getMax = d => ({
  1: d.giftCardCanBeRefundedPrice.priceUsd.amount,
  2: (Number(d.totalPrice.priceUsd.amount) * 1.5) +
  Number(d.walletOrCardCanBeRefundedPrice.priceUsd.amount),
  3: d.cardCanBeRefundedPrice.priceUsd.amount,
  4: (Number(d.totalPrice.priceUsd.amount) * 1.5),
  disabled: 0,
});

// 改变refundPaths里面的内容
function changeChannelProp(refundPaths, { channel, key, val }) {
  const type = refundPaths.find(item => item.refundPathId === channel) || {}.channelType;
  const res = refundPaths.map((chan) => {
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
  return res;
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
          channelType: chanelTypeTable[item.refundPathId],
          refund_method: '',
          refund_method1: '',
          refundAmount1: 0,
          refundAmount: 0,
        })),
        maxTips: getMax(action.data.orderPriceInfo),
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

    case TYPES.SUBMIT:
      return assign({}, state, {
        submitLoad: true,
      });
    case TYPES.ACTIVATION:
      return assign({}, state, {
        active: false,
      });

    case TYPES.RESET:
      return assign({}, state, {
        reason: null,
        remark: '',
        refundPaths: state.refundPaths.map(v => assign({}, v, {
          checked: false,
          refundValue: '',
          refund_method: null,
          account: '',
        })),
      });

    default:
      return state;
  }
};

export default reducer;

