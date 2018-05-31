import React from 'react';
import { Modal, Select, message } from 'antd';
import { change, operateMarkStatus } from './action';


const lan = {
  请选择处理结果: '请选择处理结果',
};

const table = [
  { key: '请选择', value: null },
  { key: '已完成', value: 1 },
  { key: '未实现', value: 2 },
];
const ProcessModal = (props) => {
  const Option = Select.Option;
  const { processedShow, dispatch, myhandle_status, troubleTag, markTag } = props;
  return (
    <Modal
      visible={processedShow}
      onCancel={() => dispatch(change('processedShow', false))}
      onOk={() => dispatch(operateMarkStatus(props))}
    >
      <div>
        {lan.请选择处理结果}
      </div>
      <Select
        value={myhandle_status}
        onChange={(value) => {
          dispatch(change('myhandle_status', value));
        }}
      >
        {
          table.map(v =>
            (<Option value={v.value}>
              {v.key}
            </Option>),
          )
        }
      </Select>
    </Modal>);
};
export default ProcessModal;
