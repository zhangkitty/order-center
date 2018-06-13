/**
 * Create by liufeng on 2017/8/30
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Collapse, Tabs, Select, Input, DatePicker, Button, message, Upload, Icon, Modal } from 'antd';
import moment from 'moment';
import {
  search, commit, change, initCountry, exportSubmit, initLogisticsChannelsArray, exportA,
} from './action';

import styles from './style.css';

const fontColor = {
  color: '#108ee9',
  transform: 'translateZ(0)',
  fontWeight: 'bold',
};
const Panel = Collapse.Panel;
const TabItem = Tabs.TabPane;
const Option = Select.Option;
const tabConfig = {
  renderTabBar: 'disable',
  renderTabContent: 'disable',
  defaultActiveKey: 'search',
  type: 'card',
};

const lan = {
  物流渠道: '物流渠道',
  下载案例: '下载案例',
  上传物流成本: '上传物流成本',
  导出成本核算字段: '导出成本核算字段',
};

class TabsHeader extends Component {
  constructor(props) {
    super(props);
    props.dispatch(initCountry());
  }

//  time control
  disabledDate(current) {
    const { start_time } = this.props.queryString;
    return (current && current.valueOf() < moment(start_time).valueOf());
  }

  render() {
    const {
      dispatch, queryString, searchLoad, exportLoad, tracking_update,
      fetchSite,
      fetchCountry,
      fetchMember,
      fetchWarehouse,
      fetchInsurance,
      fetchReturn,
      fetchTrouble,
      fetchShipping,
      fetchReturnType,
      fetchReturnStatus,
      fetchOrderType,
      fetchPayment,
      fetchTimeTag,
      LogisticsChannelsArray,
    } = this.props;
    const {
      return_order_id, order_no, email, tracking_no, good_sn, source_site, insurance_states, trouble_state,
      return_order_status, refund_status, shipping_status, order_type, receiver_country, return_label_type, warehouse,
      member_level, payment, time_tag, start_time, end_time, LogisticsChannels,
    } = queryString;
    return (
      <div className={styles.tabsHeader}>
        <Collapse defaultActiveKey={['1']}>
          <Panel
            key="1"
            header={
              <span style={fontColor}>{__('returns.list.search_list')}</span>
            }
          >
            <Tabs {...tabConfig}>
              <TabItem
                tab={__('order.name.search')}
                key="1"
              >
                <form
                  className={styles.filterBg}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (
                      moment(start_time).valueOf() > moment(end_time).valueOf()
                    ) {
                      return message.warning(__('returns.list.submitTitle'));
                    }
                    return dispatch(search(assign({},
                      queryString,
                      {
                        page_number: 1,
                        start_time: moment(start_time).format('YYYY-MM-DD HH:mm:ss'),
                        end_time: moment(end_time).format('YYYY-MM-DD HH:mm:ss'),
                      })));
                  }}
                >
                  <div className={styles.rowSpace}>
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.refund_number')}</span>
                      <Input
                        className={styles.colSpace}
                        value={return_order_id}
                        onChange={e => dispatch(commit('return_order_id', e.target.value))}
                      />
                    </div>
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.order_number')}</span>
                      <Input
                        className={styles.colSpace}
                        value={order_no}
                        onChange={e => dispatch(commit('order_no', e.target.value))}
                      />
                    </div>
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.email')}</span>
                      <Input
                        className={styles.colSpace}
                        value={email}
                        onChange={e => dispatch(commit('email', e.target.value))}
                      />
                    </div>
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.tracking_no')}</span>
                      <Input
                        className={styles.colSpace}
                        value={tracking_no}
                        onChange={e => dispatch(commit('tracking_no', e.target.value))}
                      />
                    </div>
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.good_sn')}</span>
                      <Input
                        className={styles.colSpace}
                        value={good_sn}
                        onChange={e => dispatch(commit('good_sn', e.target.value))}
                      />
                    </div>

                    {/* 站点 */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.site')}</span>
                      <Select
                        className={styles.colSpace}
                        mode="tags"
                        style={{ width: '200px' }}
                        tokenSeparators={[',']}
                        // value={source_site}
                        onChange={val => dispatch(commit('source_site', val.join(',')))}
                      >
                        {
                          fetchSite.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>
                    {/* 国家 */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.country')}</span>
                      <Select
                        className={styles.colSpace}
                        mode="tags"
                        style={{ width: '200px' }}
                        tokenSeparators={[',']}
                       // value={receiver_country}
                        onChange={val => dispatch(commit('receiver_country', val.join(',')))}
                      >
                        {
                          fetchCountry.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>

                    {/* 运费险 */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.insurance')}</span>
                      <Select
                        className={styles.colSpace}
                        value={insurance_states}
                        onChange={val => dispatch(commit('insurance_states', val))}
                      >
                        {
                          fetchInsurance.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>

                    {/* 仓库 */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.warehouse')}</span>
                      <Select
                        className={styles.colSpace}
                        mode="tags"
                        style={{ width: '200px' }}
                        tokenSeparators={[',']}
                        // value={warehouse}
                        onChange={val => dispatch(commit('warehouse', val.join(',')))}
                      >
                        {
                          fetchWarehouse.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>

                    {/* 退货单状态 */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.returns_status')}</span>
                      <Select
                        allowClear
                        className={styles.colSpace}
                        value={return_order_status}
                        onChange={val => dispatch(commit('return_order_status', val))}
                      >
                        {
                          fetchReturn.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>

                    {/* 问题件 */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.trouble')}</span>
                      <Select
                        className={styles.colSpace}
                        value={trouble_state}
                        onChange={val => dispatch(commit('trouble_state', val))}
                      >
                        {
                          fetchTrouble.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>

                    {/* 包裹状态 */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.shipping_status')}</span>
                      <Select
                        className={styles.colSpace}
                        value={shipping_status}
                        onChange={val => dispatch(commit('shipping_status', val))}
                      >
                        {
                          fetchShipping.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>

                    {/* 退款状态 */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.refund_status')}</span>
                      <Select
                        allowClear
                        className={styles.colSpace}
                        value={refund_status}
                        onChange={val => dispatch(commit('refund_status', val))}
                      >
                        {
                          fetchReturnStatus.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>


                    {/* 是否COD */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.is_cod')}</span>
                      <Select
                        allowClear
                        className={styles.colSpace}
                        value={payment}
                        onChange={val => dispatch(commit('payment', val))}
                      >
                        {
                          fetchPayment.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>

                    {/* 会员等级 */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.member_level')}</span>
                      <Select
                        allowClear
                        className={styles.colSpace}
                        value={member_level}
                        onChange={val => dispatch(commit('member_level', val))}
                      >
                        {
                          fetchMember.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>
                    {/* 物流渠道 */}
                    <div>
                      <span className={styles.filterName}>{lan.物流渠道}</span>
                      <Select
                        allowClear
                        className={styles.colSpace}
                        value={LogisticsChannels}
                        onChange={val => dispatch(commit('LogisticsChannels', val))}
                      >
                        {
                          LogisticsChannelsArray.map(item => (
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>

                    {/* 运单类型 */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.return_label_type')}</span>
                      <Select
                        allowClear
                        className={styles.colSpace}
                        value={return_label_type}
                        onChange={val => dispatch(commit('return_label_type', val))}
                      >
                        {
                          fetchReturnType.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>

                    {/* 退货单类型 */}
                    <div className={styles.rowSpaceList}>
                      <span className={styles.filterName}>{__('returns.list.order_type')}</span>
                      <Select
                        className={styles.colSpace}
                        mode="tags"
                        style={{ width: '200px' }}
                        tokenSeparators={[',']}
                        // value={order_type}
                        onChange={val => dispatch(commit('order_type', val.join(',')))}
                      >
                        {
                          fetchOrderType.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                    </div>
                    {/* 时间标识 */}
                    <div className={styles.rowSpaceList}>
                      <Select
                        placeholder={__('returns.list.search_title')}
                        className={styles.filterName}
                        // className={styles.colSpace}
                        style={{ width: '120px' }}
                        value={time_tag}
                        onChange={val => dispatch(commit('time_tag', val))}
                      >
                        {
                          fetchTimeTag.map(item => (
                            <Option key={item.id} > {item.name}</Option>
                          ))
                        }
                      </Select>
                      <div className={styles.colSpace2}>
                        <DatePicker
                          style={{ width: '150px' }}
                          allowClear={false}
                          format="YYYY-MM-DD HH:mm:ss"
                          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                          value={start_time ? moment(start_time) : null}
                          onChange={(value, str) => dispatch(commit('start_time', str))}
                        />
                        &nbsp;-&nbsp;
                        <DatePicker
                          style={{ width: '150px' }}
                          allowClear={false}
                          disabledDate={cur => this.disabledDate(cur)}
                          format="YYYY-MM-DD HH:mm:ss"
                          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                          value={end_time ? moment(end_time) : null}
                          onChange={(value, str) => dispatch(commit('end_time', str))}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    className={styles.filterButton}
                    type="primary"
                    icon="search"
                    loading={searchLoad}
                    htmlType={'submit'}
                  >
                    {__('returns.list.search')}
                  </Button>
                  {/* 导出 */}
                  <Button
                    className={styles.filterButton}
                    loading={exportLoad}
                    onClick={() => {
                      if (
                        moment(start_time).valueOf() > moment(end_time).valueOf()
                      ) {
                        return message.warning(__('returns.list.submitTitle'));
                      }
                      return dispatch(exportSubmit(assign({},
                        queryString,
                        {
                          page_number: 1,
                          start_time: moment(start_time).format('YYYY-MM-DD HH:mm:ss'),
                          end_time: moment(end_time).format('YYYY-MM-DD HH:mm:ss'),
                        })));
                    }}
                  >
                    {__('returns.list.export')}
                  </Button>
                </form>
              </TabItem>

              {/* 批量操作 */}
              <TabItem tab={__('order.name.search3')} key="2">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className={styles.downloadCon}>
                    <a
                      className={styles.buttonStyle} // （下载模板）
                      href={`${location.origin}/Public/File/upload_excel/example.xls`}
                      target="_blank"
                    >
                      {__('returns.list.download')}
                    </a>
                    <br /><br />
                    <p>{__('returns.list.tracking_update')}</p>
                    <Upload
                      name={'file'}
                      action="/index_new.php/Order/OrderReturn/uploadReturnShip"
                      onChange={(info) => {
                        if (info.file.status === 'done') {
                          if (info.file.response.code !== 0) {
                            message.error(info.file.response.msg, 10);
                          } else {
                            message.success(`${info.file.name} ${__('order.goods-control.submitTitle2')}`, 10);
                            dispatch(change('tracking_update', info.file.response.msg));
                          }
                        } else if (info.file.status === 'error') {
                          message.error(`${info.file.name} ${__('order.goods-control.submitTitle3')}`, 10);
                        }
                      }}
                    >
                      <Button type="primary" className={styles.upload}>
                        <Icon type="upload" />{__('returns.list.update')}
                      </Button>
                    </Upload>
                    <br /><br />
                    {/* 更新运单号返回信息 */}
                    <span
                      dangerouslySetInnerHTML={{ __html: tracking_update }}
                    />
                  </div>
                  <div className={styles.downloadCon}>
                    <a
                      className={styles.buttonStyle} // （下载模板）
                      href={`${location.origin}/Public/File/upload_excel/upload_logistics_cost.xls`}
                      target="_blank"
                    >
                      {lan.下载案例}
                    </a>
                    <br /><br />
                    <p />
                    <Upload
                      name={'file'}
                      action="/index_new.php/Order/OrderReturn/uploadLogisticsCost"
                      onChange={(info) => {
                        if (info.file.status === 'done') {
                          // if (info.file.response.code !== 0) {
                          //   message.error(info.file.response.msg, 10);
                          // } else {
                          //   message.success(`${info.file.name} ${__('order.goods-control.submitTitle2')}`, 10);
                          //   dispatch(change('tracking_update', info.file.response.msg));
                          // }
                          if (info.file.response.code !== 0) {
                            Modal.error({
                              title: '错误信息提示',
                              content: info.file.response.msg,
                            });
                          } else {
                            message.success(`${info.file.name} ${__('order.goods-control.submitTitle2')}`, 10);
                          }
                        } else if (info.file.status === 'error') {
                          message.error(`${info.file.name} ${__('order.goods-control.submitTitle3')}`, 10);
                        }
                      }}
                    >
                      <Button type="primary" className={styles.upload}>
                        <Icon type="upload" />{__('returns.list.update')}
                      </Button>
                    </Upload>
                    <div style={{ marginTop: 10 }}>
                      <Button
                        onClick={() => dispatch(exportA(this.props))}
                      >
                        {lan.导出成本核算字段}
                      </Button>
                    </div>
                    <br /><br />
                    {/* 更新运单号返回信息 */}
                    <span
                      dangerouslySetInnerHTML={{ __html: tracking_update }}
                    />
                  </div>

                </div>
              </TabItem>
            </Tabs>

          </Panel>
        </Collapse>
      </div>
    );
  }
}
TabsHeader.propTypes = {
  dispatch: PropTypes.func,
  searchLoad: PropTypes.bool,
  exportLoad: PropTypes.bool,
  queryString: PropTypes.shape(),
  fetchSite: PropTypes.arrayOf(PropTypes.shape()),  // 站点
  fetchCountry: PropTypes.arrayOf(PropTypes.shape()), // 国家
  fetchMember: PropTypes.arrayOf(PropTypes.shape()), // 会员等级
  fetchWarehouse: PropTypes.arrayOf(PropTypes.shape()), // 仓库
  fetchInsurance: PropTypes.arrayOf(PropTypes.shape()), // 是否购买退货险
  fetchReturn: PropTypes.arrayOf(PropTypes.shape()), // 退货单状态
  fetchTrouble: PropTypes.arrayOf(PropTypes.shape()),  // 是否问题件
  fetchShipping: PropTypes.arrayOf(PropTypes.shape()),  // 包裹状态
  fetchReturnType: PropTypes.arrayOf(PropTypes.shape()),  // 运单类型
  fetchReturnStatus: PropTypes.arrayOf(PropTypes.shape()),  // 退款状态
  fetchOrderType: PropTypes.arrayOf(PropTypes.shape()),   // 退货单类型
  fetchPayment: PropTypes.arrayOf(PropTypes.shape()),   // 是否COD
  fetchTimeTag: PropTypes.arrayOf(PropTypes.shape()),   // 时间标识
  tracking_update: PropTypes.string,
  total: PropTypes.number,
};
export default TabsHeader;
