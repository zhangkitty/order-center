/**
 *  Create by liufeng on 2017/8/30
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Button, Input, Modal, message, Icon, Spin, Table } from 'antd';
import { connect } from 'react-redux';
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
            rowKey="order_goods_id"
            pagination={false}
            dataSource={dataSource}
            columns={[{
              title: '退款编号',
              dataIndex: 'refund_bill_id',
              width: '80px',
            }, {
              title: '商品图片',
              dataIndex: 'order_goods_img',
              width: '100px',
            }, {
              title: '商品属性',
              dataIndex: 'goods_sn',
            }, {
              title: '价格',
              dataIndex: 'price',
              width: '15%',
            }, {
              title: '退款单状态',
              dataIndex: 'refund_bill_status',
              width: '15%',
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
