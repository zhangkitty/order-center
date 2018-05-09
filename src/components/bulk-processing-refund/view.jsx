import React, { Component } from 'react';
import { Upload, Button, message } from 'antd';
import style from './style.css';


const lan = {
  批量上传物流原因退款: '批量上传物流原因退款',
  批量上传投诉订单退款: '批量上传投诉订单退款',
  下载样例: '下载样例',
};
export default class Order extends Component {
  state = {
    value1: {},
    value2: {},
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
            this.setState({
              value1: info.file.response.data,
              value2: this.state.value2,
            });
            message.success(info.file.response.msg);
          } else {
            message.error(info.file.response.msg);
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
            this.setState({
              value1: this.state.value1,
              value2: info.file.response.data,
            });
            message.success(info.file.response.msg);
          } else {
            message.error(info.file.response.msg);
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
          <a href="/Public/File/upload_excel/upload_refund_records.xls" style={{ marginLeft: 10 }}>
            {lan.下载样例}
          </a>
        </div>
        <div style={{ marginTop: 20 }}>
          {
            (Array.isArray(this.state.value1.records) && Array.isArray(this.state.value1.errors)) ?
              <div className={style.reason1}>
                <div>{lan.批量上传物流原因退款}</div>
                <div>
                  {
                    this.state.value1.records.map(v => <div>{v}</div>)
                  }
                </div>
                <div>
                  {
                    this.state.value1.errors.map(v => <div>{v}</div>)
                  }
                </div>
              </div>
                : null
          }
        </div>
        <div>
          {
            (Array.isArray(this.state.value2.records) && Array.isArray(this.state.value2.errors)) ?
              <div className={style.reason2}>
                <div>{lan.批量上传投诉订单退款}</div>
                <div>
                  {
                    this.state.value2.records.map(v => <div>{v}</div>)
                  }
                </div>
                <div>
                  {
                    this.state.value2.errors.map(v => <div>{v}</div>)
                  }
                </div>
              </div>
                : null
          }
        </div>
      </div>
    );
  }
}

