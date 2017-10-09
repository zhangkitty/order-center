/**
 * Create by liufeng on 2017/8/30
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Collapse, Tabs, Select, Input, DatePicker, Button, message, Popover } from 'antd';
import moment from 'moment';
import {
  search, searchHigh, commit, commit2,
  initData,
  change, batchOperate, batchCheck, batchDelete, batchPart,
} from './action';

import styles from './style.css';

const fontColor = {
  color: '#108ee9',
  transform: 'translateZ(0)',
  fontWeight: 'bold',
};
const Panel = Collapse.Panel;
const Option = Select.Option;

const TabItem = Tabs.TabPane;
const tabConfig = {
  renderTabBar: 'disable',
  renderTabContent: 'disable',
  defaultActiveKey: 'search',
  type: 'card',
};

class TabsHeader extends Component {
  constructor(props) {
    super(props);
    // dispatch(init());
    props.dispatch(initData());  // 初始化数据（封装接口）
  }

//  time control
  disabledDate(current) {
    const { paytimeStart } = this.props.queryString;
    return (current && current.valueOf() < moment(paytimeStart).valueOf());
  }
  disabledDateHigh(current) {
    const { paytimeStart2 } = this.props.queryString2;
    return (current && current.valueOf() < moment(paytimeStart2).valueOf());
  }
  disabledDateHigh2(current) {
    const { handleTimeStart } = this.props.queryString2;
    return (current && current.valueOf() < moment(handleTimeStart).valueOf());
  }

  render() {
    const {
      dispatch, fetchCountry, fetchSite, fetchPayment, fetchTrouble, dataSource, batchChooseOrder,
      queryString, searchLoad, partDeliveryBase,
      queryString2, fetchMemberLevel, fetchOrderStatus, fetchCancelReason, fetchGoodsStatus,
    } = this.props;
    const {
      billno, orderId, shippingNo, referenceNumber, telephone, email, paytimeStart, paytimeEnd,
      countryName, siteFrom, txnId, paymentMethod, troubleType, trouble_user, totalSelect, totalInput,
    } = queryString;
    const {
      paytimeStart2,
      paytimeEnd2,
      countryName2,
      siteFrom2,
      paymentMethod2,
      troubleType2,
      goodsSn, yoho_count, memberLevel, orderStatus,
      cancelReason, goodsStatus, handleTimeStart, handleTimeEnd,
    } = queryString2;
    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel
          key="1"
          header={
            <span style={fontColor}>{__('order.name.search_list')}</span>
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
                  const temp = (moment(paytimeEnd)).unix() - (moment(paytimeStart)).unix();
                  if (!paytimeStart || !paytimeEnd) {
                    return message.warning(__('common.submitTitle1'));
                  } else if (moment(paytimeStart).valueOf() > moment(paytimeEnd).valueOf()) {
                    return message.warning(__('order.name.time_interval_large1'));
                  } else if (moment.unix(temp).dayOfYear() > 32) {
                    return message.warning(__('order.name.time_interval_large'));
                  }
                  return dispatch(search(assign({},
                    queryString,
                    {
                      pageNumber: 1,
                      paytimeStart: moment(paytimeStart).format('YYYY-MM-DD HH:mm:ss'),
                      paytimeEnd: moment(paytimeEnd).format('YYYY-MM-DD HH:mm:ss'),
                    })));
                }}
              >
                <div className={styles.rowSpace}>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.order_number')}</span>
                    <Input
                      className={styles.colSpace}
                      value={billno}
                      onChange={e => dispatch(commit('billno', e.target.value))}
                    />
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.order_id')}</span>
                    <Input
                      className={styles.colSpace}
                      value={orderId}
                      onChange={e => dispatch(commit('orderId', e.target.value))}
                    />
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.email')}</span>
                    <Input
                      className={styles.colSpace}
                      value={email}
                      onChange={e => dispatch(commit('email', e.target.value))}
                    />
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.shipping_no')}</span>
                    <Input
                      className={styles.colSpace}
                      value={shippingNo}
                      onChange={e => dispatch(commit('shippingNo', e.target.value))}
                    />
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.reference')}</span>
                    <Input
                      className={styles.colSpace}
                      value={referenceNumber}
                      onChange={e => dispatch(commit('referenceNumber', e.target.value))}
                    />
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.telephone')}</span>
                    <Input
                      className={styles.colSpace}
                      value={telephone}
                      onChange={e => dispatch(commit('telephone', e.target.value))}
                    />
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.site')}</span>
                    <Select
                      className={styles.colSpace}
                      mode="tags"
                      style={{ width: '250px' }}
                      tokenSeparators={[',']}
                     // value={siteFrom}
                      onChange={val => dispatch(commit('siteFrom', val))}
                    >
                      {
                        fetchSite.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.country')}</span>
                    <Select
                      allowClear
                      className={styles.colSpace}
                      value={countryName}
                      onChange={val => dispatch(commit('countryName', val))}
                    >
                      {/*
                       <Option key={null}>{__('order.name.choose')}</Option>
                      */}
                      {
                        fetchCountry.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.txn')}</span>
                    <Input
                      className={styles.colSpace}
                      value={txnId}
                      onChange={e => dispatch(commit('txnId', e.target.value))}
                    />
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.payment_method')}</span>
                    <Select
                      allowClear
                      className={styles.colSpace}
                      value={paymentMethod}
                      onChange={val => dispatch(commit('paymentMethod', val))}
                    >
                      {
                        fetchPayment.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.trouble')}</span>
                    <Select
                      allowClear
                      className={styles.colSpace}
                      value={troubleType}
                      onChange={(val) => {
                        if (val === undefined) {
                          dispatch(commit('trouble_user', null));
                        }
                        dispatch(commit('troubleType', val));
                      }}
                    >
                      {
                        fetchTrouble.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  {/* 标记人 */}
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.remark_user')}</span>
                    <Input
                      disabled={troubleType === null || troubleType === 'null' || !troubleType}
                      className={styles.colSpace}
                      value={trouble_user}
                      onChange={e => dispatch(commit('trouble_user', e.target.value))}
                    />
                  </div>

                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.total_select')}</span>
                    <Select
                      allowClear
                      className={styles.colSpace}
                      style={{ width: '70px', marginRight: '10px' }}
                      value={totalSelect}
                      onChange={(val) => {
                        if (val === undefined) {
                          dispatch(commit('totalInput', null));
                        }
                        dispatch(commit('totalSelect', val));
                      }}
                    >
                      <Option key={1} > > </Option>
                      <Option key={2} > = </Option>
                    </Select>
                    <Input
                      disabled={totalSelect === null || totalSelect === 'null' || !totalSelect}
                      className={styles.colSpace}
                      value={totalInput}
                      onChange={e => dispatch(commit('totalInput', e.target.value))}
                    />
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>
                      <span style={{ color: 'red' }}>*</span>{__('order.name.paytime')}
                    </span>
                    <div className={styles.colSpace2}>
                      <DatePicker
                        style={{ width: '150px' }}
                        allowClear={false}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={moment(paytimeStart)}
                        onChange={(value, str) => dispatch(commit('paytimeStart', str))}
                      />
                      &nbsp; - &nbsp;
                      <DatePicker
                        style={{ width: '150px' }}
                        allowClear={false}
                        disabledDate={cur => this.disabledDate(cur)}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={moment(paytimeEnd)}
                        onChange={(value, str) => dispatch(commit('paytimeEnd', str))}
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
                  {__('common.search')}
                </Button>
                <Popover placement="topLeft" content={<p>{__('order.name.tip_title1')}<br />{__('order.name.tip_title2')}<br />{__('order.name.tip_title3')}</p>}>
                  <a>{__('order.name.tip')}</a>
                </Popover>
              </form>
            </TabItem>

            {/* 高级搜索 */}
            <TabItem tab={__('order.name.search2')} key="2">
              <form
                className={styles.filterBg}
                onSubmit={(e) => {
                  e.preventDefault();
                  const tempHigh = (moment(paytimeEnd)).unix() - (moment(paytimeStart)).unix();
                  if ((!paytimeStart2 || !paytimeEnd2) && (!handleTimeStart || !handleTimeEnd)) {
                    return message.warning(__('common.submitTitle1'));
                  } else if (moment(paytimeStart2).valueOf() > moment(paytimeEnd2).valueOf()) {
                    return message.warning(__('order.name.time_interval_large1'));
                  } else if (moment.unix(tempHigh).dayOfYear() > 32) {
                    return message.warning(__('order.name.time_interval_large'));
                  } else if (moment(handleTimeStart).valueOf() > moment(handleTimeEnd).valueOf()) {
                    return message.warning(__('order.name.time_interval_large1'));
                  }
                  return dispatch(searchHigh(assign({},
                    queryString2,
                    {
                      pageNumber: 1,
                      paytimeStart: moment(paytimeStart2).format('YYYY-MM-DD HH:mm:ss'),
                      paytimeEnd: moment(paytimeEnd2).format('YYYY-MM-DD HH:mm:ss'),
                      countryName: countryName2,
                      siteFrom: siteFrom2,
                      paymentMethod: paymentMethod2,
                      troubleType: troubleType2,
                      handleTimeStart: handleTimeStart ? moment(handleTimeStart).format('YYYY-MM-DD HH:mm:ss') : null,
                      handleTimeEnd: handleTimeEnd ? moment(handleTimeEnd).format('YYYY-MM-DD HH:mm:ss') : null,
                    })));
                }}
              >
                <div className={styles.rowSpace}>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>
                      {__('order.name.paytime')}
                    </span>
                    <div className={styles.colSpace2}>
                      <DatePicker
                        style={{ width: '150px' }}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={paytimeStart2 ? moment(paytimeStart2) : null}
                        onChange={(value, str) => {
                          dispatch(commit2('paytimeStart2', str));
                        }}
                      />
                      &nbsp; - &nbsp;
                      <DatePicker
                        style={{ width: '150px' }}
                        disabledDate={cur => this.disabledDateHigh(cur)}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={paytimeEnd2 ? moment(paytimeEnd2) : null}
                        onChange={(value, str) => {
                          dispatch(commit2('paytimeEnd2', str));
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.site')}</span>
                    <Select
                      className={styles.colSpace}
                      mode="tags"
                      style={{ width: '250px' }}
                    //  value={siteFrom2}
                      onChange={val => dispatch(commit2('siteFrom2', val))}
                    >
                      {
                        fetchSite.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.country')}</span>
                    <Select
                      allowClear
                      className={styles.colSpace}
                      value={countryName2}
                      onChange={val => dispatch(commit2('countryName2', val))}
                    >
                      {
                        fetchCountry.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.payment_method')}</span>
                    <Select
                      allowClear
                      className={styles.colSpace}
                      value={paymentMethod2}
                      onChange={val => dispatch(commit2('paymentMethod2', val))}
                    >
                      {
                        fetchPayment.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.trouble')}</span>
                    <Select
                      allowClear
                      className={styles.colSpace}
                      value={troubleType2}
                      onChange={val => dispatch(commit2('troubleType2', val))}
                    >
                      {
                        fetchTrouble.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.sku')}</span>
                    <Input
                      className={styles.colSpace}
                      value={goodsSn}
                      onChange={e => dispatch(commit2('goodsSn', e.target.value))}
                    />
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.count')}</span>
                    <Input
                      className={styles.colSpace}
                      value={yoho_count}
                      type="number"
                      onChange={e => dispatch(commit2('yoho_count', e.target.value))}
                    />
                  </div>
                  {/* 会员等级 */}
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.member_level')}</span>
                    <Select
                      allowClear
                      className={styles.colSpace}
                      value={memberLevel}
                      onChange={val => dispatch(commit2('memberLevel', val))}
                    >
                      {
                        fetchMemberLevel.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  {/* 订单状态 */}
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.order_status')}</span>
                    <Select
                      allowClear
                      className={styles.colSpace}
                      value={orderStatus}
                      onChange={val => dispatch(commit2('orderStatus', val))}
                    >
                      {
                        fetchOrderStatus.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  {/* 取消类型 */}
                  {
                    Number(orderStatus) !== 14 ?
                      <div className={styles.rowSpaceList} />
                      :
                      <div className={styles.rowSpaceList}>
                        <span className={styles.filterName}>{__('order.name.cancel_type')}</span>
                        <Select
                          allowClear
                          className={styles.colSpace}
                          value={cancelReason}
                          onChange={val => dispatch(commit2('cancelReason', val))}
                        >
                          {/*
                           <Option key={null} > {__('order.name.choose')}</Option>
                          */}
                          {
                            fetchCancelReason.map(item => (
                              <Option key={item.id} > {item.name}</Option>
                            ))
                          }
                        </Select>
                      </div>
                  }

                  {/* 商品状态 */}
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.goods_status')}</span>
                    <Select
                      allowClear
                      className={styles.colSpace}
                      value={goodsStatus}
                      onChange={(val) => {
                        if (val === undefined) {
                          dispatch(commit2('handleTimeStart', null));
                          dispatch(commit2('handleTimeEnd', null));
                        }
                        dispatch(commit2('goodsStatus', val));
                      }}
                    >
                      {
                        fetchGoodsStatus.map(item => (
                          <Option key={item.id}> {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>

                  <div className={styles.rowSpaceList} style={{ maxWidth: '510px' }}>
                    <span className={styles.filterName} style={{ maxWidth: '160px' }}>
                      {__('order.name.goods_time')}
                    </span>
                    <div className={styles.colSpace2}>
                      <DatePicker
                        disabled={goodsStatus === null || goodsStatus === 'null' || !goodsStatus}
                        style={{ width: '150px' }}
                        format="YYYY-MM-DD HH:mm:ss"
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        value={handleTimeStart ? moment(handleTimeStart) : null}
                        onChange={(value, str) => dispatch(commit2('handleTimeStart', str))}
                      />
                      &nbsp; - &nbsp;
                      <DatePicker
                        disabled={goodsStatus === null || goodsStatus === 'null' || !goodsStatus}
                        style={{ width: '150px' }}
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={cur => this.disabledDateHigh2(cur)}
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        value={handleTimeEnd ? moment(handleTimeEnd) : null}
                        onChange={(value, str) => dispatch(commit2('handleTimeEnd', str))}
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
                  {__('common.search')}
                </Button>
                <Popover placement="topLeft" content={<p>{__('order.name.tip_title1')}<br />{__('order.name.tip_title2')}<br />{__('order.name.tip_title3')}</p>}>
                  <a>{__('order.name.tip')}</a>
                </Popover>
              </form>
            </TabItem>
            {/*  批量操作 */}
            <TabItem tab={__('order.name.search3')} key="3">
              <div className={styles.batchBg}>
                {/* 全选，取消 */}
                <Button
                  onClick={() => dispatch(change('batchChooseOrder', dataSource.map(v => v.order_id)))}
                >{__('common.allChoose')}</Button>
                <Button
                  onClick={() => dispatch(change('batchChooseOrder', []))}
                >{__('common.cancel')}</Button>
                {/* 批量部分发 */}
                <span>{__('common.batchection')}</span>
                <Select
                  style={{ width: '150px', marginRight: '5px' }}
                  onChange={
                    v => dispatch(change('partDeliveryBase', v))
                  }
                  placeholder={__('common.choose')}
                >
                  <Option key="1"> {__('common.guangzhou')}</Option>
                  <Option key="0">{__('common.west')}</Option>
                </Select>
                <Button
                  onClick={() => {
                    if (!batchChooseOrder || !partDeliveryBase) {
                      return message.warning(__('common.submitTitle3'));
                    } else if (batchChooseOrder.length < 1) {
                      return message.warning(__('common.submitTitle3'));
                    }
                    return dispatch(batchPart('/Order/partDelivery', {
                      // order_ids: batchChooseOrder.map(v => Number(v)),
                      order_ids: batchChooseOrder.join(','),
                      inventory_type: Number(partDeliveryBase),
                    }));
                  }}
                >{__('common.batchection')} </Button>

                {/* 平台取消订单 */}
                <Button
                  onClick={() => {
                    if (batchChooseOrder.length < 1) {
                      return message.warning(__('common.submitTitle3'));
                    }
                    return dispatch(batchDelete('/Order/orderDelete', { order_ids: batchChooseOrder.join(',') }));
                  }}
                > {__('common.platform')}</Button>
                {/* 批量审核 */}
                <Button
                  onClick={() => {
                    if (batchChooseOrder.length < 1) {
                      return message.warning(__('common.submitTitle3'));
                    }
                    return dispatch(batchCheck('/Order/orderBatchCheck', { order_ids: batchChooseOrder.join(',') }));
                  }}
                > {__('common.review')}</Button>
              </div>
            </TabItem>
          </Tabs>
        </Panel>
      </Collapse>
    );
  }
}
TabsHeader.propTypes = {
  dispatch: PropTypes.func,
  partDeliveryBase: PropTypes.string,
  searchLoad: PropTypes.bool,
  queryString: PropTypes.shape(),
  queryString2: PropTypes.shape(),   // 高级搜索
  fetchCountry: PropTypes.arrayOf(PropTypes.shape()),  // 国家
  dataSource: PropTypes.arrayOf(PropTypes.shape()),  //
  batchChooseOrder: PropTypes.arrayOf(PropTypes.string),  //
  fetchSite: PropTypes.arrayOf(PropTypes.shape()),   // 站点
  fetchPayment: PropTypes.arrayOf(PropTypes.shape()),     // 支付方式
  fetchTrouble: PropTypes.arrayOf(PropTypes.shape()),      // 问题件类型
  fetchMemberLevel: PropTypes.arrayOf(PropTypes.shape()),   // 会员等级 - 高
  fetchOrderStatus: PropTypes.arrayOf(PropTypes.shape()),   // 订单状态 - 高
  fetchCancelReason: PropTypes.arrayOf(PropTypes.shape()),   // 取消类型 - 高
  fetchGoodsStatus: PropTypes.arrayOf(PropTypes.shape()),   // 商品状态 - 高
};
export default TabsHeader;
