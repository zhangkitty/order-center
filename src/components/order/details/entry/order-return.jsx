import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Table, Card, Button, Modal, Input, Radio, Upload, Popover, message } from 'antd';
import { commit, uploadTrackAction, uploadTrackShow, genRl } from './action';

import styles from './style.css';

const RG = Radio.Group;

const lan = {
  jilu: __('order.entry.goods_rejected_record'),
  bianhao: __('order.entry.order_return_1'),
  leixing: __('order.entry.order_return_2'),
  yundan: __('order.entry.order_return_3'),  // 重复
  shijian: __('order.entry.refund_4'),
  ren: __('order.entry.refund_5'),
  shangpin: __('order.entry.return_goods'),
  lujin: __('order.entry.order_return_4'),
  zhaungtai: __('order.entry.order_return_5'),
  pingzhenghao: __('order.entry.order_return_6'),
  caozuo: __('order.entry.refund_12'),
  chankan: __('order.entry.order_return_7'),
  xiazai: __('order.entry.order_return_8'),
  sahngchuan: __('order.entry.order_return_9'),
  rl: __('order.entry.order_return_10'),
  save: __('order.entry.save'),
  qudao: __('order.entry.order_return_11'),
  yundanleixing: __('order.entry.order_return_3'), // 重复
  yundaonhao: __('order.entry.order_return_12'),
  yundanpingzh: __('order.entry.order_return_13'),
  upload: __('order.entry.order_return_14'),
  need: __('order.entry.order_return_15'),
};

const reqImg = require.context('../../images');
const OrderReturn = (
  {
    dataSource: { orderReturn },
    uploadTrack,
    dispatch,
    orderId,
    billno,
    rlLoading,
  },
) => (
  <Card
    title={lan.jilu}
    style={{ maxWidth: '1200px' }}
  >
    <Table
      size="small"
      rowKey="return_order_id"
      pagination={false}
      dataSource={orderReturn}
      columns={[
        {
          title: lan.bianhao,
          dataIndex: 'return_order_id',
        },
        {
          title: lan.leixing,
          dataIndex: 'return_order_type',
        },
        {
          title: lan.yundan,
          dataIndex: 'return_label_type',
        },
        {
          title: lan.shijian,
          dataIndex: 'return_apply_time',
        },
        {
          title: lan.shangpin,
          dataIndex: 'return_goods',
        },
        {
          title: lan.lujin,
          dataIndex: 'return_tracking_no',
        },
        {
          title: lan.zhaungtai,
          dataIndex: 'return_refund_status',
        },
        {
          title: lan.pingzhenghao,
          dataIndex: 'return_order_status',
        },
        {
          title: lan.caozuo,
          render: rec => (
            <div>
              <a style={{ margin: '10px' }} href={rec.return_order_details} target="blank">{lan.chankan}</a>
              {
                !rec.return_rl_download &&
                <a href={rec.return_rl_download} target="blank" style={{ marginLeft: '10px' }}>{lan.xiazai}</a>
              }
              {
                rec.return_label_type === 'RAN' &&
                <Popover
                  content={
                    <div dangerouslySetInnerHTML={{ __html: rec.return_ran_info }} />
                  }
                >
                  <a style={{ margin: '5px' }}>{lan.chankan}RAN</a>
                </Popover>
              }
              {
                rec.return_label_type === 'RAN' &&
                <Button
                  style={{ margin: '5px' }}
                  loading={rlLoading}
                  onClick={() => {
                    dispatch(commit('rlLoading', true));
                    dispatch(genRl(rec.return_order_id, orderId, billno));
                  }}
                >{lan.rl}</Button>
              }
              <Button onClick={() => dispatch(uploadTrackShow(orderId, rec.return_order_id))} style={{ margin: '5px' }}>
                {lan.sahngchuan}
              </Button>
            </div>

          ),
        },
      ]}
    />
    <Modal
      onCancel={() => dispatch(commit('uploadTrack', assign({}, uploadTrack, { show: false })))}
      okText={lan.save}
      visible={uploadTrack.show}
      onOk={() => {
        const { channel, check_type, check_value } = uploadTrack;
        if (!channel || !check_type || !check_value) {
          return message.warning(lan.need);
        }
        return dispatch(uploadTrackAction(uploadTrack));
      }}
    >
      <form className={styles.returnForm}>
        <div className={styles.returnDiv}>
          <span className={styles.returnSpan}>{lan.qudao}</span>
          <Input
            style={{ width: '70%' }}
            value={uploadTrack.channel}
            onChange={e => dispatch(commit('uploadTrack', assign({}, uploadTrack, { channel: e.target.value })))}
          />
        </div>
        <div className={styles.returnDiv}>
          <span className={styles.returnSpan}>{lan.yundanleixing}</span>
          <RG
            value={uploadTrack.check_type}
            onChange={e => dispatch(commit('uploadTrack', assign({}, uploadTrack, { check_type: e.target.value })))}
          >
            <Radio value="1">{lan.yundaonhao}</Radio>
            <Radio value="2">{lan.yundanpingzh}</Radio>
          </RG>
        </div>
        {
          uploadTrack.check_type === '1' &&
          <div className={styles.returnDiv}>
            <span className={styles.returnSpan}>{lan.yundaonhao}</span>
            <Input
              value={uploadTrack.check_value}
              onChange={e => dispatch(commit('uploadTrack',
              assign({}, uploadTrack, { check_value: e.target.value })))}
            />
          </div>
        }
        {
          uploadTrack.check_type === '2' &&
            <div className={styles.returnDiv}>
              <span className={styles.returnSpan}>{lan.yundanpingzh}</span>
              {
                uploadTrack.img &&
                <div style={{ margin: '0 5px' }}>
                  <img
                    key={uploadTrack.img} src={uploadTrack.img} alt="pic"
                    width={150}
                    onError={(e) => {
                      e.persist();
                      e.target.src = reqImg('./uploading.gif');
                      setTimeout(() => {
                        e.target.src = uploadTrack.img;
                      }, 500);
                    }}
                  />
                  <Button
                    size="small"
                    style={{ display: 'block', width: '150px' }}
                    onClick={() => dispatch(commit('uploadTrack', assign({}, uploadTrack, { check_value: '', img: '' })))}
                  >
                    {__('order.entry.order_return_16')}
                  </Button>
                </div>
              }
              {
                !uploadTrack.img &&
                <Upload
                  action="/index_new.php/Order/OrderReturn/handleImg"
                  name="logistics_certificate"
                  data={{ type: 2, order_id: orderId }}
                  showUploadList={false}
                  onChange={({ file }) => {
                    if (file.status === 'done') {
                      message.success(`${file.name} ${__('order.entry.submit_info4')}.`);
                      dispatch(commit('uploadTrack',
                        assign({}, uploadTrack, {
                          check_value: file.response.data[0], img: file.response.data[0],
                        })));
                    } else if (file.status === 'error') {
                      message.error(`${file.name} ${__('order.entry.submit_info4')}.`);
                    }
                  }}
                >
                  <Button icon="upload">
                    {lan.upload}
                  </Button>
                </Upload>
              }
            </div>
        }
      </form>
    </Modal>

  </Card>
);

OrderReturn.propTypes = {
  dataSource: PropTypes.shape(),
  uploadTrack: PropTypes.shape(),
  dispatch: PropTypes.func,
  orderId: PropTypes.string,
  billno: PropTypes.string,
  rlLoading: PropTypes.bool,
};
export default OrderReturn;
