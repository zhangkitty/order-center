/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Button, DatePicker, Select, message, Input } from 'antd';
import Pagination from '../../publicComponent/pagination';
import ThousandsPoints from '../../publicComponent/thousandsPoints';
import SKURemote from '../../publicComponent/SKURemote';
import { search, exportAll, change, commit, initType, initWarehouse, init } from './action';
import SingleRow from './singleRow';

import styles from './style.css';

const Option = Select.Option;

class orderList extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    // dispatch(init());
    props.dispatch(initType());
    props.dispatch(initWarehouse());
  //   const { query } = props.location;    // 仓库+分类收发存汇总表带的数据
  //   if (Object.keys(query).length) {
  //     props.dispatch(change('queryString', assign({}, props.queryString, query)));
  //     props.dispatch(search(assign({},
  //       query,
  //       {
  //         pageNumber: 1,
  //       })));
  //   }
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
      dispatch, dataSource, fetchType, fetchWarehouse,
      load, total, queryString, searchLoad,
    } = this.props;
    const {
      warehouseId, categoryFirst, checkDateBegin, checkDateEnd, goodsSn,
      billno, orderId, shippingNo, referenceNumber, telephone, email, paytimeStart, paytimeEnd,
    } = queryString;
    return (
      <div className={styles.content}>
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
              <span className={styles.filterName}><span style={{ color: 'red' }}>*</span>{__('order.name.paytime')}</span>
              <div className={styles.colSpace2}>
                <DatePicker
                  style={{ width: '130px' }}
                  allowClear={false}
                  showTime
                  format="YYYY-MM-DD HH:mm:SS"
                  value={moment(paytimeStart, 'YYYY-MM-DD HH:mm:SS')}
                  onChange={(value, str) => dispatch(commit('paytimeStart', str))}
                />
                &nbsp; - &nbsp;
                <DatePicker
                  style={{ width: '130px' }}
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
        {
          dataSource.map((v, i) => <SingleRow data={v} index={i} key={v.a} />)
        }
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
