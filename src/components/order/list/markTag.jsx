import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Modal, Radio, Input, message, Checkbox } from 'antd';
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

const troubleReason = [
  { id: 1, name: __('common.special_order1') },
  { id: 2, name: __('common.special_order2') },
  { id: 3, name: __('common.special_order3') },
  { id: 4, name: __('common.special_order4') },
  { id: 5, name: __('common.special_order5') },
  { id: 6, name: __('common.special_order6') },
  { id: 7, name: __('common.special_order7') },
  { id: 8, name: __('common.special_order8') },
  { id: 9, name: __('common.special_order9') },
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
          onChange={(e) => {
            if (+e.target.value !== 4) {
              return dispatch(change('markTag', assign({}, markTag, { is_trouble: e.target.value, trouble_reason: [] })));
            }
            return dispatch(change('markTag', assign({}, markTag, { is_trouble: e.target.value })));
          }}
        >
          <div className={styles.troubleListBg} style={{ width: '570px' }}>
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

      {
        +markTag.is_trouble === 4 ?
          <div>
            <span className={styles.troubleName}>{__('common.special_order')}</span>
            <div className={styles.troubleContent}>
              <Checkbox.Group
                // checked={markTag.trouble_reason}
                onChange={(e) => {
                  dispatch(change('markTag', assign({}, markTag, { trouble_reason: e })));
                }}
              >
                <div className={styles.troubleListBg}>
                  {
                    troubleReason.map(v => (
                      <div className={localStorage.getItem('language') === 'zh' ? styles.troubleList : styles.troubleList2}>
                        <Checkbox key={v.id} value={v.id}><string>{v.name}</string></Checkbox>
                      </div>
                    ))
                  }
                </div>
              </Checkbox.Group>
            </div>
          </div>
          : null
      }
      {/* 物流备注 */}
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
