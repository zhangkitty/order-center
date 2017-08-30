/**
 *  Create by liufeng on 2017/8/30
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import Pagination from '../../publicComponent/pagination';
import { search, change, commit, init } from './action';
import TabsHeader from './tabsHeader';
import SingleRow from './singleRow';

import styles from './style.css';


class orderList extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(init());
  }
  render() {
    const { dispatch, dataSource, total, queryString } = this.props;
    return (
      <div className={styles.content}>
        {/*  搜索  */}
        <TabsHeader {...this.props} />

        {/*  列表  */}
        <div className={styles.table_bg}>
          {
            dataSource.map((v, i) => <SingleRow data={v} index={i} key={v.order_id} />)
          }
        </div>
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
};

const mapStateToProps = state => state['order/list'];
export default connect(mapStateToProps)(orderList);
