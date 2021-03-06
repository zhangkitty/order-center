/**
 *  Create by xvliuzhu on 2017/9/20
 *  订单详情-退货
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Spin, Table, Checkbox, Upload, Button, Radio, Select, Modal, Input, message } from 'antd';
import { commit, getInfo, batchChoose, infoCommit, save } from './action';
import styles from './style.css';

const reqImg = require.context('../../images');

const lan = {
  batch: __('order.entry.return_goods1'),
  goods: __('order.entry.return_goods2'),
  reason: __('order.entry.return_goods3'),
  num: __('order.entry.return_goods4'),
  pic: __('order.entry.return_goods5'),
  upload: __('order.entry.return_goods6'),
  path: __('order.entry.return_goods7'),
  type: __('order.entry.return_goods8'),
  warehouse: __('order.entry.return_goods9'),
  save: __('order.entry.return_goods10'),
  needReason: __('order.entry.submit_title3'),
  needPic: __('order.entry.submit_title4'),
  need: __('order.entry.submit_title5'),
  fileNeed: __('common.file_need_choose'),
  fileNumber: __('common.file_less_three'),
  上传的图片大小不能超过8M: __('order.entry.上传的图片大小不能超过8M'),
  只可上传: __('order.entry.只可上传'),
  只可上传请确认: __('order.entry.只可上传请确认'),
  物流渠道: '物流渠道',
  下载附件: '下载附件',

};
const CG = Checkbox.Group;
const RadioGroup = Radio.Group;
const Op = Select.Option;
const Star = (<span style={{ color: 'red' }}>*</span>);
const spanWidth = { width: '120px', display: 'inline-block' };
const RANChoose = {
  1: '广州仓', 4: '迪拜仓', 6: '印度仓',
};
const defaultRL = {
  2: '美东仓', 3: '比利时仓',
};


class ToReturnGoods extends Component {
  constructor(props) {
    super(props);
    const { dispatch, params: { oid, gid } } = props;
    dispatch(commit('orderId', oid));
    dispatch(infoCommit('order_id', Number(oid)));
    dispatch(commit('goodsId', gid));
    dispatch(getInfo(oid, gid));
  }
  render() {
    const {
      dispatch, batchShow, chooses, reasons, choose_shipping_type,
      ready, dataSource, paths, load, sucModal, shipping_type, return_label_url,
      shippingType, warehouse, submitValue, sucModalHtml, rlFee, spinloading, refundCurrency,
    } = this.props;
    const {
      return_info, refund_path, return_shipping_type, return_warehouse,
      // exchanged, exchange_remark,
    } = submitValue;
    if (ready) {
      return (
        <form
          style={{ padding: '25px' }}
          onSubmit={(e) => {
            e.preventDefault();
            for (let i = 0; i < return_info.length; i += 1) {
              if (!return_info[i].reason_ids.length) {
                return message.warning(lan.needReason);
              }
              if (
                return_info[i].reason_ids.filter(v => Number(v) < 6 && Number(v) !== 1).length &&
                !return_info[i].img_thumb.length
              ) {
                return message.warning(lan.needPic);
              }
              if (
                return_info[i].exchanged === 1 && return_info[i].exchange_remark.trim().length < 1
              ) {
                return message.warning(__('order.entry.submit_title6'));
              }
            }
            if (!refund_path || !return_shipping_type || !return_warehouse) {
              return message.warning(lan.need);
            }
            dispatch(commit('spinloading', false));
            const temp = Object.assign({}, submitValue, {
              shipping_type: choose_shipping_type,
            });

            return dispatch(save(temp));
          }}
        >
          <Button
            style={{ margin: '25px 0' }}
            onClick={() => {
              dispatch(commit('batchShow', true));
              dispatch(commit('modalChooses', []));
            }}
          >{lan.batch}</Button>
          <Table
            size="small"
            rowKey="key"
            pagination={false}
            dataSource={dataSource}
            columns={[
              {
                title: lan.goods,
                width: 150,
                dataIndex: 'goods_id',
                render: (d, rec) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '40px', display: 'inline-block' }}>{rec.goods_sort}</span>
                    <img src={rec.img_url} width={80} alt="pic" />
                  </div>
                ),
              },
              {
                title: lan.reason,
                dataIndex: 'reason',
                width: 400,
                render: (d, rec) => (
                  <CG
                    value={return_info.find(v => v.goods_id === rec.goods_id).reason_ids}
                    onChange={value => dispatch(infoCommit('return_info', return_info.map(v => (
                      v.goods_id === rec.goods_id ?
                        assign({}, v, { reason_ids: value }) : v
                    ))))}
                  >
                    {
                      (d || []).map(v => (
                        Number(v.id) < 6 && Number(v.id) !== 1 ?
                          <div key={v.id}>
                            <Checkbox value={v.id} >{Star}{v.name}</Checkbox>
                          </div>

                          :
                          <div key={v.id}>
                            <Checkbox value={v.id}>{v.name}</Checkbox>
                          </div>

                      ))
                    }
                  </CG>

                ),
              },
              {
                title: __('order.entry.return_goods12'),
                width: 150,
                dataIndex: 'exchanged',
                render: (d, rec) => (<span>
                  <div>{Star}{__('order.entry.return_goods12')}</div>
                  <RadioGroup
                    value={return_info.find(v => v.goods_id === rec.goods_id).exchanged}
                    onChange={e => dispatch(infoCommit('return_info', return_info.map(j => (
                      j.goods_id === rec.goods_id ?
                        assign({}, j, { exchanged: e.target.value })
                        : j
                    ))))}
                    // onChange={e => dispatch(infoCommit('exchanged', e.target.value));}
                  >
                    <Radio value={1} key={1}>{__('order.entry.address_cancel_stock1')}</Radio>
                    <Radio value={0} key={0}>{__('order.entry.address_cancel_stock2')}</Radio>
                  </RadioGroup>
                  {
                    return_info.find(v => v.goods_id === rec.goods_id).exchanged !== 0 &&
                    <div>
                      <div style={{ marginTop: 10 }}>{Star}{__('order.entry.return_goods13')} </div>
                      <Input
                        placeholder={__('order.entry.submit_title6')}
                        value={return_info.find(v => v.goods_id === rec.goods_id).exchange_remark}
                        onChange={e => dispatch(infoCommit('return_info', return_info.map(j => (
                          j.goods_id === rec.goods_id ?
                            assign({}, j,
                              { exchange_remark: e.target.value })
                            : j
                        ))))}
                        // onChange={e => dispatch(infoCommit('exchange_remark', e.target.value))}
                      />
                    </div>
                  }
                </span>),
              },
              {
                title: lan.num,
                width: 50,
                render: () => (<span>1</span>),
              },
              {
                title: lan.pic,
                width: 400,
                render: rec => (
                  <div style={{ display: 'flex' }}>
                    {
                      return_info.find(v => v.goods_id === rec.goods_id).img_thumb.map(v => (
                        <div key={v} style={{ margin: '0 5px' }}>
                          <img
                            key={v} src={v} alt="pic"
                            width={50}
                            onError={(e) => {
                              e.persist();
                              e.target.src = reqImg('./uploading.gif');
                              setTimeout(() => {
                                e.target.src = v;
                              }, 500);
                            }}
                          />
                          <Button
                            size="small"
                            style={{ display: 'block', width: '60px' }}
                            onClick={() => dispatch(infoCommit('return_info', return_info.map(j => (
                              j.goods_id === rec.goods_id ?
                                assign({}, j,
                                  { img_thumb: j.img_thumb.filter(d => d !== v) })
                                : j
                            ))))}
                          >{__('order.entry.order_return_16')}</Button>
                        </div>
                      ))
                    }
                    {
                      return_info.find(v => v.goods_id === rec.goods_id).img_thumb.length < 3 ?
                        <Upload
                          action="/index_new.php/Order/OrderReturn/handleImg"
                          name={`img_${rec.goods_id}`}
                          showUploadList={false}
                          data={{ type: 3, goods_id: rec.goods_id }}
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
                              dispatch(infoCommit('return_info', return_info.map(v => (
                                v.goods_id === rec.goods_id ?
                                  assign({}, v,
                                    { img_thumb: [...v.img_thumb, file.response.data[0]] })
                                  : v
                              ))));
                            } else if (file.status === 'error') {
                              message.error(`${file.name} file upload failed.`);
                            }
                          }}
                        >
                          <Button icon="upload">
                            {lan.upload}
                          </Button>
                          <span style={{ marginLeft: '5px', color: 'red' }}>
                            {
                              !return_info
                                .find(v => v.goods_id === rec.goods_id).img_thumb.length &&
                              `${lan.fileNeed},`}{lan.fileNumber}
                          </span>
                        </Upload>
                        : null
                    }
                    {
                      <span style={{ color: 'red', lineHeight: '28px', marginLeft: '10px' }}>
                        {lan.只可上传}
                      </span>
                    }
                  </div>
                ),
              },
            ]}
          />
          <div style={{ margin: '20px 0' }}>
            <span style={spanWidth}>{lan.path}{Star}:</span>
            <RadioGroup value={submitValue.refund_path} onChange={e => dispatch(infoCommit('refund_path', e.target.value))}>
              {
                paths.map(v => (
                  <Radio value={v.id} key={v.id}>{v.name}</Radio>
                ))
              }
            </RadioGroup>
          </div>

          <div style={{ margin: '20px 0' }}>
            <span style={spanWidth}>{lan.type}{Star}:</span>
            <RadioGroup
              value={submitValue.return_shipping_type}
              onChange={e => dispatch(infoCommit('return_shipping_type', e.target.value))}
            >
              {
                shippingType.map(v => (
                  <Radio
                    value={v.id} key={v.id}
                    // disabled={RANChoose[submitValue.return_warehouse] && (!v.isAvailable)}
                    disabled={!v.isAvailable}
                  >{v.name}</Radio>
                ))
              }
            </RadioGroup>
          </div>

          <div style={{ margin: '20px 0', display: submitValue.return_shipping_type === 1 ? '' : 'none' }}>
            <span style={spanWidth} />
            <RadioGroup value={submitValue.rl_fee || 0} onChange={e => dispatch(infoCommit('rl_fee', e.target.value))}>
              {
                (rlFee || []).map(v => (
                  <Radio
                    value={v.amount} key={v.amount}
                  >{v.amount_with_symbol}</Radio>
                ))
              }
            </RadioGroup>
          </div>


          <div style={{ margin: '20px 0' }}>
            <span style={spanWidth}>{lan.warehouse}{Star}:</span>
            <Select
              style={{ width: '45%' }}
              value={`${submitValue.return_warehouse}`}
              onChange={(value) => {
                // if (defaultRL[value]) {
                //   dispatch(infoCommit('return_shipping_type', 1));
                // }
                // if (RANChoose[value]) {
                //   dispatch(infoCommit('return_shipping_type', 2));
                // }
                dispatch(infoCommit('return_warehouse', Number(value)));
              }}
            >
              {
                warehouse.map(v => (
                  <Op key={v.id}>{v.name}</Op>
                ))
              }
            </Select>
          </div>
          {
            shipping_type && return_shipping_type === 1 && <div>
              <span style={spanWidth}>{lan.物流渠道}{Star}:</span>
              <RadioGroup
                value={choose_shipping_type}
                onChange={e => dispatch(commit('choose_shipping_type', e.target.value))}
              >
                {
                  (shipping_type || []).map(v => <Radio value={v.id}>{v.name}</Radio>)
                }
              </RadioGroup>
            </div>
          }
          <div style={{ margin: '20px 0' }}>
            <span style={spanWidth}>{__('order.entry.return_goods11')}:</span>
            {refundCurrency.amount}&nbsp;
            {return_shipping_type === 1 ? `- ${submitValue.rl_fee}` : ''}
            &nbsp;{return_shipping_type === 1 ? `= ${+refundCurrency.amount - submitValue.rl_fee}` : ''}

            &nbsp; ({refundCurrency.symbol})
          </div>
          <Button type="primary" disabled={load} htmlType="submit">{lan.save}</Button>
          <Modal
            visible={batchShow}
            onOk={() => dispatch(batchChoose(chooses))}
            onCancel={() => dispatch(commit('batchShow', false))}
          >
            <CG
              value={chooses}
              onChange={v => dispatch(commit('chooses', v))}
            >
              {
                reasons.map(v => (
                  <div key={v.id}>
                    <Checkbox value={v.id}>{v.name}</Checkbox>
                  </div>
                ))
              }
            </CG>
          </Modal>
          <Modal
            visible={sucModal}
            onOk={() => dispatch(commit('sucModal', false))}
            onCancel={() => dispatch(commit('sucModal', false))}
            footer={null}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 80 }}>{__('order.entry.submit_info1')}</div>
              <div style={{ width: 80, color: 'red' }}><a href={return_label_url}>{lan.下载附件}</a></div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: sucModalHtml }} />
          </Modal>
          <div className={styles.spin} style={{ display: spinloading ? 'none' : '' }}>
            <Spin size="large" className={styles.location} />
          </div>
        </form>
      );
    }
    return (<Spin />);
  }
}

ToReturnGoods.propTypes = {
  ready: PropTypes.bool,
  batchShow: PropTypes.bool,
  load: PropTypes.bool,
  sucModal: PropTypes.bool,
  sucModalHtml: PropTypes.string,
  dispatch: PropTypes.func,
  params: PropTypes.shape(),
  submitValue: PropTypes.shape(),
  dataSource: PropTypes.arrayOf(PropTypes.shape),
  chooses: PropTypes.arrayOf(PropTypes.number),
  paths: PropTypes.arrayOf(PropTypes.shape),
  shippingType: PropTypes.arrayOf(PropTypes.shape),
  reasons: PropTypes.arrayOf(PropTypes.shape),
  warehouse: PropTypes.arrayOf(PropTypes.shape),
  rlFee: PropTypes.arrayOf(PropTypes.shape),
  refundCurrency: PropTypes.shape(),
  spinloading: PropTypes.bool,
};
const mapStateToProps = state => state['order/details/to-return-goods'];
export default connect(mapStateToProps)(ToReturnGoods);
