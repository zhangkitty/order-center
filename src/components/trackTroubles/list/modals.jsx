import React, { PropTypes } from 'react';
import { Button, Modal, Spin, Table, Input, Select, message } from 'antd';
import { commit, addRemark, handled } from './action';
import style from './style.css';

// TODO
const lan = {
  save: '确认',
  cancel: '取消',
  add: '添加',
  addDesc: '添加一条记录',
  yichuliDesc: '请选择处理结果',
};
const OP = Select.Option;
const Modals = ({
  dispatch,
  remarkShow, remarkLoad, remarkData, remark, troubleId,
  handledShow, filters, handleType, filter, load,
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
            {
              title: '图片',
              dataIndex: 'attachment',
              width: 100,
              render: d => (
                d && JSON.parse(d).files.map(v =>
                  (
                    <img alt={'pic'} src={`${JSON.parse(d).dir}${v}`} key={v} />
                  ),
                )
              ),
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
  </div>
);
Modals.propTypes = {
  dispatch: PropTypes.func,
  remarkShow: PropTypes.bool,
  remarkLoad: PropTypes.bool,
  load: PropTypes.bool,
  remark: PropTypes.string,
  troubleId: PropTypes.string,
  remarkData: PropTypes.arrayOf(PropTypes.shape()),
  handledShow: PropTypes.bool,
  filters: PropTypes.shape(),
  filter: PropTypes.shape(),
  handleType: PropTypes.string,
};

export default Modals;
