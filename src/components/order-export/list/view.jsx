/**
 *  Create by liufeng on 2017/12/14
 *  订单信息导出
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { exportSubmit, commit, init, initCountry } from './action';
import styles from './style.css';

const Star = (<span style={{ color: 'red' }}>*</span>);
const Option = Select.Option;

class returnsList extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(init());
    props.dispatch(initCountry());
  }
  render() {
    const {
      fetchContent, fetchMethod,
      dispatch, dataSource, queryString, exportLoad,
    } = this.props;
    const {
      export_content, export_method, param, enter_amount,
    } = queryString;
    return (
      <div className={styles.content}>
        <form
          className={styles.filterBg}
          onSubmit={(e) => {
            e.preventDefault();
            if (
              !param || param.trim().length < 1
            ) {
              return message.warning(__('order-export.submitTitle')); // 缺少必填字段
            }
            return dispatch(exportSubmit(queryString));
          }}
        >
          <div className={styles.rowSpace}>

            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{Star}{__('order-export.exportContent')}</span>
              <Select
               // allowClear
                className={styles.colSpace}
                value={export_content}
                onChange={val => dispatch(commit('export_content', val))}
              >
                {
                  fetchContent.map(item => (
                    <Option key={item.id} > {item.name}</Option>
                  ))
                }
              </Select>
            </div>

            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{Star}{__('order-export.exportContent1')}</span>
              <Select
                className={styles.colSpace}
                value={export_method}
                onChange={val => dispatch(commit('export_method', val))}
              >
                {
                  fetchMethod.map(item => (
                    <Option key={item.id} > {item.name}</Option>
                  ))
                }
              </Select>
            </div>
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{Star}{__('order-export.exportContent2')}</span>
              <Input
                className={styles.colSpace}
                placeholder={__('order-export.submitTitle2')}
                value={param}
                onChange={e => dispatch(commit('param', e.target.value))}
              />
            </div>
            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>发票金额</span>
              <Input
                className={styles.colSpace}
                style={{ width: '120px' }}
                placeholder="请输入发票金额"
                value={enter_amount}
                onChange={e => {
                  if (e.target.value && e.target.value.trim().length > 11) {
                    return false;
                  }
                  return dispatch(commit('enter_amount', e.target.value));
                }}
              />
            </div>

            <div className={styles.rowSpaceList}>
              <span className={styles.filterName} />
              <Button
                className={styles.filterButton}
                type="primary"
                loading={exportLoad}
                htmlType={'submit'}
              >
                {__('order-export.export')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
returnsList.propTypes = {
  dispatch: PropTypes.func,
  exportLoad: PropTypes.bool,
  dataSource: PropTypes.shape(),
  fetchContent: PropTypes.arrayOf(PropTypes.shape()),
  fetchMethod: PropTypes.arrayOf(PropTypes.shape()),
  queryString: PropTypes.shape(),
};

const mapStateToProps = state => state['order-export/list'];
export default connect(mapStateToProps)(returnsList);
