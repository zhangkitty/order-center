import React, { PropTypes } from 'react';
import { Modal, Radio, Input, Button, message } from 'antd';
import assign from 'object-assign';
import { commit, trackTroubleSubmit } from './action';

// TODO: lan
const lan = {
  qsType: '问题类型',
  qsDesc: '问题描述',
  save: __('order.entry.confirm'),
  need: __('order.entry.order_return_15'),
};
const RG = Radio.Group;
const TA = Input.TextArea;
const TrackTrouble = ({
  dispatch, trackTroubleTypes, trackTroubleForm, trackTroubleShow,
}) => (
  <Modal
    footer={null}
    visible={trackTroubleShow}
    onCancel={() => dispatch(commit('trackTroubleShow', false))}
  >
    <form style={{ padding: '15px' }}>
      <div style={{ marginBottom: '20px' }}>
        <span>{lan.qsType}</span>
        <RG
          required
          value={trackTroubleForm.trouble_type}
          onChange={e => dispatch(commit('trackTroubleForm', assign({}, trackTroubleForm, { trouble_type: e.target.value })))}
        >
          {
            trackTroubleTypes.map(v => (
              <Radio value={v.id} style={{ width: '40%' }}>{v.name}</Radio>
            ))
          }
        </RG>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span>{lan.qsDesc}</span>
        <TA
          reauired
          autosize={{ minRows: 2, maxRows: 6 }}
          value={trackTroubleForm.trouble_description}
          onChange={e => dispatch(commit('trackTroubleForm', assign({}, trackTroubleForm, { trouble_description: e.target.value })))}
        />

      </div>
      <Button
        size={'large'}
        style={{ transform: 'translate(100%)', width: '150px' }}
        loading={trackTroubleForm.trackTroubleSubmitLoad}
        htmlType={'submit'}
        onClick={(e) => {
          e.preventDefault();
          if (trackTroubleForm.trouble_type) {
            dispatch(trackTroubleSubmit(trackTroubleForm));
          } else {
            message.warning(lan.need);
          }
        }}
      >
        {lan.save}
      </Button>
    </form>
  </Modal>
);
TrackTrouble.propTypes = {
  dispatch: PropTypes.func,
  trackTroubleShow: PropTypes.bool,
  trackTroubleTypes: PropTypes.arrayOf(PropTypes.shape()),
  trackTroubleForm: PropTypes.shape(),
};
export default TrackTrouble;
