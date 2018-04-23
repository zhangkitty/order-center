import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Upload, Icon, Button, Input, Spin } from 'antd';
import { getOrderUploadList, change } from './action';

const lan = {
  上传类型: '上传类型',
  上传订单xls: '上传订单xls',
};

const Option = Select.Option;
class OrderInfoUpdate extends Component {
  constructor(props) {
    super(props);
    props.dispatch(getOrderUploadList());
  }

  render() {
    const {
      SelectValue,
      uploadType,
        selectValueReady,
        dispatch,
    } = this.props;
    return (
      selectValueReady ? <div>
        <div>
          <span>{lan.上传类型}</span>
          <Select
            style={{ width: 100 }}
            placeholder="请选择"
            value={uploadType}
            onChange={value => dispatch(change('uploadType', value))}
          >
            {
              SelectValue.map(v => (
                <Option key={v.type}>{v.name}</Option>
              ))
            }
          </Select>
        </div>
        <div>
          <span>{lan.上传订单xls}</span>
          <Upload
            name="file"
            action="//jsonplaceholder.typicode.com/posts/"
            beforeUpload={(file, fileList) => {
              debugger;
              console.log(file);
              console.log(fileList);
              return false;
            }}
            onChange={info => console.log(info)}
          >
            <Button>
              <Icon type="upload" /> xls文件上传
            </Button>
          </Upload>
        </div>
      </div>
          :
      <Spin />
    );
  }
}

const mapStateToProps = state => state['orderInfo-update'];
export default connect(mapStateToProps)(OrderInfoUpdate);

