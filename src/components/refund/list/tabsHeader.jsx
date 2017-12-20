/**
 * Create by liufeng on 2017/8/30
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Collapse, Select, Input, DatePicker, Button, message, Tooltip, Icon } from 'antd';
import moment from 'moment';
import parseParam from '../../../lib/query-string';
import {
  search, commit, initCountry,
} from './action';

import styles from './style.css';

const fontColor = {
  color: '#108ee9',
  transform: 'translateZ(0)',
  fontWeight: 'bold',
};
const Panel = Collapse.Panel;
const Option = Select.Option;

class TabsHeader extends Component {
  constructor(props) {
    super(props);
    props.dispatch(initCountry());
  }

//  time control
  disabledDate(current) {
    const { apply_start_time } = this.props.queryString;
    return (current && current.valueOf() < moment(apply_start_time).valueOf());
  }
  disabledRefundDate(current) {
    const { refund_start_time } = this.props.queryString;
    return (current && current.valueOf() < moment(refund_start_time).valueOf());
  }

  render() {
    const {
      dispatch, queryString, searchLoad, waitTotal, rejectTotal, total,
      fetchType, fetchStatus, fetchPath, fetchPathStatus, fetchSite, fetchCountry, fetchMember, fetchRefund,
    } = this.props;
    const {
      refund_bill_id, billno, email, add_user, handle_user,
      refund_bill_type, refund_bill_status, refund_path_id, refund_path_status, site_from, apply_start_time, apply_end_time,
      country_id, member_level, refund_start_time, refund_end_time, refund_method,
    } = queryString;

    const exportSubmit = (param) => {
      const keys = ['refund_bill_id', 'billno', 'email', 'add_user', 'handle_user',
        'refund_bill_type', 'refund_bill_status', 'refund_path_id', 'refund_path_status', 'site_from', 'apply_start_time', 'apply_end_time',
        'country_id', 'member_level', 'refund_start_time', 'refund_end_time'];
      console.log(parseParam(keys, queryString));
      return parseParam(keys, queryString);
    };

    return (
      <div className={styles.tabsHeader}>
        <Collapse defaultActiveKey={['1']}>
          <Panel
            key="1"
            header={
              <span style={fontColor}>{__('refund.list.search_list')}</span>
            }
          >
            <form
              className={styles.filterBg}
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  moment(apply_start_time).valueOf() > moment(apply_end_time).valueOf()
                  ||
                  moment(refund_start_time).valueOf() > moment(refund_end_time).valueOf()
                ) {
                  return message.warning(__('refund.list.submitTitle'));
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
                  <span className={styles.filterName}>{__('refund.list.refund_number')}</span>
                  <Input
                    className={styles.colSpace}
                    value={refund_bill_id}
                    onChange={e => dispatch(commit('refund_bill_id', e.target.value))}
                  />
                </div>
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.order_number')}</span>
                  <Input
                    className={styles.colSpace}
                    value={billno}
                    onChange={e => dispatch(commit('billno', e.target.value))}
                  />
                </div>
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.email')}</span>
                  <Input
                    className={styles.colSpace}
                    value={email}
                    onChange={e => dispatch(commit('email', e.target.value))}
                  />
                </div>
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.applicant')}</span>
                  <Input
                    className={styles.colSpace}
                    value={add_user}
                    onChange={e => dispatch(commit('add_user', e.target.value))}
                  />
                </div>
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.operator')}</span>
                  <Input
                    className={styles.colSpace}
                    value={handle_user}
                    onChange={e => dispatch(commit('handle_user', e.target.value))}
                  />
                </div>
                {/* 退款类型列表 */}
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.refund_type')}</span>
                  <Select
                    // allowClear
                    className={styles.colSpace}
                    mode="tags"
                    style={{ width: '250px' }}
                    tokenSeparators={[',']}
                    // value={refund_bill_type}
                    onChange={val => dispatch(commit('refund_bill_type', val))}
                  >
                    {
                      fetchType.map(item => (
                        <Option key={item.type_id} > {item.type_name}</Option>
                      ))
                    }
                  </Select>
                </div>
                {/* 退款路径列表 */}
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.refund_path')}</span>
                  <Select
                    allowClear
                    className={styles.colSpace}
                    value={refund_path_id}
                    onChange={val => dispatch(commit('refund_path_id', val))}
                  >
                    {
                      fetchPath.map(item => (
                        <Option key={item.id} > {item.name}</Option>
                      ))
                    }
                  </Select>
                </div>
                {/* 退款路径状态列表 --- 退款记录状态 */}
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.path_status')}</span>
                  <Select
                    allowClear
                    className={styles.colSpace}
                    value={refund_path_status}
                    onChange={val => dispatch(commit('refund_path_status', val))}
                  >
                    {
                      fetchPathStatus.map(item => (
                        <Option key={item.id} > {item.status}</Option>
                      ))
                    }
                  </Select>
                </div>
                {/* 站点 */}
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.site')}</span>
                  <Select
                    className={styles.colSpace}
                    mode="tags"
                    style={{ width: '250px' }}
                    tokenSeparators={[',']}
                    // value={site_from}
                    onChange={val => dispatch(commit('site_from', val))}
                  >
                    {
                      fetchSite.map(item => (
                        <Option key={item.id} > {item.name}</Option>
                      ))
                    }
                  </Select>
                </div>
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>
                    {__('refund.list.apply_time')}
                  </span>
                  <div className={styles.colSpace2}>
                    <DatePicker
                      style={{ width: '150px' }}
                      allowClear={false}
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                      value={apply_start_time ? moment(apply_start_time) : null}
                      onChange={(value, str) => dispatch(commit('apply_start_time', str))}
                    />
                    &nbsp; - &nbsp;
                    <DatePicker
                      style={{ width: '150px' }}
                      allowClear={false}
                      disabledDate={cur => this.disabledDate(cur)}
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                      value={apply_end_time ? moment(apply_end_time) : null}
                      onChange={(value, str) => dispatch(commit('apply_end_time', str))}
                    />
                  </div>
                </div>
                {/* 国家 */}
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.country')}</span>
                  <Select
                    className={styles.colSpace}
                    mode="multiple"
                    style={{ width: '250px' }}
                    tokenSeparators={[',']}
                    // value={country_id}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().startsWith(input.toLowerCase())}
                    onChange={val => dispatch(commit('country_id', val))}
                  >
                    {
                      fetchCountry.map(item => (
                        <Option key={item.id}>{item.country}</Option>
                      ))
                    }
                  </Select>
                </div>
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.member_level')}</span>
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
                {/* 退款单状态 */}
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.bill_status')}</span>
                  <Select
                    allowClear
                    className={styles.colSpace}
                    value={refund_bill_status}
                    onChange={val => dispatch(commit('refund_bill_status', val))}
                  >
                    {
                      fetchStatus.map(item => (
                        <Option key={item.id} > {item.status}</Option>
                      ))
                    }
                  </Select>
                </div>
                {/* 账户 */}
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>{__('refund.list.refund_method')}</span>
                  <Select
                    allowClear
                    className={styles.colSpace}
                    value={refund_method}
                    onChange={val => dispatch(commit('refund_method', val))}
                  >
                    {
                      fetchRefund.map(item => (
                        <Option key={item.name}>{item.name}</Option>
                      ))
                    }
                  </Select>
                </div>
                {/* 退款日期 */}
                <div className={styles.rowSpaceList}>
                  <span className={styles.filterName}>
                    {__('refund.list.refund_time')}
                  </span>
                  <div className={styles.colSpace2}>
                    <DatePicker
                      style={{ width: '150px' }}
                      allowClear={false}
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                      value={refund_start_time ? moment(refund_start_time) : null}
                      onChange={(value, str) => dispatch(commit('refund_start_time', str))}
                    />
                    &nbsp; - &nbsp;
                    <DatePicker
                      style={{ width: '150px' }}
                      allowClear={false}
                      disabledDate={cur => this.disabledRefundDate(cur)}
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                      value={refund_end_time ? moment(refund_end_time) : null}
                      onChange={(value, str) => dispatch(commit('refund_end_time', str))}
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
                {__('refund.list.search')}
              </Button>
              {
                queryString.apply_start_time && queryString.apply_end_time ?
                  <a
                    className={styles.buttonStyle}
                    href={`${location.origin}/index_new.php/Order/OrderDiffRefund/submitExportRefundBill?${exportSubmit()}`}
                    target="_blank"
                  >

                    {__('refund.list.export')}
                  </a>
                  :
                  <span>
                    <Button
                      className={styles.buttonStyle}
                      disabled
                    >
                      {__('refund.list.export')}
                    </Button>
                    <Tooltip placement="top" title={__('refund.list.export_title')}>
                      <Icon type="question-circle" style={{ marginLeft: '10px' }} />
                    </Tooltip>
                  </span>
              }
            </form>

          </Panel>
        </Collapse>

        {/* 按钮 */}
        {
          !!total &&
          <div className={styles.ButtonBg}>
            <Button
              style={refund_bill_status == null ? { color: '#108ee9', borderColor: '#108ee9' } : {}}
              onClick={() => {
                if (
                  moment(apply_start_time).valueOf() > moment(apply_end_time).valueOf()
                  ||
                  moment(refund_start_time).valueOf() > moment(refund_end_time).valueOf()
                ) {
                  return message.warning(__('refund.list.submitTitle'));
                }
                return dispatch(search(assign({},
                  queryString,
                  {
                    pageNumber: 1,
                    refund_bill_status: null,
                  })));
              }}
            >
              {__('refund.list.submitName2')}
            </Button>
            <Button
              style={refund_bill_status == 1 ? { color: '#108ee9', borderColor: '#108ee9' } : {}}
              onClick={() => {
                if (
                  moment(apply_start_time).valueOf() > moment(apply_end_time).valueOf()
                  ||
                  moment(refund_start_time).valueOf() > moment(refund_end_time).valueOf()
                ) {
                  return message.warning(__('refund.list.submitTitle'));
                }
                return dispatch(search(assign({},
                  queryString,
                  {
                    pageNumber: 1,
                    refund_bill_status: '1',
                  })));
              }}
            >
              {__('refund.list.submitName3')}({waitTotal})
            </Button>
            <Button
              style={refund_bill_status == 4 ? { color: '#108ee9', borderColor: '#108ee9' } : {}}
              onClick={() => {
                if (
                  moment(apply_start_time).valueOf() > moment(apply_end_time).valueOf()
                  ||
                  moment(refund_start_time).valueOf() > moment(refund_end_time).valueOf()
                ) {
                  return message.warning(__('refund.list.submitTitle'));
                }
                return dispatch(search(assign({},
                  queryString,
                  {
                    pageNumber: 1,
                    refund_bill_status: '4',
                  })));
              }}
            >
              {__('refund.list.submitName4')}({rejectTotal})
            </Button>
          </div>
        }
      </div>
    );
  }
}
TabsHeader.propTypes = {
  dispatch: PropTypes.func,
  searchLoad: PropTypes.bool,
  queryString: PropTypes.shape(),
  fetchType: PropTypes.arrayOf(PropTypes.shape()),
  fetchStatus: PropTypes.arrayOf(PropTypes.shape()),
  fetchPath: PropTypes.arrayOf(PropTypes.shape()),
  fetchPathStatus: PropTypes.arrayOf(PropTypes.shape()),
  fetchSite: PropTypes.arrayOf(PropTypes.shape()), // 站点
  fetchCountry: PropTypes.arrayOf(PropTypes.shape()),  // 国家
  fetchMember: PropTypes.arrayOf(PropTypes.shape()),
  fetchRefund: PropTypes.arrayOf(PropTypes.shape()),
  waitTotal: PropTypes.number,
  rejectTotal: PropTypes.number,
  total: PropTypes.number,
};
export default TabsHeader;
