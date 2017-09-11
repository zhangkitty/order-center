import { takeEvery, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as TYPES from './types';
import { getInfoSuccess, commit } from './action';
import { getToReturnGoodsInfo, toReturnGoodsSave } from '../server';

const lan = {
  ofail: '操作失败',
  osucess: '操作成功',
  fail: '获取数据失败',
  part: '加入部分发队列成功',
};
function* getInfoSaga(action) {
  // const data = yield getToReturnGoodsInfo(action.oid, action.gid);
  const data = {
    code: 0,
    error_code: 0,
    msg: 'ok',
    data: {
      order_info: {
        order_id: 1234,
      },
      goods_info: [
        {
          goods_id: 9527,
          goods_sort: 'A',
          img_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505111675648&di=adefb6bcedec51439054e042a0095981&imgtype=0&src=http%3A%2F%2Fwww.qqpk.cn%2FArticle%2FUploadFiles%2F201109%2F20110908113149503.jpg',
        },
        {
          goods_id: 9528,
          goods_sort: 'B',
          img_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505111675649&di=e3f66b7e93ddc25a61b298deb2ad479e&imgtype=0&src=http%3A%2F%2Fwww.feizl.com%2Fupload2007%2F2012_07%2F120706000579749.jpg',
        },
      ],
      return_reason: [
        {
          id: 0,
          name: 'Damaged or defective item(s)',
        },
        {
          id: 1,
          name: 'Not true in size / measurement',
        },
        {
          id: 2,
          name: 'Poor quality of fabric / Faulty',
        },
        {
          id: 3,
          name: 'Look different / NOT as described',
        },
        {
          id: 4,
          name: 'Wrong item / size received',
        },
        {
          id: 5,
          name: 'Stains',
        },
        {
          id: 9,
          name: 'Odors issues',
        },
        {
          id: 6,
          name: 'Did Not Fit',
        },
        {
          id: 7,
          name: "Don't like / want it",
        },
        {
          id: 8,
          name: "Arrive too late / Don't need it",
        },
        {
          id: 10,
          name: 'size too big',
        },
        {
          id: 11,
          name: 'size too small',
        },
      ],
      refund_path: [
        {
          id: 1,
          name: 'wallet',
        },
        {
          id: 2,
          name: '钱包',
        },
        {
          id: 3,
          name: '礼品卡',
        },
      ],
      return_shipping_type: [
        {
          id: 1,
          name: 'RL',
        },
        {
          id: 2,
          name: 'RAN',
        },
      ],
      return_warehouse: [
        {
          id: 1,
          name: '广州仓',
        },
        {
          id: 2,
          name: '美东仓',
        },
        {
          id: 3,
          name: '比利时仓',
        },
        {
          id: 4,
          name: '迪拜仓',
        },
        {
          id: 5,
          name: '印度仓',
        },
      ],
      default_warehouse: 1, // 根据国家获取的默认仓库
    },
  };
  if (!data || data.code !== 0) {
    return message.error(`${lan.fail}:${data.msg}`);
  }
  return yield put(getInfoSuccess(data.data));
}

function* saveSaga(action) {
  const data = yield toReturnGoodsSave(action.data);
  if (!data || data.code !== 0) {
    yield put(commit('load', false));
    return message.error(`${lan.fail}:${data.msg}`);
  }
  yield put(commit('load', false));
  return message.success(lan.osucess);
}

export default function* () {
  yield takeEvery(TYPES.GET_INFO, getInfoSaga);
  yield takeEvery(TYPES.SAVE, saveSaga);
}
