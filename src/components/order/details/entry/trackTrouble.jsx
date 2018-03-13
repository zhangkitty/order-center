import React, { PropTypes } from 'react';
import { Modal, Radio, Input, Button, message, Upload, Icon, Tag } from 'antd';
import assign from 'object-assign';
import { commit, trackTroubleSubmit } from './action';
import Styles from './style.css';
// TODO: lan
const lan = {
  qsType: '问题类型',
  qsDesc: '问题描述',
  save: __('order.entry.confirm'),
  need: __('order.entry.order_return_15'),
};
const RG = Radio.Group;
const TA = Input.TextArea;

const checkImage = (file) => {
  if (file.size && file.size >= 3 * 1024 * 1024) {
    message.error(__('order.goods-control.submitTitle'), 5);
    return false;
  }
  if (file.type && (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
    message.error(__('order.goods-control.submitTitle1'), 5);
    return false;
  }
  return true;
};
const TrackTrouble = ({
  dispatch, trackTroubleTypes, trackTroubleForm, trackTroubleShow, trackImages,
}) => (
  <Modal
    footer={null}
    width="800"
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
      <div className={Styles.reason}>
        <div>
          <span className={Styles.descWidth}>
            {__('order.goods-control.control_img')}
          </span>
          {
            trackImages.map(v => (
              <div className={Styles.uploaderImgBg}>
                <Button
                  className={Styles.delete}
                  onClick={() =>
                    dispatch(commit('trackImages', trackImages.filter(x => x !== v)))
                  }
                >X</Button>
                <img src={v} alt="model" className={Styles.uploaderImg} />
              </div>
              // <img src={v} alt="model" className={Styles.uploaderImg} />
            ))
          }
          {
            trackImages.length < 2 ?
              <Upload
                className={Styles.uploader}
                name="files[]"
                action="/index_new.php/order/OrderLogisticsTroubles/uploadImages"
                showUploadList={false}
                beforeUpload={file => checkImage(file)}
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    if (info.file.response.code !== 0) {
                      message.error(info.file.response.msg, 10);
                    } else {
                      message.success(`${info.file.name} ${__('order.goods-control.submitTitle2')}`, 10);
                      dispatch(commit('trackImages', [...trackImages, info.file.response.data[0]]));
                    }
                  } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} ${__('order.goods-control.submitTitle3')}`, 10);
                  }
                }}
              >
                <Icon type="plus" className={Styles.uploaderTrigger} />
              </Upload>
              : null
          }
          <Tag color="#919191" style={{ textAlign: 'center', marginBottom: '10px' }}>
            {__('order.goods-control.control_title')}
          </Tag>
        </div>
      </div>
      <Button
        size={'large'}
        style={{ transform: 'translate(100%)', width: '150px' }}
        loading={trackTroubleForm.trackTroubleSubmitLoad}
        htmlType={'submit'}
        onClick={(e) => {
          e.preventDefault();
          if (trackTroubleForm.trouble_type) {
            dispatch(trackTroubleSubmit(assign({}, trackTroubleForm, { images: trackImages })));
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
  trackImages: PropTypes.arrayOf(PropTypes.shape()),
  trackTroubleForm: PropTypes.shape(),
};
export default TrackTrouble;
