/**
 * Create by liufeng on 2017/8/30
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Collapse, Tabs, Select, Input, DatePicker, Button, message, Tooltip } from 'antd';
import moment from 'moment';
import {
  search, searchHigh, commit, commit2,
  initCountry, initSite, initPayment, initTrouble,
  initMember, initOrder, initCancel, initGoods, change,
  batchOperate,
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
    props.dispatch(initCountry());
    props.dispatch(initSite());
    props.dispatch(initPayment());
    props.dispatch(initTrouble());
    props.dispatch(initMember());  // 会员等级- 高
    props.dispatch(initOrder());  // 订单状态
    props.dispatch(initCancel());  // 取消类型 - 参数-订单状态=“已取消”
    props.dispatch(initGoods());  // 商品状态 - 选中订单状态，显示 商品状态
  }
  // time control
  // disabledDate(current) {
  //   const { paytimeStart } = this.props.queryString;
  //   return (
  //     (current && current.valueOf() < moment(paytimeStart).valueOf())
  //     ||
  //     (current.valueOf() > moment(paytimeStart).endOf('month').valueOf())
  //   );
  // }

  render() {
    const {
      dispatch, fetchCountry, fetchSite, fetchPayment, fetchTrouble, dataSource, batchChooseOrder,
      queryString, searchLoad, partDeliveryBase,
      queryString2, fetchMemberLevel, fetchOrderStatus, fetchCancelReason, fetchGoodsStatus,
    } = this.props;
    const {
      billno, orderId, shippingNo, referenceNumber, telephone, email, paytimeStart, paytimeEnd,
      countryName, siteFrom, txnId, paymentMethod, troubleType, remarkUser, totalSelect, totalInput,
    } = queryString;
    const {
      paytimeStart: paytimeStart2,
      paytimeEnd: paytimeEnd2,
      countryName: countryName2,
      siteFrom: siteFrom2,
      paymentMethod: paymentMethod2,
      troubleType: troubleType2, goodsSn, count, memberLevel, orderStatus,
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
                  if (!paytimeStart || !paytimeEnd) {
                    return message.warning(__('common.submitTitle1'));
                  }
                  return dispatch(search(assign({},
                    queryString,
                    {
                      pageNumber: 1,
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
                      value={siteFrom}
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
                      className={styles.colSpace}
                      value={countryName}
                      onChange={val => dispatch(commit('countryName', val))}
                    >
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
                      className={styles.colSpace}
                      value={paymentMethod}
                      onChange={val => dispatch(commit('paymentMethod', val))}
                    >
                      <Option key={null} > {__('order.name.choose')}</Option>
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
                      className={styles.colSpace}
                      value={troubleType}
                      onChange={val => dispatch(commit('troubleType', val))}
                    >
                      <Option key={null} > {__('order.name.choose')}</Option>
                      {
                        fetchTrouble.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.remark_user')}</span>
                    <Input
                      className={styles.colSpace}
                      value={remarkUser}
                      onChange={e => dispatch(commit('remarkUser', e.target.value))}
                    />
                  </div>

                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.total_select')}</span>
                    <Select
                      className={styles.colSpace}
                      style={{ width: '70px', marginRight: '10px' }}
                      value={totalSelect}
                      onChange={val => dispatch(commit('totalSelect', val))}
                    >
                      <Option key={null} > {__('order.name.choose')}</Option>
                      <Option key={1} > > </Option>
                      <Option key={2} > = </Option>
                    </Select>
                    <Input
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
                        format="YYYY-MM-DD HH:mm:SS"
                        value={moment(paytimeStart, 'YYYY-MM-DD HH:mm:SS')}
                        onChange={(value, str) => dispatch(commit('paytimeStart', str))}
                      />
                      &nbsp; - &nbsp;
                      <DatePicker
                        style={{ width: '150px' }}
                        allowClear={false}
                      //  disabledDate={cur => this.disabledDate(cur)}
                        showTime
                        format="YYYY-MM-DD HH:mm:SS"
                        value={moment(paytimeEnd, 'YYYY-MM-DD HH:mm:SS')}
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
                <Tooltip placement="topLeft" title={__('order.name.tip_title')}>
                  <a>{__('order.name.tip')}</a>
                </Tooltip>
              </form>
            </TabItem>

            {/* 高级搜索 */}
            <TabItem tab={__('order.name.search2')} key="2">
              <form
                className={styles.filterBg}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!paytimeStart || !paytimeEnd) {
                    return message.warning(__('common.submitTitle1'));
                  }
                  return dispatch(searchHigh(assign({},
                    queryString2,
                    {
                      pageNumber: 1,
                    })));
                }}
              >
                <div className={styles.rowSpace}>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>
                      <span style={{ color: 'red' }}>*</span>{__('order.name.paytime')}
                    </span>
                    <div className={styles.colSpace2}>
                      <DatePicker
                        style={{ width: '150px' }}
                        allowClear={false}
                        showTime
                        format="YYYY-MM-DD HH:mm:SS"
                        value={moment(paytimeStart, 'YYYY-MM-DD HH:mm:SS')}
                        onChange={(value, str) => dispatch(commit2('paytimeStart', str))}
                      />
                      &nbsp; - &nbsp;
                      <DatePicker
                        style={{ width: '150px' }}
                        allowClear={false}
                     //   disabledDate={cur => this.disabledDate(cur)}
                        showTime
                        format="YYYY-MM-DD HH:mm:SS"
                        value={moment(paytimeEnd, 'YYYY-MM-DD HH:mm:SS')}
                        onChange={(value, str) => dispatch(commit2('paytimeEnd', str))}
                      />
                    </div>
                  </div>
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.site')}</span>
                    <Select
                      className={styles.colSpace}
                      mode="tags"
                      style={{ width: '250px' }}
                      value={siteFrom}
                      onChange={val => dispatch(commit2('siteFrom', val))}
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
                      className={styles.colSpace}
                      value={countryName}
                      onChange={val => dispatch(commit2('countryName', val))}
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
                      className={styles.colSpace}
                      value={paymentMethod}
                      onChange={val => dispatch(commit2('paymentMethod', val))}
                    >
                      <Option key={null} > {__('order.name.choose')}</Option>
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
                      className={styles.colSpace}
                      value={troubleType}
                      onChange={val => dispatch(commit2('troubleType', val))}
                    >
                      <Option key={null} > {__('order.name.choose')}</Option>
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
                      value={count}
                      onChange={e => dispatch(commit2('count', e.target.value))}
                    />
                  </div>
                  {/* 会员等级 */}
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.member_level')}</span>
                    <Select
                      className={styles.colSpace}
                      value={memberLevel}
                      onChange={val => dispatch(commit2('memberLevel', val))}
                    >
                      <Option key={null} > {__('order.name.choose')}</Option>
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
                      className={styles.colSpace}
                      value={orderStatus}
                      onChange={val => dispatch(commit2('orderStatus', val))}
                    >
                      <Option key={null} > {__('order.name.choose')}</Option>
                      {
                        fetchOrderStatus.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  {/* 取消类型 */}
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.cancel_type')}</span>
                    <Select
                      className={styles.colSpace}
                      value={cancelReason}
                      onChange={val => dispatch(commit2('cancelReason', val))}
                    >
                      <Option key={null} > {__('order.name.choose')}</Option>
                      {
                        fetchCancelReason.map(item => (
                          <Option key={item.id} > {item.name}</Option>
                        ))
                      }
                    </Select>
                  </div>

                  {/* 商品状态 */}
                  <div className={styles.rowSpaceList}>
                    <span className={styles.filterName}>{__('order.name.goods_status')}</span>
                    <Select
                      className={styles.colSpace}
                      value={goodsStatus}
                      onChange={val => dispatch(commit2('goodsStatus', val))}
                    >
                      <Option key={null} > {__('order.name.choose')}</Option>
                      {
                        fetchGoodsStatus.map(item => (
                          <Option key={item.id} > {item.name}</Option>
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
                        style={{ width: '150px' }}
                        allowClear={false}
                        showTime
                        format="YYYY-MM-DD HH:mm:SS"
                        value={handleTimeStart}
                        onChange={(value, str) => dispatch(commit2('handleTimeStart', str))}
                      />
                      &nbsp; - &nbsp;
                      <DatePicker
                        style={{ width: '150px' }}
                        allowClear={false}
                        showTime
                        format="YYYY-MM-DD HH:mm:SS"
                        value={handleTimeEnd}
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
                <Tooltip placement="topLeft" title={__('order.name.tip_title')}>
                  <a>{__('order.name.tip')}</a>
                </Tooltip>
              </form>
            </TabItem>
            {/*  批量操作 */}
            <TabItem tab={__('order.name.search3')} key="3">
              <div className={styles.batchBg}>
                <Button
                  onClick={() => dispatch(change('batchChooseOrder', dataSource.map(v => v.order_id)))}
                >{__('common.allChoose')}</Button>
                <Button
                  onClick={() => dispatch(change('batchChooseOrder', []))}
                >{__('common.cancel')}</Button>

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
                  onClick={() => dispatch(batchOperate('/Order/partDelivery', {
                    order_ids: batchChooseOrder.map(v => Number(v)),
                    inventory_type: Number(partDeliveryBase),
                  }))}
                >{__('common.batchection')} </Button>

                <Button
                  onClick={() => dispatch(batchOperate('/Order/orderDelete', { order_ids: batchChooseOrder.join(',') }))}
                > {__('common.platform')}</Button>
                <Button
                  onClick={() => dispatch(batchOperate('/Order/orderBatchCheck', { order_ids: batchChooseOrder.join(',') }))}
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
  dataSource: PropTypes.arrayOf(PropTypes.shape()),  // 国家
  batchChooseOrder: PropTypes.arrayOf(PropTypes.number),  // 国家
  fetchSite: PropTypes.arrayOf(PropTypes.shape()),   // 站点
  fetchPayment: PropTypes.arrayOf(PropTypes.shape()),     // 支付方式
  fetchTrouble: PropTypes.arrayOf(PropTypes.shape()),      // 问题件类型
  fetchMemberLevel: PropTypes.arrayOf(PropTypes.shape()),   // 会员等级 - 高
  fetchOrderStatus: PropTypes.arrayOf(PropTypes.shape()),   // 订单状态 - 高
  fetchCancelReason: PropTypes.arrayOf(PropTypes.shape()),   // 取消类型 - 高
  fetchGoodsStatus: PropTypes.arrayOf(PropTypes.shape()),   // 商品状态 - 高
};
export default TabsHeader;
