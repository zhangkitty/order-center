import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Modal, Radio, Input } from 'antd';
import { change, updateOrderTag } from './action';

import styles from './style.css';

const RG = Radio.Group;
const TextArea = Input.TextArea;
const orderTagName = [
  __('common.orderTrouble1'), __('common.orderTrouble2'), __('common.orderTrouble3'),
  __('common.orderTrouble4'), __('common.orderTrouble5'),
];
const MarkTag = ({ markTag, dispatch }) => (
  <Modal
    visible={markTag.markTagVisible}
    onOk={() => dispatch(updateOrderTag(markTag))}
    onCancel={() => dispatch(change('markTag', assign({}, markTag, { markTagVisible: false })))}
    okText={__('common.submitName')}
    cancelText={__('common.submitName1')}
  >
    <div className={styles.troubleBg}>
      <span>{__('common.title')}</span>
      <div className={styles.troubleContent}>
        <RG
          options={orderTagName.map((v, i) => ({ label: v, value: i + 1 }))}
          value={markTag.is_trouble}
          onChange={e => dispatch(change('markTag', assign({}, markTag, { is_trouble: e.target.value })))}
        />
      </div>
      <span>{__('common.title1')}</span>
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
