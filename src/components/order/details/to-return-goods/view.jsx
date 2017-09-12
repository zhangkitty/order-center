import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Spin, Table, Checkbox, Upload, Button, Radio, Select, Modal, message } from 'antd';
import { commit, getInfo, batchChoose, infoCommit, save } from './action';

// TODO: lan
const lan = {
  batch: '批量选择退货原因',
  goods: '退货商品',
  reason: '退货原因',
  num: '退货数量',
  pic: '照片',
  upload: '上传图片',
  path: '退款路径',
  type: '退货运单类型',
  warehouse: '退货商品入仓',
  save: '提交',
  needReason: '缺少原因',
  needPic: '缺少照片',
  need: '缺少必填项',
};
const CG = Checkbox.Group;
const RG = Radio.Group;
const Op = Select.Option;
const Star = (<span style={{ color: 'red' }}>*</span>);
const spanWidth = { width: '120px', display: 'inline-block' };
class ToReturnGoods extends Component {
  constructor(props) {
    super(props);
    const { dispatch, params: { oid, gid } } = props;
    dispatch(commit('orderId', oid));
    dispatch(commit('goodsId', gid));
    dispatch(getInfo(oid, gid));
  }
  render() {
    const {
      dispatch, batchShow, chooses, reasons,
      ready, dataSource, paths, load,
      shippingType, warehouse, submitValue,
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
                return_info[i].reason_ids.filter(v => v < 6 && v !== 1).length &&
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
                        d.map(v => (
                          v.id < 6 && v.id !== 1 ?
                            <div>
                              <Checkbox value={v.id} key={v.id}>{Star}{v.name}</Checkbox>
                            </div>

                            :
                            <div>
                              <Checkbox value={v.id} key={v.id}>{v.name}</Checkbox>
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
                render: () => (
                  <div>
                    <Upload>
                      <Button icon="upload" >{lan.upload}</Button>
                    </Upload>
                  </div>
              ),
              },
            ]}
          />
          <div style={{ margin: '20px 0' }}>
            <span style={spanWidth}>{lan.path}{Star}:</span>
            <RG value={submitValue.refund_path} onChange={e => dispatch(infoCommit('refund_path', e.target.value))}>
              {
                paths.map(v => (
                  <Radio value={v.id} key={v.id}>{v.name}</Radio>
                ))
              }
            </RG>
          </div>
          <div style={{ margin: '20px 0' }}>
            <span style={spanWidth}>{lan.type}{Star}:</span>
            <RG value={submitValue.return_shipping_type} onChange={e => dispatch(infoCommit('return_shipping_type', e.target.value))}>
              {
                shippingType.map(v => (
                  <Radio value={v.id} key={v.id}>{v.name}</Radio>
                ))
              }
            </RG>
          </div>
          <div style={{ margin: '20px 0' }}>
            <span style={spanWidth}>{lan.warehouse}{Star}:</span>
            <Select
              style={{ width: '45%' }}
              value={`${submitValue.return_warehouse}`}
              onChange={value => dispatch(infoCommit('return_warehouse', Number(value)))}
            >
              {
                warehouse.map(v => (
                  <Op key={v.id}>{v.name}</Op>
                ))
              }
            </Select>
          </div>
          <Button type="primary" loading={load} htmlType="submit">{lan.save}</Button>
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
                  <div>
                    <Checkbox value={v.id} key={v.id}>{v.name}</Checkbox>
                  </div>
                ))
              }
            </CG>
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
  dispatch: PropTypes.func,
  params: PropTypes.shape(),
  submitValue: PropTypes.shape(),
  dataSource: PropTypes.arrayOf(PropTypes.shape),
  chooses: PropTypes.arrayOf(PropTypes.number),
  paths: PropTypes.arrayOf(PropTypes.shape),
  shippingType: PropTypes.arrayOf(PropTypes.shape),
  reasons: PropTypes.arrayOf(PropTypes.shape),
  warehouse: PropTypes.arrayOf(PropTypes.shape),
};
const mapStateToProps = state => state['order/details/to-return-goods'];
export default connect(mapStateToProps)(ToReturnGoods);
