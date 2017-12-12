import React from 'react';
import { Modal, Button, Radio, Tag } from 'antd';
import PropTypes from 'prop-types';
import { change, addPoint } from './action';
import styles from './style.css';


const lan = {
  取消: __('order.list.modal.cancel'),
  提交: __('order.list.modal.commit'),
  补偿订单: __('order.list.modal.Compensation_Order'),
  补偿邮箱: __('order.list.modal.Compensation_Email'),
  补偿类型: __('order.list.modal.Compensation_Type'),
};
const MyModal = (props) => {
  const { mymodalshow, dispatch, mymodaldata, addPointReason, addPointLoading } = props;
  if (Object.keys(mymodaldata).length === 0) {
    return null;
  }
  return (<Modal
    visible={mymodalshow}
    width={'650px'}
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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flexBasis: 150 }}>{lan.补偿订单}:</div>
        <div>{mymodaldata.billno}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flexBasis: 150 }}>{lan.补偿邮箱}:</div>
        <div>{mymodaldata.email}</div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexBasis: 150 }}>{lan.补偿类型}<span style={{ color: 'red' }}>*</span></div>
        {
          <Radio.Group value={addPointReason} onChange={e => dispatch(change('addPointReason', e.target.value))}>
            <div style={{ display: 'flex' }}>
              {Object.entries(mymodaldata.data).map(v => (
                <div>
                  <Tag color="#919191" className={styles.rowTag}>{v[0]}</Tag>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {v[1].map(value => (
                      <Radio disabled={value.is_send} value={value}>{value.name}<span style={{ color: 'red' }}>{`(+${value.point})`}</span></Radio>
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

