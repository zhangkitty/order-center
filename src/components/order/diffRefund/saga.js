/**
 * Create by liufeng on 2017/6/28
 */
import { message } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import * as TYPES from './types';
import { initReasonList, initPriceInfo, submitOrder } from '../server';
import {
initReasonListSuccess,
initReasonListFail,
initPriceInfoFail,
initPriceInfoSuccess,
commitSuccess,
commitFail,
} from './action';


function* initReasonListSaga(action) {
  const data = yield initReasonList(action.data);
  if (!data || data.code !== 0) {
    message.error(`获取退款原因列表失败: ${data.error}`);
    return yield put(initReasonListFail());
  }
  return yield put(initReasonListSuccess(data));
}

function* initPriceInfoSaga(action) {
  const data = yield initPriceInfo(action.data)
  console.log(data)
  if (!data || data.code !== 0) {
    message.error(`获取退款信息列表失败: ${data.error}`);
    return yield put(initPriceInfoFail());
  }
  return yield put(initPriceInfoSuccess(data));
}

function* commitSaga(action) {
  let arr=[],arr1=[],arr2=[],path=[]
  if(action.data){
    Object.keys(action.data).map((key)=>{
      if((/check/).test(key)){
        if(action.data[key]){
          arr.push(action.data[key])
        }
      }
    });

    arr.map(function (i) {
      let temp = '$'+i
      console.log(temp,'qqqq')
      arr1.push(action.data[temp])
    });
    console.log(arr,arr1,'ppp')


    arr.map(function (i) {
      if(i==4){
        arr2.push(action.data.overflow)
      }else{
        arr2.push("")
      }
    })

    console.log(arr,arr1,arr2)
    arr.map(function (value,i) {
      path.push({refund_type_id:arr[i],refund_amount:arr1[i],account:arr2[i]})
    })
  }

  const  temp={
    order_id: action.data.order_id,
    reason:   action.data.radioReason,
    refund_paths: path,
    remark: action.data.remark,
  }


  const data = yield submitOrder(temp)
  console.log(data)
  if (!data || data.code !== 0) {
    message.error(`提交差价退款订单失败: ${data.error}`);
    return yield put(commitFail());
  }
  return yield put(commitSuccess(data));
}

export default function* () {
  yield takeLatest(TYPES.INIT_REASONLIST, initReasonListSaga);
  yield takeLatest(TYPES.INIT_PRICEINFO, initPriceInfoSaga);
  yield takeLatest(TYPES.COMMIT, commitSaga);
}
