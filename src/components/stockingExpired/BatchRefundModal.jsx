import React, { Component } from 'react';
import { Modal, Radio } from 'antd';
import styles from './style.css';
import { change, batchRefund } from './action';


const BatchRefundModal = (props) => {
  const { dispatch, batchRefundModalShow, refundReason,confirmLoading } = props;
  const RadioGroup = Radio.Group;
  const lan = {
    选择退款原因: '选择退款原因',
  };

  const reason = [
    { id: 5, name: '备货超期' },
    { id: 9, name: '商品无货' },
  ];
  return (
    <Modal
      visible={batchRefundModalShow}
      onCancel={() => dispatch(change('batchRefundModalShow', false))}
      onOk={() => dispatch(batchRefund(props))}
      confirmLoading={confirmLoading}
    >
      <div>
        <div className={styles.refundReason}>
          <div className={styles.left}>
            {lan.选择退款原因}:
        </div>
          <div>
            <RadioGroup
              value={refundReason}
              onChange={e => dispatch(change('refundReason', e.target.value))}
            >
              {
              reason.map(v =>
              (<div>
                <Radio value={v.id}>{v.name}</Radio>
              </div>)
              ,
            )
          }
            </RadioGroup>
          </div>
        </div>
        <div className={styles.foot}>
          提交后将生成退款单,确认对勾选商品进行退款吗？
        </div>
      </div>
    </Modal>);
};

export default BatchRefundModal;
