import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Modal, Radio, Input, message } from 'antd';
import { change, updateOrderTag } from './action';

import styles from './style.css';


const lan = {
  支付平台投诉订单: '支付平台投诉订单',
};
const star = (<span style={{ color: 'red' }}>*</span>);
const RG = Radio.Group;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const orderTagName = [
  __('common.orderTrouble1'),
  __('common.orderTrouble2'),
  __('common.orderTrouble3'),
  __('common.orderTrouble4'),
  __('common.orderTrouble5'),
];
const MarkTag = ({ markTag, dispatch }) => (
  <Modal
    visible={markTag.markTagVisible}
    onOk={() => {
      if (!markTag.is_trouble) {
        return message.warning(__('common.submitTitle4'));
      } else if (!markTag.remark) {
        return message.warning(__('common.submitTitle5'));
      } else if (markTag.remark.trim().length < 1) {
        return message.warning(__('common.submitTitle5'));
      }
      return dispatch(updateOrderTag(markTag));
    }}
    onCancel={() => dispatch(change('markTag', assign({}, markTag, { markTagVisible: false })))}
    okText={__('common.submitName')}
    cancelText={__('common.submitName1')}
  >
    <div className={styles.troubleBg}>
      <span>{star}{__('common.title')}</span>
      <div className={styles.troubleContent}>
        <RadioGroup
          value={markTag.is_trouble}
          onChange={e => dispatch(change('markTag', assign({}, markTag, { is_trouble: e.target.value })))}
        >
          <div className={styles.troubleListBg}>
            <div className={styles.troubleList}>
              <span>{__('common.orderTypeTitle1')}</span>
              <Radio value={4}>{__('common.orderTrouble4')}</Radio>
              <Radio value={5}>{__('common.orderTrouble5')}</Radio>
            </div>
            <div className={styles.troubleList}>
              <span>{__('common.orderTypeTitle2')}</span>
              <Radio value={1}>{__('common.orderTrouble1')}</Radio>
              <Radio value={3}>{__('common.orderTrouble3')}</Radio>
              <Radio value={6}>{lan.支付平台投诉订单}</Radio>
            </div>
            <div className={styles.troubleList}>
              <span>{__('common.orderTypeTitle3')}</span>
              <Radio value={2}>{__('common.orderTrouble2')}</Radio>
            </div>
          </div>

          {/*
            orderTagName.map((v, i) => (
              <Radio value={i + 1}>{v}</Radio>
            ))
          */}
        </RadioGroup>
      </div>

      <span>{star}{__('common.order_operation5')}</span>
      <TextArea
        className={styles.troubleContent}
        autosize={{ minRows: 2, maxRows: 6 }}
        value={markTag.remark}
        onChange={e => dispatch(change('markTag', assign({}, markTag, { remark: e.target.value })))}
      />
    </div>
  </Modal>
);
MarkTag.propTypes = {
  markTag: PropTypes.shape(),
  dispatch: PropTypes.func,
};
export default MarkTag;
