import assign from 'object-assign';
import * as types from './types';

const defaultState = {
  allPlatForm: [],
  choosePlatForm: null,
  addChoosePlatForm: 'Joom',
  editChoosePlatForm: 'Joom',
  // 是否自定义
  isCustomize: ['是', '否'],
  chooseIsCustomize: null,
  addChooseIsCustomize: '否',
  editChooseIsCustomize: '否',
  // 自发物流渠道
  Logistics1: null,
  addLogistics1: null,
  editLogistics1: null,
  // 平台物流渠道
  Logistics2: null,
  addLogistics2: null,
  editLogistics2: null,
  // 追踪网址
  addTrackSite: '',
  editTrackSite: '',
  page: 1,
  page_size: 10,
  logistic_channel_list: null,
  totalItem: 0,
  currentPage: 1,
  addShow: false,
  editShow: false,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.change:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case types.add:
      return assign({}, state, {
        addShow: true,
      });
    case types.fetchEditDataSuccess:
      const temp = action.data.logistic_channel;
      const table = {
        0: '否',
        1: '是',
      };
      return assign({}, state, {
        editChoosePlatForm: temp.platform,
        editChooseIsCustomize: table[temp.support_custom],
        editLogistics1: temp.custom_channel,
        editLogistics2: temp.platform_channel,
        editTrackSite: temp.tracking_website,
      });
    default:
      return state;
  }
};

export default reducer;

