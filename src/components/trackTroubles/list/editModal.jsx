import React from 'react';
import { Modal, Select } from 'antd';
import { commit, changeEdit } from './action';
import style from './style.css';

const lang = {
  result: __('order.entry.result'),
  problemType: __('order.entry.problemType'),
  status: __('order.entry.status'),
  confirm: __('order.entry.confirm'),
  cancel: __('order.entry.cancel'),
};

export default class EditModal extends React.Component {
  render() {
    const { editModal, dispatch, filters } = this.props;
    return (
      <Modal
        visible={editModal}
        onCancel={() => dispatch(commit('editModal', false))}
      >
        <div className={style.content}>
          <span className={style.span}>{lang.result}:</span>
          <Select className={style.select} onChange={data => dispatch(changeEdit('handle_result', data))}>
            {
              filters.handle_result.map(a => (
                <Select.Option value={a.id}>{a.name}</Select.Option>
              ))
            }
          </Select>
        </div>
        <div className={style.content}>
          <span className={style.span}>{lang.problemType}:</span>
          <Select className={style.select} onChange={data => dispatch(changeEdit('trouble_type', data))}>
            {
              filters.trouble_type.map(a => (
                <Select.Option value={a.id}>{a.name}</Select.Option>
              ))
            }
          </Select>
        </div>
        <div className={style.content}>
          <span className={style.span}>{lang.status}:</span>
          <Select className={style.select} onChange={data => dispatch(changeEdit('handle_status', data))}>
            {
              filters.handle_status.map(a => (
                <Select.Option value={a.id}>{a.name}</Select.Option>
              ))
            }
          </Select>
        </div>
      </Modal>
    );
  }
}
