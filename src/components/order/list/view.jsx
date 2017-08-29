/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Button, DatePicker, Select, message } from 'antd';
import Pagination from '../../publicComponent/pagination';
import ThousandsPoints from '../../publicComponent/thousandsPoints';
import SKURemote from '../../publicComponent/SKURemote';
import { search, exportAll, change, commit, initType, initWarehouse, init } from './action';

import styles from './style.css';

const Option = Select.Option;

class orderList extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(init());
    props.dispatch(initType());
    props.dispatch(initWarehouse());
    const { query } = props.location;    // 仓库+分类收发存汇总表带的数据
    if (Object.keys(query).length) {
      props.dispatch(change('queryString', assign({}, props.queryString, query)));
      props.dispatch(search(assign({},
        query,
        {
          pageNumber: 1,
        })));
    }
  }

  // time control
  disabledDate(current) {
    const { checkDateBegin } = this.props.queryString;
    return (
      (current && current.valueOf() < moment(checkDateBegin).valueOf())
      ||
      (current.valueOf() > moment(checkDateBegin).endOf('month').valueOf())
    );
  }

  render() {
    const {
      dispatch, dataSource, fetchType, fetchWarehouse,
      load, total, queryString, searchLoad,
    } = this.props;
    const {
      warehouseId, categoryFirst, checkDateBegin, checkDateEnd, goodsSn,
    } = queryString;
    return (
      <div className={styles.content}>
        <form
          className={styles.filterBg}
          onSubmit={(e) => {
            e.preventDefault();
            if (!warehouseId) {
              return message.warning('缺少仓库');
            } else if (!categoryFirst) {
              return message.warning('缺少分类');
            } else if (!checkDateBegin || !checkDateEnd) {
              return message.warning('缺少时间');
            } else if (moment(checkDateBegin).format('YYYY-MM') !== moment(checkDateEnd).format('YYYY-MM')) {
              return message.warning('不支持跨月查询');
            } else if (
              !moment(checkDateEnd).isAfter(checkDateBegin)
              && !moment(checkDateEnd).isSame(checkDateBegin)
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
              <span className={styles.filterName}><span style={{ color: 'red' }}>*</span>仓库</span>
              <Select
                className={styles.colSpace}
                value={warehouseId}
                onChange={val => dispatch(commit('warehouseId', val))}
              >
                {
                  fetchWarehouse.map(item => (
                    <Option key={item.warehouseId} > {item.warehouseName}</Option>
                  ))
                }
              </Select>
            </div>
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}><span style={{ color: 'red' }}>*</span>分类</span>
              <Select
                className={styles.colSpace}
                value={categoryFirst}
                onChange={val => dispatch(commit('categoryFirst', val))}
              >
                {
                  fetchType.map(item => (<Option key={item.id} > {item.name}</Option>))
                }
              </Select>
            </div>
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>货料SKU</span>
              <div className={styles.colSpace}>
                <SKURemote
                  value={`${goodsSn || ''}`}
                  onChange={value => (value ? dispatch(commit('goodsSn', value.goodsSn)) : '')}
                />
              </div>
            </div>
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}><span style={{ color: 'red' }}>*</span>时间</span>
              <div className={styles.colSpace2}>
                <DatePicker
                  style={{ width: '130px' }}
                  allowClear={false}
                  format="YYYY-MM-DD"
                  value={moment(checkDateBegin, 'YYYY-MM-DD')}
                  onChange={(value, str) => dispatch(commit('checkDateBegin', str))}
                />
                &nbsp; - &nbsp;
                <DatePicker
                  style={{ width: '130px' }}
                  allowClear={false}
                  disabledDate={cur => this.disabledDate(cur)}
                  format="YYYY-MM-DD"
                  value={moment(checkDateEnd, 'YYYY-MM-DD')}
                  onChange={(value, str) => dispatch(commit('checkDateEnd', str))}
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
            查询</Button>
        </form>

        <Table
          rowKey="key"
          bordered
          pagination={false}
          loading={load}
          dataSource={dataSource}
          columns={
          [{
            title: '仓库',
            dataIndex: 'warehouseName',
          }, {
            title: '货料分类',
            dataIndex: 'categoryFirstName',
          }, {
            title: '货料SKU',
            dataIndex: 'goodsSn',
          }, {
            title: '期初数量',
            dataIndex: 'openingNum',
            render: data => ThousandsPoints(data),
          }, {
            title: '期初金额',
            dataIndex: 'openingMoney',
            render: data => ThousandsPoints(data),
          }, {
            title: '入库数量',
            dataIndex: 'instoreNum',
            render: data => ThousandsPoints(data),
          }, {
            title: '入库金额',
            dataIndex: 'instoreMoney',
            render: data => ThousandsPoints(data),
          }, {
            title: '出库数量',
            dataIndex: 'outstoreNum',
            render: data => ThousandsPoints(data),
          }, {
            title: '出库金额',
            dataIndex: 'outstoreMoney',
            render: data => ThousandsPoints(data),
          }, {
            title: '结存数量',
            dataIndex: 'endingNum',
            render: data => ThousandsPoints(data),
          }, {
            title: '结存金额',
            dataIndex: 'endingMoney',
            render: data => ThousandsPoints(data),
          }]
          }
        />
        <Pagination
          total={total}
          current={queryString.pageNumber}
          onChange={
            (pageNumber, pageSize) => {
              dispatch(commit('pageNumber', pageNumber));
              dispatch(commit('pageSize', pageSize));
              return dispatch(search(assign({}, queryString, { pageNumber, pageSize })));
            }
          }
          onShowSizeChange={
            (pageNumber, pageSize) => {
              dispatch(commit('pageNumber', pageNumber));
              dispatch(commit('pageSize', pageSize));
              return dispatch(search(assign({}, queryString, { pageNumber, pageSize })));
            }
          }
        />

        { total === 0 ?
          null :
          <Button
            type="primary"
            icon="export"
            loading={searchLoad}
            onClick={() => {
              if (!warehouseId) {
                return message.warning('缺少仓库');
              } else if (!categoryFirst) {
                return message.warning('缺少分类');
              } else if (!checkDateBegin || !checkDateEnd) {
                return message.warning('缺少时间');
              } else if (moment(checkDateBegin).format('YYYY-MM') !== moment(checkDateEnd).format('YYYY-MM')) {
                return message.warning('不支持跨月查询');
              } else if (
                !moment(checkDateEnd).isAfter(checkDateBegin)
                && !moment(checkDateEnd).isSame(checkDateBegin)
              ) {
                return message.warning('结束时间必须大于开始时间');
              }
              return dispatch(exportAll(queryString));
            }}
          >
            数据导出</Button>
        }
      </div>
    );
  }
}
orderList.propTypes = {
  dispatch: PropTypes.func,
  load: PropTypes.bool,
  searchLoad: PropTypes.bool,
  total: PropTypes.number,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  queryString: PropTypes.shape(),
  location: PropTypes.shape(),
  fetchType: PropTypes.arrayOf(PropTypes.shape()),
  fetchWarehouse: PropTypes.arrayOf(PropTypes.shape()),
};

const mapStateToProps = state => state['order/list'];
export default connect(mapStateToProps)(orderList);
