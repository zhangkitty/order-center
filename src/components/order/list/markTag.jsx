import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Modal, Radio, Input } from 'antd';
import { change, updateOrderTag } from './action';

// TODO: 语言包 样式
const RG = Radio.Group;
const TextArea = Input.TextArea;
const orderTagName = {
  0: '正常',
  1: '问题订单',
  2: '作废订单',
  3: '风控订单',
  4: '特殊订单',
  5: '紧急订单',
};
const MarkTag = ({ markTag, dispatch }) => (
  <Modal
    visible={markTag.markTagVisible}
    onOk={() => dispatch(updateOrderTag(markTag))}
    onCancel={() => dispatch(change('markTag', assign({}, markTag, { markTagVisible: false })))}
    okText="保存"
    cancelText="取消"
  >
    <span>标记为</span>
    <RG
      options={Object.values(orderTagName).map((v, i) => ({ label: v, value: i }))}
      value={markTag.is_trouble}
      onChange={e => dispatch(change('markTag', assign({}, markTag, { is_trouble: e.target.value })))}
    />
    <span>备注</span>
    <TextArea
      autosize={{ minRows: 2, maxRows: 6 }}
      value={markTag.remark}
      onChange={e => dispatch(change('markTag', assign({}, markTag, { remark: e.target.value })))}
    />
  </Modal>
);
MarkTag.propTypes = {
  markTag: PropTypes.shape(),
  dispatch: PropTypes.func,
};
export default MarkTag;
