import React, { Component } from 'react';
import { Upload, Button, message } from 'antd';
import style from './style.css';


const lan = {
  批量上传物流原因退款: '批量上传物流原因退款',
  批量上传投诉订单退款: '批量上传投诉订单退款',
};
export default class Order extends Component {
  state = {
  };


  render() {
    const setProps1 = {
      name: 'file',
      action: '/index_new.php/Order/BatchExcelRefund/batchRefundForExpress',
      headers: {
        authorization: 'authorization-text',
      },
      beforeUpload: () => {
      },
      onChange(info) {
        if (info.fileList[0].response.code === 0) {
          message.success(info.fileList[0].response.msg);
        }
      },
    };

    const setProps2 = {
      name: 'file',
      action: '/index_new.php/Order/BatchExcelRefund/batchRefundForComplain',
      headers: {
        authorization: 'authorization-text',
      },
      beforeUpload: () => {
      },
      onChange(info) {
        if (info.fileList[0].response.code === 0) {
          message.success(info.fileList[0].response.msg);
        }
      },
    };

    return (
      <div className={style.all}>
        <div className={style.one}>
          <Upload {...setProps1}>
            <Button>{lan.批量上传物流原因退款}</Button>
          </Upload>
        </div>
        <div className={style.two}>
          <Upload {...setProps2}>
            <Button>{lan.批量上传投诉订单退款}</Button>
          </Upload>
        </div>
      </div>
    );
  }
}

