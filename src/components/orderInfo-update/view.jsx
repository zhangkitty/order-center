import React, { Component } from 'react';
import { Upload, Select, Button, message } from 'antd';
import { saveAs } from 'file-saver';
import style from './style.css';
import fetch from '../../lib/fetch';

const { Option } = Select;
const reqImg = require.context('./image');

const siteList = [
  // { id: '-1', value: '请选择' },
  { id: '7', value: 'shein' },
  { id: '9', value: 'romwe' },
  { id: '10', value: 'makemechic' },
];

export default class Order extends Component {
  state = {
    value: [],
    type: '',
    URL: '',
  };

  componentDidMount() {
    fetch('/OrderUpload/getOrderUploadList', { method: 'get' })
        .then((res) => {
          this.setState({
            value: res.data,
            url: res.data[0].url,
          });
        });
  }

  render() {
    const setProps = {
      name: 'file',
      action: '/OrderUpload/getOrderUploadList',
      headers: {
        authorization: 'authorization-text',
      },
      data: {
        type: this.state.type,
      },
      beforeUpload: () => {
        if (!this.state.type) {
          message.warn('请先选择站点');
          return false;
        }
        return true;
      },
      // onChange(info) {
      //   if (info.file.status === 'done') {
      //     const blob = new Blob([info.file.response], { type: 'application/vnd.ms-excel' });
      //     saveAs(blob, `下载${info.file.name}`);
      //   }
      // },
    };
    return (
      <div>
        <span className={style.span}><span style={{ color: 'red' }}>*</span>站点</span>
        <Select
          placeholder="请选择站点"
          onChange={(e) => {
            this.setState({ type: e });
          }}
          className={style.select}
          value={this.state.type}
        >
          {this.state.value.map(item => (
            <Option key={item.type} value={item.type}>
              {item.name}
            </Option>
          ))}
        </Select>
        {
          <a href={this.state.url}>下载文件</a>
        }
        <div>
          <img src={reqImg('./upload.png')} className={style.img} alt="" />
          <div className={style.txt}>联盟订单匹配，仅支持.xls格式的自定义名称文件，文件大小需小于500k，</div>
          <div className={style.txt}>文件第一栏填写“订单号”或“订单ID”</div>
        </div>
        <div className={style.upload}>
          <Upload {...setProps}>
            <Button>上传文件</Button>
          </Upload>
        </div>
      </div>
    );
  }
}

