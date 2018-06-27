import assign from 'object-assign';
import moment from 'moment';

import * as types from './types';

const defaultState = {
  logDataSource: [
    {
      id: 1,
      name: 'Aliexpress',
      logType: '同步运单号日志',
      load: false,
      date: moment(Date.now()).format('YYYYMMDD'),
    },
    {
      id: 2,
      name: 'Aliexpress',
      logType: '自动抓单日志',
      load: false,
      date: moment(Date.now()).format('YYYYMMDD'),
    },
    {
      id: 3,
      name: 'Joom',
      logType: '同步运单号日志',
      load: false,
      date: moment(Date.now()).format('YYYYMMDD'),
    },
    {
      id: 4,
      name: 'Joom',
      logType: '自动抓单日志',
      load: false,
      date: moment(Date.now()).format('YYYYMMDD'),
    },
  ],
  allPlatForm: [],
  choosePlatForm: '',
  addChoosePlatForm: 'Joom',
  editChoosePlatForm: 'Joom',
  // 是否自定义
  isCustomize: ['是', '否'],
  chooseIsCustomize: '',
  addChooseIsCustomize: '否',
  editChooseIsCustomize: '否',
  // 自发物流渠道
  Logistics1: '',
  addLogistics1: '',
  editLogistics1: '',
  // 平台物流渠道
  Logistics2: '',
  addLogistics2: '',
  editLogistics2: '',
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
  selectedRows: [],
  selectedRowKeys: [],
  popVisiable: false,
  id: null,
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
    case types.CHNAGE_DATE:
      return assign({}, state, {
        logDataSource: state.logDataSource.map((v, i) => (i === +action.index ?
            assign({}, v, { date: action.date }) : v)),
      });
    default:
      return state;
  }
};

export default reducer;

