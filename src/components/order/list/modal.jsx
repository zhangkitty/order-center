import React from 'react';
import { Modal, Button, Radio, Tag } from 'antd';
import PropTypes from 'prop-types';
import { change, addPoint } from './action';
import styles from './style.css';


const lan = {
  取消: '取消',
  提交: '提交',
  补偿订单: '补偿订单',
  补偿邮箱: '补偿邮箱',
  补偿类型: '补偿类型',
};
const MyModal = (props) => {
  const { mymodalshow, dispatch, mymodaldata, addPointReason, addPointLoading } = props;
  if (Object.keys(mymodaldata).length === 0) {
    return null;
  }
  return (<Modal
    visible={mymodalshow}
    onCancel={() => dispatch(change('mymodalshow', false))}
    footer={[
      <Button key="back" onClick={() => dispatch(change('mymodalshow', false))}>{lan.取消}</Button>,
      <Button
        key="submit" type="primary" loading={addPointLoading} onClick={() => {
          dispatch(change('addPointLoading', true));
          dispatch(addPoint(mymodaldata, addPointReason));
        }}
      >
        {lan.提交}
      </Button>,
    ]}
  >
    <div style={{ paddingTop: 20 }}>
      <div><span>{lan.补偿订单}:</span><span style={{ marginLeft: 25 }}>{mymodaldata.billno}</span></div>
      <div><span>{lan.补偿邮箱}:</span><span style={{ marginLeft: 25 }}>{mymodaldata.email}</span></div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexBasis: 80 }}>{lan.补偿类型}<span style={{ color: 'red' }}>*</span></div>
        {
          <Radio.Group value={addPointReason} onChange={e => dispatch(change('addPointReason', e.target.value))}>
            <div style={{ display: 'flex' }}>
              {Object.entries(mymodaldata.data).map(v => (
                <div>
                  <Tag color="#919191" className={styles.rowTag}>{v[0]}</Tag>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {v[1].map(value => (
                      <Radio value={value}>{value.name}</Radio>
                        ))}
                  </div>
                </div>
                ))}
            </div>
          </Radio.Group>
          }
      </div>
    </div>
  </Modal>);
};

MyModal.propTypes = {
  mymodalshow: PropTypes.Boolean,
  dispatch: PropTypes.func,
  mymodaldata: PropTypes.shape(),
  addPointReason: PropTypes.shape(),
};

export default MyModal;

