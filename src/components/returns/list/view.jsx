/**
 *  Create by liufeng on 2017/11/14
 *  退货列表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Table, message } from 'antd';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import Pagination from '../../publicComponent/pagination';
import { search, commit, init } from './action';
import TabsHeader from './tabsHeader';
import styles from './style.css';


class returnsList extends Component {
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
           // bordered
            loading={searchLoad}
            pagination={false}
            dataSource={dataSource}
            onChange={() => {
              if (
                moment(queryString.start_time).valueOf() > moment(queryString.end_time).valueOf()
              ) {
                return message.warning(__('returns.list.submitTitle'));
              }
              return dispatch(search(assign({},
                queryString,
                {
                  start_time: moment(queryString.start_time).format('YYYY-MM-DD HH:mm:ss'),
                  end_time: moment(queryString.end_time).format('YYYY-MM-DD HH:mm:ss'),
                  sort_order: queryString.sort_order === 0 ? 1 : 0,
                })));
            }}
            columns={[{
              title: __('returns.list.refund_number'),
              dataIndex: 'return_order_id',
              width: '60px',
            }, {
              title: __('returns.list.order_number'),
              dataIndex: 'order_no',
              width: '120px',
            }, {
              title: __('refund.list.site'),
              dataIndex: 'source_site',
              width: '60px',
            }, {
              title: __('refund.list.country'),
              dataIndex: 'receiver_country',
              width: '80px',
            }, {
              title: __('refund.list.email'),
              dataIndex: 'email',
              width: '150px',
            }, {
              title: __('returns.list.is_cod'),
              dataIndex: 'iscod',
              width: '70px',
            }, {
              title: __('returns.list.insurance'), // 退货险
              dataIndex: 'insurance',
              width: '50px',
            }, {
              title: __('returns.list.trouble'),
              dataIndex: 'trouble_status',
              width: '50px',
            }, {
              title: __('returns.list.return_label_type'),
              dataIndex: 'return_label_type', // 运单类型
              width: '60px',
            }, {
              title: __('returns.list.logistics'), // 物流渠道
              dataIndex: 'shipping_type',
              width: '60px',
            }, {
              title: __('returns.list.tracking'), // 运单号
              dataIndex: 'tracking_no',
              width: '100px',
              render: (text, record) => (
                <a href={record.tracking_no_url} target="_blank">{text}</a>
              ),
            }, {
              title: __('returns.list.warehouse'),
              dataIndex: 'warehouse',
              width: '60px',
            }, {
              title: __('returns.list.shipping_status'), // 包裹状态
              dataIndex: 'shipping_status',
              width: '70px',
            }, {
              title: __('returns.list.shipping_time'), // 包裹更新时间
              dataIndex: 'tracking_time',
              width: '130px',
            }, {
              title: __('returns.list.returns_status'),  // 退货单状态
              dataIndex: 'state',
              width: '70px',
            }, {
              title: __('returns.list.last_time'), // 操作时间
              dataIndex: 'last_time',
              width: '130px',
              sorter: true,
            }, {
              title: __('returns.list.refund_status'), // 退款状态
              dataIndex: 'refund_status',
              width: '70px',
            }, {
              title: __('returns.list.refund_time'), // 退款时间
              dataIndex: 'refund_time',
              width: '130px',
            }, {
              title: __('returns.list.order_type'), // 退货单类型
              dataIndex: 'order_type',
              width: '130px',
            }, {
              title: __('refund.list.operate'),
              width: '80px',
              render: (text, record) => (
                <Link to={`/returns/details/${record.return_order_id}`} target="_blank">{ __('refund.list.operate1') }</Link>
                ),
            }]}
          />
        </div>
        <Pagination
          total={total}
          current={queryString.page_number}
          onChange={
            (page_number, page_size) => {
              dispatch(commit('page_number', page_number));
              dispatch(commit('pageSize', page_size));
              dispatch(search(assign({}, queryString, { page_number, page_size })));
            }
          }
          onShowSizeChange={
            (page_number, page_size) => {
              dispatch(commit('page_number', page_size));
              dispatch(commit('page_size', page_size));
              dispatch(search(assign({}, queryString, { page_number, page_size })));
            }
          }
        />
      </div>
    );
  }
}
returnsList.propTypes = {
  dispatch: PropTypes.func,
  load: PropTypes.bool,
  searchLoad: PropTypes.bool,
  total: PropTypes.number,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  queryString: PropTypes.shape(),
  location: PropTypes.shape(),
};

const mapStateToProps = state => state['returns/list'];
export default connect(mapStateToProps)(returnsList);