import React from 'react';
import { Modal, Select, Checkbox, DatePicker, message, Radio } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { changeValue, addAdminUserManage } from './action';
import styles from './style.css';

const Option = Select.Option;
const lan = {
  请选择物流客服: '请选择物流客服',
  分配国家: '分配国家',
  提交类型: '提交类型',
  问题类型: '问题类型',
  submitTitle3: __('order.entry.order_return_15'),
};
const RedStar = () => (<span style={{ color: 'red' }}>*</span>);
const DR = DatePicker.RangePicker;
const format = 'YYYY-MM-DD HH:mm';
const RG = Radio.Group;
const CG = Checkbox.Group;
const MyModal = (props) => {
  const {
    dispatch, AllUserList, Countrys, selectedName, checkedCountrys, selectedNameDisabled,
    troubleInfoConfig, post_trouble_cate, trouble_type, start_time, end_time,
  } = props;
  const checkItems = ((troubleInfoConfig.find(v => v.value === post_trouble_cate) || {}).children || []);
  return (<div>
    <Modal
      visible={props.ModalVisiable}
      onCancel={() => dispatch(changeValue('ModalVisiable', false))}
      width={1000}
      onOk={() => {
        if (!(trouble_type && post_trouble_cate && selectedName)) {
          return message.error(lan.submitTitle3);
        }
        return dispatch(addAdminUserManage({ props }));
      }}
    >
      <div className={styles.modal}>
        <div className={styles.formLay}>
          <span className={styles.formSpan}>生效时间段</span>
          <DR
            format={format}
            value={[
              start_time ? moment(start_time) : null,
              end_time ? moment(end_time) : null,
            ]}
            showTime={{ format: 'HH:mm' }}
            onChange={(_, str) => {
              dispatch(changeValue('start_time', str[0]));
              dispatch(changeValue('end_time', str[1]));
            }}
          />
        </div>
        <div className={styles.formLay}>
          <span className={styles.formSpan}>
            <RedStar />{lan.请选择物流客服}
          </span>
          <Select
            showSearch
            style={{ minWidth: 300 }}
            allowClear
            onChange={value => dispatch(changeValue('selectedName', value))}
            value={selectedName}
            disabled={selectedNameDisabled}
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
        <div className={styles.formLay}>
          <span className={styles.formSpan}><RedStar />{lan.提交类型}</span>
          <RG
            value={post_trouble_cate}
            onChange={(e) => {
              dispatch(changeValue('post_trouble_cate', e.target.value));
              dispatch(changeValue('trouble_type', []));
            }}
          >
            {
              troubleInfoConfig.map(v => (
                <Radio value={v.value}>{v.label}</Radio>),
              )
            }
          </RG>
        </div>
        {
          post_trouble_cate &&
          <div className={styles.formLay}>
            <span className={styles.formSpan}><RedStar />{lan.问题类型}</span>
            <div style={{ width: '50%' }}>
              <Checkbox
                checked={checkItems.length === (trouble_type || []).length}
                onChange={(e) => {
                  const check = e.target.checked;
                  if (check) {
                    dispatch(changeValue('trouble_type', checkItems.map(v => v.value)));
                  } else {
                    dispatch(changeValue('trouble_type', []));
                  }
                }}
              >
                全选
              </Checkbox>
              <CG
                options={checkItems}
                value={trouble_type || []}
                onChange={value => dispatch(changeValue('trouble_type', value))}
              />
            </div>
          </div>
        }
        <div style={{ marginTop: 20 }}>
          <div>{lan.分配国家}</div>
          <Checkbox.Group
            value={checkedCountrys}
            onChange={(checkedValues) => {
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
      </div>
    </Modal>
  </div>);
};


MyModal.propTypes = {
  ModalVisiable: PropTypes.Boolean,
  dispatch: PropTypes.func,
  AllUserList: PropTypes.arrayOf(PropTypes.object),
  Countrys: PropTypes.arrayOf(PropTypes.object),
  troubleInfoConfig: PropTypes.arrayOf(PropTypes.object),
  selectedName: PropTypes.arrayOf(PropTypes.string),
  trouble_type: PropTypes.string,
  post_trouble_cate: PropTypes.string,
  checkedCountrys: PropTypes.arrayOf(PropTypes.string),
  selectedNameDisabled: PropTypes.Boolean,
  start_time: PropTypes.string,
  end_time: PropTypes.string,

};

export default MyModal;
