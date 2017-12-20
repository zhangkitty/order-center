import React, { PropTypes, Component } from 'react';
import { Upload, message, Icon } from 'antd';
import { commit } from './action';

class WrapperUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: props.files,
    };
  }
  componentWillReceiveProps(np) {
    if (!np.flag) {
      this.setState({ fileList: [] });
    }
    this.setState({ fileList: np.files });
  }
  render() {
    const { troubleId, dispatch } = this.props;
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
        onRemove={(file) => {
          if (file.uid <= 0) {
            message.warning('此图片无法删除');
            return false;
          }
          return true;
        }}
        beforeUpload={(file, list) => {
          const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
          if (list.concat(fileList).length > 2 || !isImg) {
            message.error('最多只能上传2张图片,且格式为jpeg 或者 png');
            return false;
          }
          const res = [...fileList, ...list.map(f => ({
            uid: f.uid,
            name: f.name,
            status: 'done',
            url: URL.createObjectURL(f),
            thumbUrl: URL.createObjectURL(f),
            file: f,
          }))];
          this.setState({ fileList: res });
          dispatch(commit('imgList', res));
          return false;
        }}
        onChange={({ file, fileList: flt }) => {
          const { status, response } = file;
          this.setState({ fileList: flt });
          if (status === 'done') {
            if (response.code !== 0) {
              message.error(`操作失败: ${response.msg}`);
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
  files: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func,
};

export default WrapperUpload;
