import React, { PropTypes, Component } from 'react';
import { Upload, message, Icon } from 'antd';

class WrapperUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }
  componentWillReceiveProps(np) {
    if (!np.flag) {
      this.setState({ fileList: [] });
    }
  }
  render() {
    const { troubleId } = this.props;
    const { fileList } = this.state;
    return (
      <Upload
        action="/index_new.php/order/OrderLogisticsTroubles/upload"
        listType="picture-card"
        multiple
        name={'files[]'}
        fileList={fileList}
        data={{ trouble_id: troubleId }}
        showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
        beforeUpload={(file, list) => {
          const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
          if (list.length > 2 || !isImg) {
            message.error('最多只能上传2张图片,且格式为jpeg 或者 png');
            return false;
          }
          return true;
        }}
        onChange={({ file, fileList: flt }) => {
          const { status, response } = file;
          this.setState({ fileList: flt });
          if (status === 'done') {
            if (response.code !== 0) {
              message.error('操作失败');
            } else {
              message.success('操作成功');
            }
          }
        }}
      >
        {
          fileList.length >= 2 ? null :
          <div>
            <Icon type="plus" />
            <div>Upload</div>
          </div>
        }
      </Upload>
    );
  }
}
WrapperUpload.propTypes = {
  troubleId: PropTypes.string.isRequired,
};

export default WrapperUpload;
