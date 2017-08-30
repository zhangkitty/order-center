/**
 * Create by liufeng on 2017/8/30
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Collapse, Tabs, Select, Input, DatePicker, Button, Icon, message } from 'antd';
import moment from 'moment';
import { search, commit, initCountry, initSite } from './action';

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
  }
  // time control
  disabledDate(current) {
    const { paytimeStart } = this.props.queryString;
    return (
      (current && current.valueOf() < moment(paytimeStart).valueOf())
      ||
      (current.valueOf() > moment(paytimeStart).endOf('month').valueOf())
    );
  }

  render() {
    const {
      dispatch, fetchCountry, fetchSite,
      queryString, searchLoad,
    } = this.props;
    const {
      billno, orderId, shippingNo, referenceNumber, telephone, email, paytimeStart, paytimeEnd,
      countryName, siteFrom,
    } = queryString;
    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel
          key="1"
          header={
            <span style={fontColor}>自定义列表</span>
          }
        >
          <Tabs {...tabConfig}>
            <TabItem tab={'搜索'} key="search">
              <form
                className={styles.filterBg}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!paytimeStart || !paytimeEnd) {
                    return message.warning('缺少时间');
                  } else if (moment(paytimeStart).format('YYYY-MM') !== moment(paytimeEnd).format('YYYY-MM')) {
                    return message.warning('不支持跨月查询');
                  } else if (
                    !moment(paytimeEnd).isAfter(paytimeStart)
                    && !moment(paytimeEnd).isSame(paytimeStart)
                  ) {
                    return message.warning('结束时间必须大于开始时间');
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
                    <span className={styles.filterName}><span style={{ color: 'red' }}>*</span>{__('order.name.order_number')}</span>
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
                    <span className={styles.filterName}><span style={{ color: 'red' }}>*</span>国家qq</span>
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
                    <span className={styles.filterName}><span style={{ color: 'red' }}>*</span>站点qq</span>
                    <Select
                      className={styles.colSpace}
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
                    <span className={styles.filterName}><span style={{ color: 'red' }}>*</span>{__('order.name.paytime')}</span>
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
                        disabledDate={cur => this.disabledDate(cur)}
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
                  查询</Button>
              </form>

            </TabItem>
            <TabItem tab={'列表显示'} key="show">
              高级搜索
            </TabItem>
          </Tabs>
        </Panel>
      </Collapse>
    );
  }
}
TabsHeader.propTypes = {
  dispatch: PropTypes.func,
  searchLoad: PropTypes.bool,
  queryString: PropTypes.shape(),
  fetchCountry: PropTypes.arrayOf(PropTypes.shape()),
  fetchSite: PropTypes.arrayOf(PropTypes.shape()),
};
export default TabsHeader;
