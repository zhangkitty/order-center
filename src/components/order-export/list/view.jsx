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
      dispatch, dataSource, queryString, load, searchLoad, showType,
    } = this.props;
    const {
      export_content, export_method, param,
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
              return message.warning('缺少必填字段');
            }
            return dispatch(exportSubmit(queryString));
          }}
        >
          <div className={styles.rowSpace}>

            <div className={styles.rowSpaceList}>
              <span className={styles.filterName}>{Star}导出内容</span>
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
              <span className={styles.filterName}>{Star}导出方式</span>
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
              <span className={styles.filterName}>{Star}{__('returns.list.refund_number')}</span>
              <Input
                className={styles.colSpace}
                placeholder="请输入单个包裹号"
                value={param}
                onChange={e => dispatch(commit('param', e.target.value))}
              />
            </div>

            <div className={styles.rowSpaceList}>
              <span className={styles.filterName} />
              <Button
                className={styles.filterButton}
                type="primary"
                loading={searchLoad}
                htmlType={'submit'}
              >
                导出
              </Button>
            </div>
          </div>
        </form>

        {console.log(dataSource, 'dataSource')}

        {
          showType === 'worldpay' &&
            <div>worldpay worldpay</div>
        }
        {
          showType === 'paypal' &&
          <div>paypal  paypal</div>
        }

      </div>
    );
  }
}
returnsList.propTypes = {
  dispatch: PropTypes.func,
  load: PropTypes.bool,
  searchLoad: PropTypes.bool,
  showType: PropTypes.string,
  dataSource: PropTypes.shape(),
  fetchContent: PropTypes.arrayOf(PropTypes.shape()),
  fetchMethod: PropTypes.arrayOf(PropTypes.shape()),
  queryString: PropTypes.shape(),
};

const mapStateToProps = state => state['order-export/list'];
export default connect(mapStateToProps)(returnsList);
