import React from 'react';
import { Modal, Select, Input, message } from 'antd';
import styles from './style.css';
import { change, addLogisticChannel } from './action';

const add = (props) => {
  const Option = Select.Option;
  const { TextArea } = Input;
  const {
    addShow,
    dispatch,
    allPlatForm,
    addChoosePlatForm,
    isCustomize,
    addChooseIsCustomize,
    addTrackSite,
    addLogistics1,
    addLogistics2,
  } = props;
  return (
    <Modal
      title="新增"
      visible={addShow}
      onOk={() => {
        if (addLogistics1 === '' || addLogistics2 === '') {
          return message.info('有内容没填');
        }
        dispatch(addLogisticChannel(props));
      }}
      onCancel={() => {
        dispatch(change('addShow', false));
      }}

    >
      <div className={styles.row}>
        <div className={styles.divinline}>平台</div>
        <Select
          className={styles.allPlatForm}
          value={addChoosePlatForm}
          onChange={(value) => {
            dispatch(change('addChoosePlatForm', value));
            if (value !== 'Aliexpress') {
              dispatch(change('addChooseIsCustomize', '否'));
            }
          }}
        >
          {
            allPlatForm.map(v =>
              <Option value={v}>{v}</Option>,
            )
          }
        </Select>
      </div>

      <div className={styles.row}>
        <div className={styles.divinline}>是否自定义</div>
        <Select
          className={styles.allPlatForm}
          value={addChooseIsCustomize}
          onChange={value => dispatch(change('addChooseIsCustomize', value))}
          disabled={addChoosePlatForm === 'Joom' || addChoosePlatForm === 'Amazon'}
        >
          {
            isCustomize.map(v =>
              <Option value={v}>{v}</Option>,
            )
          }
        </Select>

      </div>

      <div className={styles.row}>
        <div className={styles.divinline}>自发物流渠道</div>
        <Input
          className={styles.allPlatForm}
          onChange={e => dispatch(change('addLogistics1', e.target.value))}
        />
      </div>


      <div className={styles.row} >
        <div className={styles.divinline}>平台物流渠道</div>
        <Input
          className={styles.allPlatForm}
          onChange={e => dispatch(change('addLogistics2', e.target.value))}
        />
      </div>

      {
        !!(addChooseIsCustomize === '是') &&
        <div className={styles.row}>
          <div className={styles.divinline}>追踪网址</div>
          <TextArea
            value={addTrackSite}
            className={styles.allPlatForm}
            onChange={e => dispatch(change('addTrackSite', e.target.value))}
          />
        </div>
      }
    </Modal>
  );
};

export default add;
