import React, { Component } from 'react';
import { Upload, Button, message } from 'antd';
import style from './style.css';


const lan = {
  批量上传物流原因退款: '批量上传物流原因退款',
  批量上传投诉订单退款: '批量上传投诉订单退款',
  下载样例: '下载样例',
  错误信息: '错误信息',
  正确信息: '正确信息',
};
export default class Order extends Component {
  state = {
    value1: [],
    value2: [],
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
      onChange: (info) => {
        if (info.file.response !== undefined) {
          if (info.file.response.code === 0) {
            const temp1 = this.state.value1;
            const temp2 = this.state.value2;
            info.file.response.data.errors.map(v => temp1.push(v));
            info.file.response.data.records.map(v => temp2.push(v));
            this.setState({
              value1: temp1,
              value2: temp2,
            });
          } else {
            const temp = this.state.value1;
            temp.push(info.file.response.msg);
            this.setState({
              value1: temp,
            });
          }
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
      onChange: (info) => {
        if (info.file.response !== undefined) {
          if (info.file.response.code === 0) {
            const temp1 = this.state.value1;
            const temp2 = this.state.value2;
            info.file.response.data.errors.map(v => temp1.push(v));
            info.file.response.data.records.map(v => temp2.push(v));

            this.setState({
              value1: temp1,
              value2: temp2,
            });
          } else {
            const temp = this.state.value1;
            temp.push(info.file.response.msg);
            this.setState({
              value1: temp,
            });
          }
        }
      },
    };
    return (
      <div className={style.all}>
        <div className={style.one}>
          <Upload {...setProps1}>
            <Button>{lan.批量上传物流原因退款}</Button>
          </Upload>
          <a href="/Public/File/upload_excel/expresss_refund.xls" style={{ marginLeft: 10 }}>
            {lan.下载样例}
          </a>
        </div>
        <div className={style.two}>
          <Upload {...setProps2}>
            <Button>{lan.批量上传投诉订单退款}</Button>
          </Upload>
          <a href="/Public/File/upload_excel/complain_refund.xls" style={{ marginLeft: 10 }}>
            {lan.下载样例}
          </a>
        </div>

        <div style={{ marginTop: 20 }}>
          {

            <div className={style.reason1}>
              <div style={{ color: 'red' }}>{lan.错误信息}</div>
              <div>
                {
                  this.state.value1.map(v => <div>{v}</div>)
                }
              </div>
            </div>
          }
        </div>
        <div>
          {
            <div className={style.reason2}>
              <div style={{ color: 'blue' }}>{lan.正确信息}</div>
              <div>
                {
                  this.state.value2.map(v => <div>{v}</div>)
                }
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

