/**
 *  Create by xvliuzhu on 2017/9/20
 *  订单详情-退货
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Spin, Table, Checkbox, Upload, Button, Radio, Select, Modal, message } from 'antd';
import { commit, getInfo, batchChoose, infoCommit, save } from './action';

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
      dispatch, batchShow, chooses, reasons,
      ready, dataSource, paths, load, sucModal,
      shippingType, warehouse, submitValue, sucModalHtml, rlFee,
    } = this.props;
    const { return_info, refund_path, return_shipping_type, return_warehouse } = submitValue;
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
            }
            if (!refund_path || !return_shipping_type || !return_warehouse) {
              return message.warning(lan.need);
            }
            return dispatch(save(submitValue));
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
            <RadioGroup value={submitValue.return_shipping_type} onChange={e => dispatch(infoCommit('return_shipping_type', e.target.value))}>
              {
                shippingType.map(v => (
                  <Radio
                    value={v.id} key={v.id}
                    disabled={v.id === 1 && RANChoose[submitValue.return_warehouse]}
                  >{v.name}</Radio>
                ))
              }
            </RadioGroup>
          </div>

          <div style={{ margin: '20px 0', display: submitValue.return_shipping_type === 1 ? '' : 'none' }}>
            <span style={spanWidth} />
            <RadioGroup value={submitValue.rl_fee} onChange={e => dispatch(infoCommit('rl_fee', e.target.value))}>
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
                if (defaultRL[value]) {
                  dispatch(infoCommit('return_shipping_type', 1));
                }
                if (RANChoose[value]) {
                  dispatch(infoCommit('return_shipping_type', 2));
                }
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
            <p
              style={{ textAlign: 'center', marginBottom: '15px', fontWeight: '700', color: '#000' }}
            >
              {__('order.entry.submit_info1')}
            </p>
            <div dangerouslySetInnerHTML={{ __html: sucModalHtml }} />
          </Modal>
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
};
const mapStateToProps = state => state['order/details/to-return-goods'];
export default connect(mapStateToProps)(ToReturnGoods);
