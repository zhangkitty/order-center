import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  ready: false,
  batchShow: false,
  orderId: '',
  load: false,
  sucModal: false,
  sucModalHtml: '',
  chooses: [],
  modalChooses: [],
  reasons: [],
  rlFee: [],
  dataSource: [],
  paths: [],
  shippingType: [],
  warehouse: [],
  spinloading: true,
  submitValue: {
    order_id: null,
    return_info: [],
    refund_path: null,
    return_shipping_type: '',
    return_warehouse: null,
    rl_fee: 0,
  },
};

const RANChoose = {
  1: '广州仓', 4: '迪拜仓', 6: '印度仓',
};
const defaultRL = {
  2: '美东仓', 3: '比利时仓',
};
const getShippingType = (value) => {
  let val = 0
  value.map(v => {
    if (v.isDefault === 1) {
      val  = v.id
    }
  })
  console.log(val)
  return val
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
          refund_path: action.data.refund_path.find(v => Number(v.id) === 1) ? action.data.refund_path.find(v => Number(v.id) === 1).id : '',
          return_shipping_type: getShippingType(action.data.return_shipping_type),
        }),
        rlFee: action.data.rl_fee,
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
