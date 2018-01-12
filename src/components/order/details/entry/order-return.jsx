import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import ReactDOM from 'react-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Table, Card, Button, Modal, Input, Radio, Upload, Popover, message, Tag } from 'antd';
import { commit, uploadTrackAction, uploadTrackShow, genRl, fetchRlFee, rebuildRl } from './action';

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
  RL扣除费用: __('order.entry.rl_deducted_costs'),
  rl费用必填: __('order.entry.rl_fee_required'),
  上传的图片大小不能超过8M: __('order.entry.上传的图片大小不能超过8M'),
  只可上传: __('order.entry.只可上传'),
  只可上传请确认: __('order.entry.只可上传请确认'),
};

const reqImg = require.context('../../images');

class OrderReturn extends Component {
  render() {
    const {
      dataSource,
      // dataSource: { orderReturn },
      uploadTrack,
      dispatch,
      orderId,
      billno,
      rlLoading,
      rlmodal,
      rlFee,
      reFeeValue,
      modal_return_order_id,
      confirmLoading,
      returnCopied,
    } = this.props;
    return (
      <div className={styles.contentPadding}>
        <Card
          title={lan.jilu}
          // style={{ maxWidth: '1200px' }}
        >
          <Table
            size="small"
            rowKey="return_order_id"
            pagination={false}
            loading={rlLoading}
            dataSource={dataSource.orderReturn.list}
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
                    <a style={{ marginRight: '10px' }} href={rec.return_order_details} target="blank">{lan.chankan}</a>
                    {
                      !!rec.return_rl_download &&
                      <a href={rec.return_rl_download} target="blank" style={{ marginRight: '10px' }}>{lan.xiazai}</a>
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
                        onClick={() => {
                          // dispatch(commit('rlLoading', true));
                          // dispatch(genRl(rec.return_order_id, orderId, billno));
                          dispatch(commit('modal_return_order_id', rec.return_order_id));
                          dispatch(fetchRlFee(orderId));
                          dispatch(commit('rlmodal', true));
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
            visible={rlmodal}
            confirmLoading={confirmLoading}
            maskClosable={false}
            onOk={
              () => {
                dispatch(commit('confirmLoading', true));
                const d = {
                  language: 'zh',
                  order_id: orderId,
                  rl_fee: reFeeValue,
                  return_order_id: modal_return_order_id,
                  billno,
                };
                if (reFeeValue === null) {
                  dispatch(commit('confirmLoading', false));
                  return message.error(lan.rl费用必填);
                }
                dispatch(rebuildRl(d));
              }
            }
            onCancel={
              () => {
                dispatch(commit('rlmodal', false));
                dispatch(commit('reFeeValue', 0));
              }
            }
            okText="确认"
            cancelText="取消"
          >
            <div>
              {lan.RL扣除费用}:
            </div>
            <div style={{ marginTop: 10 }}>
              {
                Array.isArray(rlFee) ?
                  <div>
                    <Radio.Group disabled={confirmLoading} value={reFeeValue || 0} onChange={e => dispatch(commit('reFeeValue', e.target.value))}>{
                      (rlFee || []).map(v => (
                        <Radio value={v.amount}>{v.amountWithSymbol}</Radio>
                      ))
                    }
                    </Radio.Group>
                  </div> :
                  <div>
                    <Radio checked>0</Radio>
                  </div>
              }
            </div>
          </Modal>
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
                      // showUploadList={false}
                      // 如果图片大于8M不上传
                      beforeUpload={(file) => {
                        if (file.type && (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
                          message.error(lan.只可上传请确认, 3);
                          return false;
                        }
                        if (file.size && file.size >= 8 * 1024 * 1024) {
                          message.error(lan.上传的图片大小不能超过8M, 3);
                          return false;
                        }
                        return true;
                      }}
                      onChange={({ file }) => {
                        if (file.status === 'done') {
                          if (file.response.code === 0) {
                            message.success(`${file.name} ${__('order.entry.submit_info4')}.`);
                            dispatch(commit('uploadTrack',
                              assign({}, uploadTrack, {
                                check_value: file.response.data[0],
                                img: file.response.data[0],
                              })));
                          } else {
                            message.error(`${file.name} ${__('order.entry.submit_info5')}: ${file.response.msg}`);
                          }
                        } else if (file.status === 'error') {
                          message.error(`${file.name} ${__('order.entry.submit_info5')}.`);
                        }
                      }}
                    >
                      <Button icon="upload">
                        {lan.upload}
                      </Button>
                    </Upload>
                  }
                  <span style={{ color: 'red', lineHeight: '28px', marginLeft: '10px' }}>
                    {lan.只可上传}
                  </span>
                </div>
              }
            </form>
          </Modal>
        </Card>
        <Card
          style={{ marginTop: '20px' }}
          title={__('order.entry.return_link')}
        >
          {/*  复制  */}
          {
            dataSource.orderReturn.return_link.code !== 0 ?
              <div className={styles.returnLink} style={{ color: 'red' }}>
                {__('order.entry.submit_info2')}: {dataSource.orderReturn.return_link.msg}
              </div>
              :
              <div className={styles.returnLinkBg}>
                <div className={styles.returnLink}>
                  {dataSource.orderReturn.return_link.data}
                </div>
                <CopyToClipboard
                  text={dataSource.orderReturn.return_link.data}
                  onCopy={() => dispatch(commit('returnCopied', true))}
                >
                  <Button>{__('order.entry.return_copy')}</Button>
                </CopyToClipboard>
                {returnCopied ? <span className={styles.returnLinkTitle}>{__('order.entry.return_copy_title')}</span> : null}
              </div>
          }
        </Card>
      </div>
    );
  }
}

OrderReturn.propTypes = {
  dataSource: PropTypes.shape(),
  uploadTrack: PropTypes.shape(),
  dispatch: PropTypes.func,
  orderId: PropTypes.string,
  billno: PropTypes.string,
  rlLoading: PropTypes.bool,
  returnCopied: PropTypes.bool,
};
export default OrderReturn;
