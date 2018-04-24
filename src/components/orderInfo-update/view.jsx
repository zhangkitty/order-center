import React, { Component } from 'react';
import { Upload, Select, Button, message } from 'antd';
import { saveAs } from 'file-saver';
import style from './style.css';
import fetch from '../../lib/fetch';

const { Option } = Select;
const reqImg = require.context('./image');


export default class Order extends Component {
  state = {
    value: [],
    type: '',
    URL: '',
  };

  componentDidMount() {
    fetch('index_new.php/OrderUpload/getOrderUploadList', { method: 'get' })
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
      action: '/Order/OrderUpload/getOrderUploadList',
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
        <span className={style.span}><span style={{ color: 'red' }}>*</span>上传类型</span>
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
          <div className={style.txt}>xls文件中一次上传订单的数量最好不要超过1000</div>
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

