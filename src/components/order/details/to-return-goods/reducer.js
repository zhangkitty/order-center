import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  ready: false,
  batchShow: false,
  orderId: '',
  load: false,
  chooses: [],
  modalChooses: [],
  reasons: [],
  dataSource: [],
  paths: [],
  shippingType: [],
  warehouse: [],
  submitValue: {
    order_id: null,
    return_info: [],
    refund_path: null,
    return_shipping_type: '',
    return_warehouse: null,
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.GET_INFO_SUCCESS:
      return assign({}, state, {
        ready: true,
        dataSource: action.data.goods_info.map((v, i) => assign({}, v, {
          reason: action.data.return_reason,
          key: i,
        })),
        paths: action.data.refund_path,
        shippingType: action.data.return_shipping_type || [],
        warehouse: action.data.return_warehouse || [],
        reasons: (action.data.return_reason || []).filter(v => (
          v.id > 5 || v.id === 1
        )),
        submitValue: assign({}, state.submitValue, {
          return_warehouse: action.data.default_warehouse,
          return_info: action.data.goods_info.map(({ goods_id }) => (
            {
              goods_id,
              img_thumb: [],
              reason_ids: [],
            }
            )),
        }),
      });
    case TYPES.SAVE:
      return assign({}, state, {
        load: true,
      });
    case TYPES.INFO_COMMIT:
      return assign({}, state, {
        submitValue: assign({}, state.submitValue, {
          [action.key]: action.value,
        }),
      });
    case TYPES.BATCH_CHOOSE:
      return assign({}, state, {
        batchShow: false,
        submitValue: assign({}, state.submitValue, {
          return_info: state.submitValue.return_info.map(v => assign({}, v, {
            reason_ids: action.data,
          })),
        }),
      });
    case TYPES.COMMIT:
      return assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};
