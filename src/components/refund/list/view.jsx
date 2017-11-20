/**
 *  Create by liufeng on 2017/9/25
 *  退款列表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Table, message } from 'antd';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import Pagination from '../../publicComponent/pagination';
import { search, commit, init } from './action';
import TabsHeader from './tabsHeader';

import styles from './style.css';


class refundList extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(init());
  }
  render() {
    const {
      dispatch, dataSource, total, queryString, searchLoad,
    } = this.props;
    return (
      <div className={styles.content}>
        {/*  搜索  */}
        <TabsHeader {...this.props} />

        {/*  列表  */}
        <div className={styles.table_bg}>
          <Table
            rowKey="record_id"
            bordered
            loading={searchLoad}
            pagination={false}
            dataSource={dataSource}
            onChange={() => {
              if (
                moment(queryString.apply_start_time).valueOf() > moment(queryString.apply_end_time).valueOf()
                ||
                moment(queryString.refund_start_time).valueOf() > moment(queryString.refund_end_time).valueOf()
              ) {
                return message.warning(__('refund.list.submitTitle'));
              }
              return dispatch(search(assign({},
                queryString,
                {
                  sorting_rule: queryString.sorting_rule === 0 ? 1 : 0,
                })));
            }}
            columns={[{
              title: __('refund.list.refund_number'),
              dataIndex: 'refund_bill_id',
              width: '60px',
              render: (text, record) => {
                const obj = {
                  children: text,
                  props: {
                    rowSpan: record.rowSpan,
                  },
                };
                return obj;
              },
            }, {
              title: __('refund.list.order_number'),
              dataIndex: 'billno',
              width: '100px',
            }, {
              title: __('refund.list.site'),
              dataIndex: 'site_from',
              width: '60px',
            }, {
              title: __('refund.list.country'),
              dataIndex: 'country',
              width: '80px',
            }, {
              title: __('refund.list.refund_type'), // 退款类型
              dataIndex: 'refund_type_name',
              width: '80px',
            }, {
              title: __('refund.list.email'),
              dataIndex: 'email',
              width: '150px',
            }, {
              title: __('refund.list.refund_path'),
              dataIndex: 'refund_path_name', // 退款路径
              width: '60px',
            }, {
              title: __('refund.list.content'), // 退金额
              dataIndex: 'refund_record_amount',
              width: '100px',
              render: text => (
                <div>
                  { text.price_usd.amount_with_symbol }
                  {
                    text.price_with_exchange_rate ?
                      <span style={{ marginLeft: '5px' }}>{ text.price_with_exchange_rate.amount_with_symbol }</span>
                      : null
                  }
                </div>
              ),
            }, {
              title: __('refund.list.path_status'), // 退款记录状态
              dataIndex: 'refund_record_status_msg',
              width: '60px',
            }, {
              title: __('refund.list.bill_status'),
              dataIndex: 'refund_bill_status_msg',
              width: '60px',
            }, {
              title: __('refund.list.applicant'),
              dataIndex: 'add_user',
              width: '80px',
            }, {
              title: __('refund.list.apply_time'), // 退款申请日期
              dataIndex: 'refund_bill_add_time',
              sorter: true,
              width: '130px',
            }, {
              title: __('refund.list.operator'),
              dataIndex: 'handle_user',
              width: '80px',
            }, {
              title: __('refund.list.refund_time'), // 退款日期
              dataIndex: 'refund_time',
              width: '130px',
            }, {
              title: __('refund.list.operate'),
              width: '80px',
              render: (text, record) => {
                const obj = {
                  children: <Link to={`/refund/details/${record.refund_bill_id}/${record.billno}`} target="_blank">{ __('refund.list.operate1') }</Link>,
                  props: {
                    rowSpan: record.rowSpan,
                  },
                };
                return obj;
              },
            }]}
          />
        </div>
        <Pagination
          total={total}
          current={queryString.pageNumber}
          onChange={
            (pageNumber, pageSize) => {
              dispatch(commit('pageNumber', pageNumber));
              dispatch(commit('pageSize', pageSize));
              dispatch(search(assign({}, queryString, { pageNumber, pageSize })));
            }
          }
          onShowSizeChange={
            (pageNumber, pageSize) => {
              dispatch(commit('pageNumber', pageNumber));
              dispatch(commit('pageSize', pageSize));
              dispatch(search(assign({}, queryString, { pageNumber, pageSize })));
            }
          }
        />
      </div>
    );
  }
}
refundList.propTypes = {
  dispatch: PropTypes.func,
  load: PropTypes.bool,
  searchLoad: PropTypes.bool,
  total: PropTypes.number,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  queryString: PropTypes.shape(),
  location: PropTypes.shape(),
};

const mapStateToProps = state => state['refund/list'];
export default connect(mapStateToProps)(refundList);
