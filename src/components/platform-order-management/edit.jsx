import React from 'react';
import { Modal, Select, Input } from 'antd';
import styles from './style.css';
import { change, addLogisticChannel } from './action';

const add = (props) => {
  const Option = Select.Option;
  const { TextArea } = Input;
  const {
    editShow,
    dispatch,
    allPlatForm,
    editChoosePlatForm,
    isCustomize,
    editChooseIsCustomize,
    editTrackSite,
    editLogistics1,
    editLogistics2,
  } = props;
  return (
    <Modal
      title="编辑"
      visible={editShow}
      onOk={() => {
        dispatch(addLogisticChannel(props));
      }}
      onCancel={() => {
        dispatch(change('editShow', false));
      }}
    >
      <div className={styles.row}>
        <div className={styles.divinline}>平台</div>
        <Select
          className={styles.allPlatForm}
          value={editChoosePlatForm}
          onChange={(value) => {
            dispatch(change('editChoosePlatForm', value));
            if (value !== 'Aliexpress') {
              dispatch(change('editChooseIsCustomize', '否'));
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
          value={editChooseIsCustomize}
          onChange={value => dispatch(change('editChooseIsCustomize', value))}
          disabled={editChoosePlatForm === 'Joom' || editChoosePlatForm === 'Amazon'}
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
          value={editLogistics1}
          onChange={e => dispatch(change('editLogistics1', e.target.value))}
        />
      </div>


      <div className={styles.row} >
        <div className={styles.divinline}>平台物流渠道</div>
        <Input
          value={editLogistics2}
          className={styles.allPlatForm}
          onChange={e => dispatch(change('editLogistics2', e.target.value))}
        />
      </div>

      {
          !!(editChooseIsCustomize === '是') &&
          <div className={styles.row}>
            <div className={styles.divinline}>追踪网址</div>
            <TextArea
              value={editTrackSite}
              className={styles.allPlatForm}
              onChange={e => dispatch(change('editTrackSite', e.target.value))}
            />
          </div>
        }
    </Modal>
  );
};

export default add;
