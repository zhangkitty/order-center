/**
 *  Create by shenjialin on 2017/11/21
 *  订单列表
 *  #44711 沈加林
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Button, Input, Modal, message, Icon, Spin, DatePicker, Select, Table } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import Pagination from '../../publicComponent/pagination';
import {
  commit, initSearch, searchList, deleteOrder, auditOrder,
  exportOrder, processOrder, recheckOrder, batchDelete, batchRecheck,
} from './action';

import styles from './style.css';

const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
const Option = Select.Option;

class Index extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(initSearch(this.props));
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
    };
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: __('failedaddrorder.list.billno'),
      dataIndex: 'billno',
      key: 'billno',
      render: (text, record) => <Link target="_blank" to={`order/list/${text}`}>{text}</Link>,
    }, {
      title: __('failedaddrorder.list.package_no'),
      dataIndex: 'package_no',
      key: 'package_no',
    }, {
    }, {
      title: __('failedaddrorder.list.ship_method'),
      dataIndex: 'ship_method',
      key: 'ship_method',
    }, {
      title: __('failedaddrorder.list.reason'),
      width: '20%',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: __('failedaddrorder.list.country_name'),
      dataIndex: 'country_name',
      key: 'country_name',
    }, {
      title: __('failedaddrorder.list.commit_user'),
      dataIndex: 'commit_user',
      key: 'commit_user',
    }, {
      title: __('failedaddrorder.list.commitTime'),
      dataIndex: 'add_time',
      key: 'add_time',
    }, {
      title: __('failedaddrorder.list.site_from'),
      dataIndex: 'site_from',
      key: 'site_from',
    }, {
      title: __('failedaddrorder.list.user_name'),
      dataIndex: 'user_name',
      key: 'user_name',
    }, {
      title: __('failedaddrorder.list.last_update_time'),
      dataIndex: 'last_update_time',
      key: 'last_update_time',
    }, {
      title: __('failedaddrorder.list.type'),
      dataIndex: 'type',
      key: 'type',
    }, {
      title: __('failedaddrorder.list.status'),
      dataIndex: 'status',
      key: 'status',
    }, {
      title: __('failedaddrorder.list.operation'),
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record, index) => (<div>
        <Link to={`/order/details/edit-address/${record.order_id}/${record.billno}`} target="_blank">{__('failedaddrorder.list.editAddr')}</Link>
        {record.button.recheck != 0 && (<Button style={{ marginLeft: '5px' }} onClick={() => this.showConfirm1({ id: record.order_id, myIndex: index })}>{__('failedaddrorder.list.recheck')}</Button>)}
        {record.button.is_del != 0 && (<Button style={{ marginLeft: '5px' }} onClick={() => this.showConfirm2({ id: record.id, myIndex: index })}>{__('failedaddrorder.list.delete')}</Button>)}
        {record.button.check != 0 && (<Button style={{ marginLeft: '5px' }} onClick={() => this.showConfirm3({ id: record.id, myIndex: index })}>{__('failedaddrorder.list.audited')}</Button>)}
        {record.button.process != 0 && (<Button style={{ marginLeft: '5px' }} onClick={() => this.showConfirm4({ id: record.id, myIndex: index })}>{__('failedaddrorder.list.processed')}</Button>)}
      </div>),
    }];
  }
  do1() {
    const that = this;
    if (this.state.selectedRowKeys.length == 0) {
      message.warning(`${__('failedaddrorder.list.text1')}`);
    } else {
      const temp2 = [];
      that.state.selectedRows.map((item) => {
        temp2.push(item.id);
      });
      confirm({
        title: __('failedaddrorder.list.text2'),
        okText: __('failedaddrorder.list.text3'),
        okType: 'danger',
        cancelText: __('failedaddrorder.list.text4'),
        onOk() {
          that.props.dispatch(batchDelete(temp2));
          that.setState({
            selectedRowKeys: [],
            selectedRows: [],
          });
        },
        onCancel() {
        },
      });
    }
  }
  do2() {
    const that = this;
    if (this.state.selectedRowKeys.length == 0) {
      message.warning(`${__('failedaddrorder.list.text1')}`);
    } else {
      const temp3 = [];
      that.state.selectedRows.map((item) => {
        temp3.push(item.order_id);
      });
      confirm({
        title: __('failedaddrorder.list.text5'),
        okText: __('failedaddrorder.list.text3'),
        okType: 'danger',
        cancelText: __('failedaddrorder.list.text4'),
        onOk() {
          that.props.dispatch(batchRecheck(temp3));
          that.setState({
            selectedRowKeys: [],
            selectedRows: [],
          });
        },
        onCancel() {
        },
      });
    }
  }
  do3() {
    const that = this;
    if (this.state.selectedRowKeys.length == 0) {
      message.warning(`${__('failedaddrorder.list.text1')}`);
    } else {
      const temp4 = [];
      that.state.selectedRows.map((item) => {
        temp4.push(item.id);
      });
      confirm({
        title: __('failedaddrorder.list.text6'),
        okText: __('failedaddrorder.list.text3'),
        okType: 'danger',
        cancelText: __('failedaddrorder.list.text4'),
        onOk() {
          that.props.dispatch(exportOrder(temp4));
          that.setState({
            selectedRowKeys: [],
            selectedRows: [],
          });
        },
        onCancel() {
        },
      });
    }
  }
  showConfirm1(param) {
    const that = this;
    confirm({
      title: __('failedaddrorder.list.text5'),
      okText: __('failedaddrorder.list.text3'),
      okType: 'danger',
      cancelText: __('failedaddrorder.list.text4'),
      onOk() {
        that.props.dispatch(recheckOrder(param));
      },
      onCancel() {
      },
    });
  }
  showConfirm2(param) {
    const that = this;
    confirm({
      title: __('failedaddrorder.list.text2'),
      okText: __('failedaddrorder.list.text3'),
      okType: 'danger',
      cancelText: __('failedaddrorder.list.text4'),
      onOk() {
        that.props.dispatch(deleteOrder(param));
      },
      onCancel() {
      },
    });
  }
  showConfirm3(param) {
    const that = this;
    confirm({
      title: __('failedaddrorder.list.text7'),
      okText: __('failedaddrorder.list.text3'),
      okType: 'danger',
      cancelText: __('failedaddrorder.list.text4'),
      onOk() {
        that.props.dispatch(auditOrder(param));
      },
      onCancel() {
      },
    });
  }
  showConfirm4(param) {
    const that = this;
    confirm({
      title: __('failedaddrorder.list.text8'),
      okText: __('failedaddrorder.list.text3'),
      okType: 'danger',
      cancelText: __('failedaddrorder.list.text4'),
      onOk() {
        that.props.dispatch(processOrder(param));
      },
      onCancel() {
      },
    });
  }
  render() {
    const {
      dispatch, queryString, loadding1, initData, dataList, total,
    } = this.props;
    const {
      billno, package_no, user_name, commitTime, current, page_size,
      status, site_from, ship_method, payment_method, type, is_delete,
    } = queryString;
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows,
        });
      },
    };
    return (
      <div className={styles.content}>
        <form
          className={styles.filterBg}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(commit('current', 1));
            const temp1 = commitTime.length == 0 ? '' : moment(commitTime[0]).format('YYYY-MM-DD HH:mm:ss');
            const temp2 = commitTime.length == 0 ? '' : moment(commitTime[1]).format('YYYY-MM-DD HH:mm:ss');
            this.props.dispatch(searchList(assign({},
              queryString,
              {
                commit_begin: temp1,
                commit_end: temp2,
                page_number: 1,
                page_size,
              })));
            this.setState({
              selectedRowKeys: [],
              selectedRows: [],
            });
          }}
        >

          <div className={styles.rowSpace}>
            {/* 订单号 */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('failedaddrorder.list.billno')}:</span>
              <Input
                className={styles.colSpace}
                value={billno}
                onChange={e => dispatch(commit('billno', e.target.value))}
              />
            </div>
            {/* 包裹号 */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('failedaddrorder.list.package_no')}:</span>
              <Input
                className={styles.colSpace}
                value={package_no}
                onChange={e => dispatch(commit('package_no', e.target.value))}
              />
            </div>
            {/* 提交人 */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('failedaddrorder.list.user_name')}:</span>
              <Input
                className={styles.colSpace}
                value={user_name}
                onChange={e => dispatch(commit('user_name', e.target.value))}
              />
            </div>
            {/* 状态 */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('failedaddrorder.list.status')}:</span>
              <Select
                allowClear
                className={styles.colSpace}
                style={{ width: '150px', marginRight: '10px' }}
                value={status}
                onChange={val => dispatch(commit('status', val))}
              >
                {
                  initData.status.map(item => (
                    <Option key={item.id} value={item.id} > {item.name}</Option>
                  ))
                }
              </Select>
            </div>
            {/* 站点来源 */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('failedaddrorder.list.site_from')}:</span>
              <Select
                allowClear
                className={styles.colSpace}
                style={{ width: '150px', marginRight: '10px' }}
                value={site_from}
                onChange={val => dispatch(commit('site_from', val))}
              >
                {
                  initData.site_from.map(item => (
                    <Option key={item.id} value={item.id} > {item.name}</Option>
                  ))
                }
              </Select>
            </div>
            {/* 渠道 */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('failedaddrorder.list.ship_method')}:</span>
              <Input
                className={styles.colSpace}
                value={ship_method}
                onChange={e => dispatch(commit('ship_method', e.target.value))}
              />
            </div>
            {/* 类型 */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('failedaddrorder.list.type')}:</span>
              <Select
                allowClear
                className={styles.colSpace}
                style={{ width: '150px', marginRight: '10px' }}
                value={type}
                onChange={val => dispatch(commit('type', val))}
              >
                {
                  initData.type.map(item => (
                    <Option key={item.id} value={item.id} > {item.name}</Option>
                  ))
                }
              </Select>
            </div>
            {/* 是否COD */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('failedaddrorder.list.payment_method')}:</span>
              <Select
                allowClear
                className={styles.colSpace}
                style={{ width: '150px', marginRight: '10px' }}
                value={payment_method}
                onChange={val => dispatch(commit('payment_method', val))}
              >
                {
                  initData.payment_method.map(item => (
                    <Option key={item.id} value={item.id} > {item.name}</Option>
                  ))
                }
              </Select>
            </div>
            {/* 删除标记 */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('failedaddrorder.list.is_delete')}:</span>
              <Select
                allowClear
                className={styles.colSpace}
                style={{ width: '150px', marginRight: '10px' }}
                value={is_delete}
                onChange={val => dispatch(commit('is_delete', val))}
              >
                {
                  initData.is_delete.map(item => (
                    <Option key={item.id} value={item.id} > {item.name}</Option>
                  ))
                }
              </Select>
            </div>
            {/* 提交时间 */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('failedaddrorder.list.commitTime')}:</span>
              <RangePicker
                style={{ width: '350px' }}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')],
                }}
                format="YYYY-MM-DD HH:mm:ss"
                value={commitTime}
                onChange={(value, dateString) => {
                  dispatch(commit('commitTime', value));
                }}
              />
            </div>
            <div className={styles.rowSpaceList}>
              <Button
                size="small"
                style={{ marginLeft: '5px' }}
                onClick={() => this.do1()}
              >
                {__('failedaddrorder.list.piliangdelete')}
              </Button>
              <Button
                size="small"
                style={{ marginLeft: '5px' }}
                onClick={() => this.do2()}
              >
                {__('failedaddrorder.list.piliangrecheck')}
              </Button>
              <Button
                size="small"
                style={{ marginLeft: '5px' }}
                onClick={() => this.do3()}
              >
                {__('failedaddrorder.list.piliangdaochu')}
              </Button>
              <Button
                style={{ marginLeft: '60px' }}
                type="primary"
                icon="search"
                loading={loadding1}
                htmlType={'submit'}
              >
                {__('failedaddrorder.list.search')}
              </Button>
            </div>
          </div>
        </form>
        <div style={{ padding: '0px 20px 20px 10px' }}>
          <Table
            className={styles.operatingTable}
            rowKey={(text, record, index) => index}
            rowSelection={rowSelection}
            dataSource={dataList}
            loading={loadding1}
            columns={this.columns}
           // size="small"
            pagination={false}
            scroll={{ y: 600, x: 1900 }}
          />
          <Pagination
            total={parseInt(total, 10)}
            current={current}
            onChange={
              (pageNumber, pageSize) => {
                dispatch(commit('current', pageNumber));
                const temp1 = commitTime.length == 0 ? '' : moment(commitTime[0]).format('YYYY-MM-DD HH:mm:ss');
                const temp2 = commitTime.length == 0 ? '' : moment(commitTime[1]).format('YYYY-MM-DD HH:mm:ss');
                this.props.dispatch(searchList(assign({},
                  queryString,
                  {
                    commit_begin: temp1,
                    commit_end: temp2,
                    page_number: pageNumber,
                    page_size: pageSize,
                  })));
                this.setState({
                  selectedRowKeys: [],
                  selectedRows: [],
                });
              }
            }
            onShowSizeChange={
              (pageNumber, pageSize) => {
                dispatch(commit('current', pageNumber));
                dispatch(commit('page_size', pageSize));
                const temp1 = commitTime.length == 0 ? '' : moment(commitTime[0]).format('YYYY-MM-DD HH:mm:ss');
                const temp2 = commitTime.length == 0 ? '' : moment(commitTime[1]).format('YYYY-MM-DD HH:mm:ss');
                this.props.dispatch(searchList(assign({},
                  queryString,
                  {
                    commit_begin: temp1,
                    commit_end: temp2,
                    page_number: pageNumber,
                    page_size: pageSize,
                  })));
                this.setState({
                  selectedRowKeys: [],
                  selectedRows: [],
                });
              }
            }
          />
        </div>

      </div>
    );
  }
}
Index.propTypes = {
  dispatch: PropTypes.func,
  loadding1: PropTypes.bool,
  total: PropTypes.number,
  dataList: PropTypes.arrayOf(PropTypes.shape()),
  queryString: PropTypes.shape(),
  initData: PropTypes.shape(),
};

const mapStateToProps = state => state['failedaddrorder/list'];
export default connect(mapStateToProps)(Index);
