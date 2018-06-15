
import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  filtersLoad: false,
  load: false,
  dataSource: [],
  count: '0',
  filters: { // 搜索条件数据源
    trouble_type: [],
    handle_status: [],
    handle_result: [],
    country: [],
    site_from: [],
    payment_method: [],
  },
  filter: { // 搜索条件
    trouble_type: [],
    handle_status: [],
    handle_result: [],
    payment_method: [],
    pageSize: 10,
    pageNumber: 1,
    reference_number: '',
    shipping_method_real: '',
    shipping_no: '',
    handle_user_name: '',
    shipping_country_name: '',
    site_from: '',
    add_time_from: '',
    add_time_to: '',
    delivery_time_from: '',
    delivery_time_to: '',
    add_user_name: '',
  },
  remarkShow: false, // 备注弹窗开关
  remarkLoad: false, // 备注弹窗数据loading
  remarkData: [], // 备注弹窗数据
  addRemarkShow: false, // 添加备注输入框开关
  remark: '', // 备注
  troubleId: '', // 记录ID
  handledShow: false, // 已处理弹窗开关
  uploadShow: false, // 上传图片弹窗开关
  imgList: [], // 上传图片文件列表
  pendingNum: '', // 待处理
  followingNum: '', // 跟进中
  processedNum: '', // 已处理
  invalidFollowingNum: '', // 无效跟进
  idList: [],
  followShow: false, // 跟进中弹窗开关
  handleStatusList: [],
  handleStatus: '',
  tracking_update: null, // 上传物流问题返回信息
  is_ignore: 0, // 包裹号已存在问题，0忽略 1新增
  edit: {}, // 编辑的数据
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.getData:
    case types.handled:
    case types.uploadImg:
    case types.getStatusAll:
      return assign({}, state, {
        load: true,
      });
    case types.handledModal:
      return assign({}, state, {
        handledShow: true,
        troubleId: action.id,
      });
    case types.filterCommit:
      return assign({}, state, {
        filter: assign({}, state.filter, { [action.key]: action.value }),
      });
    case types.getDataSuccess:
      return assign({}, state, {
        dataSource: action.data.list,
        count: action.data.count,
      });
    case types.remarkShow:
      return assign({}, state, {
        remarkShow: true,
        remarkLoad: true,
        troubleId: action.id,
      });
    case types.addRemark:
      return assign({}, state, {
        remarkLoad: true,
      });
    case types.uploadShow:
      return assign({}, state, {
        uploadShow: true,
        troubleId: action.id,
        imgList: action.imgList.map((v, i) => ({
          uid: 0 - i,
          name: v.split('/')[v.split('/').length - 1],
          status: 'done',
          url: v,
          thumbUrl: v,
        })),
      });
    case types.commit:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case types.getStatusAllSet:
      return assign({}, state, {
        pendingNum: action.data.pending_num,
        followingNum: action.data.following_num,
        processedNum: action.data.processed_num,
        invalidFollowingNum: action.data.invalid_following_num,
      });
    case types.doSelect:
      return assign({}, state, {
        idList: action.idList,
      });
    case types.exportIdSet:
      return assign({}, state, {
        idList: [],
      });
    case types.followShow:
      return assign({}, state, {
        followShow: true,
        troubleId: action.id,
      });
    case types.followShowSet:
      return assign({}, state, {
        handleStatusList: action.data,
        handleStatus: action.data[0] ? action.data[0].id : 1,
      });
    case types.followTrouble:
      return assign({}, state, {
        load: true,
        followShow: false,
      });
    case types.changeEdit: {
      const data = assign({}, state.edit);
      data[action.key] = action.value;
      return assign({}, state, {
        edit: data,
      });
    }
    default:
      return state;
  }
};
export default reducer;
