import React, { PropTypes } from 'react';
import { Button, Modal, Spin, Table, Input, Select, message, Radio } from 'antd';
import { commit, addRemark, handled, getData, uploadImg, followTrouble } from './action';
import UploadWrap from './uploadWrap';
import style from './style.css';

// TODO
const lan = {
  save: '确认',
  cancel: '取消',
  add: '添加',
  addDesc: '添加一条记录',
  yichuliDesc: '请选择处理结果',
  uploadImg: '上传图片',
};
const OP = Select.Option;
const RG = Radio.Group;
const Modals = ({
  dispatch,
  remarkShow, remarkLoad, remarkData, remark, troubleId,
  handledShow, filters, handleType, filter, load,
  uploadShow, imgList, previewVisible, previewImage, followShow, handleStatus, handleStatusList
}) => (
  <div>
    {/* 备注 */}
    <Modal
      footer={null}
      onCancel={() => dispatch(commit('remarkShow', false))} visible={remarkShow}
    >
      <form
        className={style.modalForm}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addRemark(troubleId, remark));
        }
        }
      >
        <Input
          required
          value={remark}
          placeholder={lan.addDesc}
          onChange={e => dispatch(commit('remark', e.target.value))}
        />
        <Button htmlType={'submit'} loading={remarkLoad} style={{ marginLeft: '15px' }} type={'primary'}>{lan.add}</Button>
      </form>
      <Spin spinning={remarkLoad}>
        <Table
          rowKey={'id'}
          size={'small'}
          dataSource={remarkData}
          columns={[
            {
              title: '操作人',
              dataIndex: 'handle_admin_user_name',
              width: 100,
            },
            {
              title: '时间',
              dataIndex: 'handle_time',
              width: 100,
            },
            {
              title: '操作',
              dataIndex: 'description',
              width: 100,
            },
            {
              title: '信息',
              dataIndex: 'note',
              width: 100,
            },
          ]}
        />
      </Spin>
    </Modal>
    {/* 已处理 */}
    <Modal
      footer={null}
      onCancel={() => dispatch(commit('handledShow', false))} visible={handledShow}
    >
      <div className={style.handleDesc}>
        <span>{lan.yichuliDesc}</span>
        <Select
          style={{ width: '100%' }}
          value={handleType}
          onChange={v => dispatch(commit('handleType', v))}
        >
          {
            filters.handle_result.filter(v => v.id > 1).map(v => (
              <OP key={v.id}>{v.name}</OP>
            ))
          }
        </Select>
      </div>
      <div className={style.handleBtn}>
        <Button
          type={'primary'}
          loading={load}
          onClick={() => {
            if (handleType) {
              dispatch(handled(troubleId, handleType, filter));
            } else {
              message.warning(lan.yichuliDesc);
            }
          }}
        >
          {lan.save}
        </Button>
      </div>
    </Modal>
    {/* 跟进中 */}
    <Modal
      visible={followShow}
      onCancel={() => dispatch(commit('followShow', false))}
      onOk={() => dispatch(followTrouble(troubleId, handleStatus, filter))}
    >
      <RG
        required
        value={handleStatus}
        onChange={e => dispatch(commit('handleStatus', e.target.value))}
      >
        {
          handleStatusList.map(v => (
            <Radio value={v.id} style={{ width: '40%' }}>{v.name}</Radio>
          ))
        }
      </RG>
    </Modal>
    {/* 上传图片 */}
    <Modal
      footer={null}
      onCancel={() => dispatch(commit('uploadShow', false))} visible={uploadShow}
    >
      <div className={style.uploadLay}>
        <span className={style.uploadSpan}>{lan.uploadImg} :</span>
        <UploadWrap troubleId={troubleId} flag={uploadShow} files={imgList} dispatch={dispatch} />
        <Button
          className={style.uploadBtn}
          type={'primary'}
          loading={load} onClick={() => dispatch(uploadImg(troubleId, imgList, filter))}
          disabled={!(imgList.filter(v => !(v.uid <= 0)).length)}
        >{lan.save}</Button>
      </div>
    </Modal>
    {/* 图片预览 */}
    <Modal visible={previewVisible} footer={null} onCancel={() => dispatch(commit('previewVisible', false))}>
      <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  </div>
);
Modals.propTypes = {
  dispatch: PropTypes.func,
  remarkShow: PropTypes.bool,
  remarkLoad: PropTypes.bool,
  uploadShow: PropTypes.bool,
  previewVisible: PropTypes.bool,
  load: PropTypes.bool,
  remark: PropTypes.string,
  troubleId: PropTypes.string,
  previewImage: PropTypes.string,
  remarkData: PropTypes.arrayOf(PropTypes.shape()),
  imgList: PropTypes.arrayOf(PropTypes.shape()),
  handledShow: PropTypes.bool,
  filters: PropTypes.shape(),
  filter: PropTypes.shape(),
  handleType: PropTypes.string,
  followShow: PropTypes.bool,
  handleStatusList: PropTypes.arrayOf(PropTypes.shape()),
  handleStatus: PropTypes.string,
};

export default Modals;
