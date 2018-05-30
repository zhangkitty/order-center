import React from 'react';
import assign from 'object-assign';
import { Modal, Radio, Input, Checkbox, message } from 'antd';
import styles from './style.css';
import { change, tag } from './action';


const lan = {
  标记为: '标记为',
  正常件: '正常件',
  问题件: '问题件',
  作废件: '作废件',
  特殊订单: '特殊订单',
  紧急订单: '紧急订单',
  问题订单: '问题订单',
  风控订单: '风控订单',
  支付平台投诉订单: '支付平台投诉订单',
  作废订单: '作废订单',
  物流备注: '物流备注',
};

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

const star = (<span style={{ color: 'red' }}>*</span>);
const TextArea = Input.TextArea;
const OrderMark = (props) => {
  const { dispatch, markTag, markTagShow, troubleTag } = props;

  return (
    <div>
      <Modal
        visible={markTagShow}
        onOk={() => {
          if ((!troubleTag) || (!markTag)) {
            return message.info('信息没填全');
          }
          return dispatch(tag(props, 1));
        }}
        onCancel={() => dispatch(change('markTagShow', false))}
      >
        <Radio.Group
          onChange={e => dispatch(change('troubleTag', e.target.value))}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ flexBasis: 50 }}>{star}{lan.标记为}</div>
            <div style={{ flexBasis: 50, marginLeft: 20 }}>
              <div>{lan.正常件}</div>
              <Radio value={4}>{lan.特殊订单}</Radio>
              <Radio value={5}>{lan.紧急订单}</Radio>
            </div>
            <div style={{ flexBasis: 50, marginLeft: 20 }}>
              <div>{lan.问题件}</div>
              <Radio value={1}>{lan.问题订单}</Radio>
              <Radio value={3}>{lan.风控订单}</Radio>
              <Radio value={6}>{lan.支付平台投诉订单}</Radio>
            </div>
            <div>
              <div>{lan.作废件}</div>
              <Radio value={2}>{lan.作废订单}</Radio>
            </div>
          </div>
        </Radio.Group>


        {
          troubleTag === 4 ?
            <div>
              <span className={styles.troubleName}>{__('common.special_order')}</span>
              <div className={styles.troubleContent}>
                <Checkbox.Group
                  onChange={(e) => {
                    dispatch(change('trouble_reason', e));
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
        <div style={{ display: 'flex', marginTop: 10 }}>
          <div style={{ flexBasis: 80 }}>{star}{lan.物流备注}</div>
          <TextArea
            className={styles.troubleContent}
            autosize={{ minRows: 2, maxRows: 6 }}
            value={markTag}
            onChange={e => dispatch(change('markTag', e.target.value))}
          />
        </div>
      </Modal>
    </div>
  );
};


export default OrderMark;
