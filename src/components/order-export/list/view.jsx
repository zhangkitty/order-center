/**
 *  Create by liufeng on 2017/12/14
 *  订单信息导出
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Select, Input, Button, message, Icon } from 'antd';
import { connect } from 'react-redux';
import { search, commit, init } from './action';
import styles from './style.css';

const Option = Select.Option;

class returnsList extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(init());
  }
  render() {
    const {
      fetchReturn, fetchTrouble,
      dispatch, dataSource, queryString, load, searchLoad,
    } = this.props;
    const {
      return_order_status, trouble_state, return_order_id,
    } = queryString;
    return (
      <div className={styles.content}>
        <form
          className={styles.filterBg}
          onSubmit={(e) => {
            e.preventDefault();
            if (
              !return_order_id || return_order_id.trim().length < 1
            ) {
              return message.warning('缺少必填字段');
            }
            return dispatch(queryString);
          }}
        >
          <div className={styles.rowSpace}>


            {/* 退货单状态 */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('returns.list.returns_status')}</span>
              <Select
                allowClear
                className={styles.colSpace}
                value={return_order_status}
                onChange={val => dispatch(commit('return_order_status', val))}
              >
                {
                  fetchReturn.map(item => (
                    <Option key={item.id} > {item.name}</Option>
                  ))
                }
              </Select>
            </div>

            {/* 问题件 */}
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('returns.list.trouble')}</span>
              <Select
                className={styles.colSpace}
                value={trouble_state}
                onChange={val => dispatch(commit('trouble_state', val))}
              >
                {
                  fetchTrouble.map(item => (
                    <Option key={item.id} > {item.name}</Option>
                  ))
                }
              </Select>
            </div>
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{__('returns.list.refund_number')}</span>
              <Input
                className={styles.colSpace}
                value={return_order_id}
                onChange={e => dispatch(commit('return_order_id', e.target.value))}
              />
            </div>


            <Button
              className={styles.filterButton}
              type="primary"
              icon="search"
              loading={searchLoad}
              htmlType={'submit'}
            >
              {__('returns.list.export')}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
returnsList.propTypes = {
  dispatch: PropTypes.func,
  load: PropTypes.bool,
  searchLoad: PropTypes.bool,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  fetchReturn: PropTypes.arrayOf(PropTypes.shape()),
  fetchTrouble: PropTypes.arrayOf(PropTypes.shape()),
  queryString: PropTypes.shape(),
};

const mapStateToProps = state => state['order-export/list'];
export default connect(mapStateToProps)(returnsList);
