import React, { Component } from 'react';
import { Modal, Select, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { changeValue, addAdminUserManage } from './action';

const Option = Select.Option;
const lan = {
  请选择物流客服: '请选择物流客服',
  分配国家: '分配国家',
};
const MyModal = (props) => {
  const { dispatch, AllUserList, Countrys, selectedName, checkedCountrys } = props;
  return (<div>
    <Modal
      visible={props.ModalVisiable}
      onCancel={() => dispatch(changeValue('ModalVisiable', false))}
      width={1000}
      onOk={() => dispatch(addAdminUserManage({ props }))}
    >
      <div>
        <span>
          {lan.请选择物流客服}
        </span>
        <Select
          showSearch
          style={{ width: 150, marginLeft: 20 }}
          allowClear
          onChange={value => dispatch(changeValue('selectedName', value))}
          value={selectedName}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
            AllUserList.map(v => (
              <Option
                value={v.user_id}
              >
                {v.user_name}
              </Option>),
            )
          }
        </Select>
      </div>
      <div style={{ marginTop: 20 }}>
        <div>{lan.分配国家}</div>
        <Checkbox.Group
          value={checkedCountrys}
          onChange={(checkedValues) => {
            console.log(checkedValues);
            dispatch(changeValue('checkedCountrys', checkedValues));
          }}
        >
          {
            Countrys.map(v => (
              <div style={{ display: 'flex' }}>
                <div style={{ flexBasis: '10%' }}>
                  {v.fist_alphabet}
                </div>
                <div style={{ flexBasis: '90%' }}>
                  {
                    v.country_info.map(val => (
                      <Checkbox
                        value={val.country_id}
                        style={{ width: 250 }}
                      >
                        {val.country}
                      </Checkbox>))
                  }
                </div>

              </div>))
          }
        </Checkbox.Group>

      </div>
    </Modal>
  </div>);
};


MyModal.propTypes = {
  ModalVisiable: PropTypes.Boolean,
  dispatch: PropTypes.func,
  AllUserList: PropTypes.arrayOf(PropTypes.object),
  Countrys: PropTypes.arrayOf(PropTypes.object),

};

export default MyModal;
