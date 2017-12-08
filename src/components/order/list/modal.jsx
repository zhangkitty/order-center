import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import { change } from './action';


const lan = {
  取消: '取消',
  提交: '提交',
};
const MyModal = (props) => {
  const { mymodalshow, dispatch } = props;
  return (<Modal
    title="Basic Modal"
    visible={mymodalshow}
    onCancel={() => dispatch(change('mymodalshow', false))}
    footer={[
      <Button key="back" onClick={() => dispatch(change('mymodalshow', false))}>{lan.取消}</Button>,
      <Button key="submit" type="primary" loading={false} onClick={() => console.log('mdzz')}>
        {lan.提交}
      </Button>,
    ]}
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>);
};

MyModal.PropTypes = {
  mymodalshow: PropTypes.Boolean,
  dispatch: PropTypes.func,
};

export default MyModal;

