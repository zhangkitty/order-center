import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Input, Select, DatePicker, Button, message, Modal, Tabs, Upload, Icon, Radio } from 'antd';
import moment from 'moment';
import { filterCommit, getData, exportOrder, exportIdSet, followUp, commit, submitDelete } from './action';
import style from './style.css';

// TODO: lan
const lan = {
  pkgNum: '包裹号',
  qudao: '发货渠道',
  danhao: '物流单号',
  leixing: '问题类型',
  zhaungtai: '处理状态',
  jieguo: '处理结果',
  chuliren: '处理人',
  cou: '国家',
  site: '站点',
  tijiaoDate: '提交日期',
  fahuoDate: '发货日期',
  search: __('common.search'),
  tijiaoren: '提交人',
  payType: '支付方式',
  productState: '商品状态',
  跟进客服管理: '跟进客服管理',
  BatchDelete: __('common.BatchDelete'),
};

const OP = Select.Option;
const RP = DatePicker.RangePicker;
const confirm = Modal.confirm;
const { TabPane } = Tabs;
const { Group } = Radio;
const tabConfig = {
  renderTabBar: 'disable',
  renderTabContent: 'disable',
  defaultActiveKey: 'search',
  type: 'card',
};

const Filters = ({
  dispatch, filters, filter, load, idList, tracking_update, is_ignore,
}) => {
  const exportId = () => {
    if (idList.length === 0) {
      message.warning(`${__('failedaddrorder.list.text1')}`);
    } else {
      confirm({
        title: __('failedaddrorder.list.text6'),
        okText: __('failedaddrorder.list.text3'),
        okType: 'danger',
        cancelText: __('failedaddrorder.list.text4'),
        onOk() {
          dispatch(exportOrder(idList));
          dispatch(exportIdSet());
        },
        onCancel() {
          dispatch(exportIdSet());
        },
      });
    }
  };
  return (
    <Tabs {...tabConfig}>
      <TabPane
        tab={__('order.name.search')}
        key="1"
      >
        <form
          className={style.fliterFlex}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(getData(filter));
          }}
        >
          {/* row 1 */}
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Button
              onClick={
                () => dispatch(followUp())
              }
            >
              {lan.跟进客服管理}
            </Button>
          </div>
          <div>
            <div>
              <span>{ lan.pkgNum }</span>
              <Input value={filter.reference_number} onChange={e => dispatch(filterCommit('reference_number', e.target.value))} />
            </div>
            <div>
              <span>{ lan.qudao }</span>
              <Input value={filter.shipping_method_real} onChange={e => dispatch(filterCommit('shipping_method_real', e.target.value))} />
            </div>
            <div>
              <span>{ lan.danhao }</span>
              <Input value={filter.shipping_no} onChange={e => dispatch(filterCommit('shipping_no', e.target.value))} />
            </div>
            <div>
              <span>{ lan.leixing }</span>
              <Select multiple value={filter.trouble_type} onChange={v => dispatch(filterCommit('trouble_type', v))} allowClear>
                {filters.trouble_type.map(v => (<OP key={v.id}>{v.name}</OP>))}
              </Select>
            </div>
          </div>
          {/* row 2 */}
          <div>
            <div>
              <span>{ lan.zhaungtai }</span>
              <Select multiple value={filter.handle_status} onChange={v => dispatch(filterCommit('handle_status', v))} allowClear>
                {filters.handle_status.map(v => (<OP key={v.id}>{v.name}</OP>))}
              </Select>
            </div>
            <div>
              <span>{ lan.jieguo }</span>
              <Select multiple value={filter.handle_result} onChange={v => dispatch(filterCommit('handle_result', v))} allowClear>
                {filters.handle_result.map(v => (<OP key={v.id}>{v.name}</OP>))}
              </Select>
            </div>
            <div>
              <span>{ lan.payType }</span>
              <Select multiple value={filter.payment_method} onChange={v => dispatch(filterCommit('payment_method', v))} allowClear>
                {filters.payment_method.map(v => (<OP key={v.id}>{v.name}</OP>))}
              </Select>
            </div>
            {/* <div> */}
            {/* <span>{ lan.productState }</span> */}
            {/* <Select value={filter.handle_result} onChange={v => dispatch(filterCommit('handle_result', v))} allowClear> */}
            {/* {filters.handle_result.map(v => (<OP key={v.id}>{v.name}</OP>))} */}
            {/* </Select> */}
            {/* </div> */}
            <div>
              <span>{ lan.chuliren }</span>
              <Input value={filter.handle_user_name} onChange={e => dispatch(filterCommit('handle_user_name', e.target.value))} />
            </div>
            <div>
              <span>{ lan.tijiaoren }</span>
              <Input value={filter.add_user_name} onChange={e => dispatch(filterCommit('add_user_name', e.target.value))} />
            </div>
          </div>
          {/* row 3 */}
          <div>
            <div>
              <span>{ lan.cou }</span>
              <Select
                mode={'multiple'}
                value={(filter.shipping_country_name ? filter.shipping_country_name.split(',') : [])}
                onChange={v => dispatch(filterCommit('shipping_country_name', v.join(',')))}
                allowClear
              >
                {filters.country.map(v => (<OP key={v.id}>{v.name}</OP>))}
              </Select>
            </div>
            <div>
              <span>{ lan.site }</span>
              <Select
                mode={'multiple'}
                value={(filter.site_from ? filter.site_from.split(',') : [])}
                onChange={v => dispatch(filterCommit('site_from', v.join(',')))}
                allowClear
              >
                {filters.site_from.map(v => (<OP key={v.id}>{v.name}</OP>))}
              </Select>
            </div>
            <div >
              <span>{ lan.tijiaoDate }</span>
              <RP
                style={{ width: '100%' }}
                format={'YYYY-MM-DD'}
                value={[
                  filter.add_time_from ? moment(filter.add_time_from) : null,
                  filter.add_time_to ? moment(filter.add_time_to) : null,
                ]}
                onChange={(d, str) => {
                  dispatch(filterCommit('add_time_from', str[0]));
                  dispatch(filterCommit('add_time_to', str[1]));
                }}
              />
            </div>
            <div >
              <span>{ lan.fahuoDate }</span>
              <RP
                style={{ width: '100%' }}
                format={'YYYY-MM-DD'}
                value={[
                  filter.delivery_time_from ? moment(filter.delivery_time_from) : null,
                  filter.delivery_time_to ? moment(filter.delivery_time_to) : null,
                ]}
                onChange={(d, str) => {
                  dispatch(filterCommit('delivery_time_from', str[0]));
                  dispatch(filterCommit('delivery_time_to', str[1]));
                }}
              />
            </div>
          </div>
          <div className={style.searchBtn}>
            <Button
              loading={load}
              type={'primary'}
              htmlType={'submit'}
              id="submit"
              style={{ marginRight: '10px' }}
            >
              {lan.search}
            </Button>
            <Button
              onClick={() => exportId()}
            >
              {__('failedaddrorder.list.piliangdaochu')}
            </Button>
            {
              filters.show_batch_delete ?
                <Button
                  style={{ marginLeft: '10px' }}
                  id="delete"
                  disabled={idList.length === 0}
                  onClick={() => dispatch(submitDelete(idList))}
                >
                  {lan.BatchDelete}
                </Button> : null
            }
          </div>
        </form>
      </TabPane>
      <TabPane
        tab={__('order.name.search3')}
        key="2"
      >
        <div className={style.downloadCon}>
          <div className={style.uploadName} style={{ marginBottom: 10 }}>
            <span>{__('common.upload_name')}</span>
            <Group
              value={is_ignore}
              onChange={e => dispatch(commit('is_ignore', e.target.value))}
            >
              <Radio value={0}>{__('common.ignore1')}</Radio>
              <Radio value={1}>{__('common.ignore2')}</Radio>
            </Group>
          </div>
          <a
            className={style.buttonStyle} // （下载模板）
            href={`${location.origin}/Public/File/upload_excel/logistics_troubles_upload.xls`}
            target="_blank"
          >
            {__('returns.list.download')}
          </a>
          <br />
          <Upload
            name={'file'}
            action="/index_new.php/Order/OrderLogisticsTroubles/logisticsTroublesUpload"
            data={{ is_ignore, flag: 'add' }}
            beforeUpload={() => {
              if (is_ignore.length < 1) {
                message.warn(__('common.please_choose'));
                return false;
              }
              return true;
            }}
            onChange={(info) => {
              if (info.file.status === 'done') {
                if (info.file.response.code !== 0) {
                  message.error(info.file.response.msg, 10);
                } else {
                  // console.log(info, 'info');
                  message.success(`${info.file.name} ${__('order.goods-control.submitTitle2')}`, 10);
                  dispatch(commit('tracking_update', info.file.response.msg));
                }
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} ${__('order.goods-control.submitTitle3')}`, 10);
              }
            }}
          >
            <Button type="primary" className={style.upload}>
              <Icon type="upload" />{__('common.upload_logist')}
              {/* {__('returns.list.update')} */}
            </Button>
            <p style={{ marginTop: 10 }}>{__('common.track_upload_name')}</p>
          </Upload>
          <br /><br />
          {/* 更新运单号返回信息 */}
          <span
            dangerouslySetInnerHTML={{ __html: tracking_update }}
          />
        </div>

      </TabPane>
    </Tabs>
  );
};
Filters.propTypes = {
  dispatch: PropTypes.func,
  filters: PropTypes.shape(),
  filter: PropTypes.shape(),
  load: PropTypes.bool,
  idList: PropTypes.arrayOf(PropTypes.string),
  tracking_update: PropTypes.string,
  is_ignore: PropTypes.number,
};
export default Filters;
