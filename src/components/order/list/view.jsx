/**
 *  Create by liufeng on 2017/8/30
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Button, Input, Modal, message } from 'antd';
import { connect } from 'react-redux';
import Pagination from '../../publicComponent/pagination';
import { search, change, commit, init, remarkSave } from './action';
import TabsHeader from './tabsHeader';
import SingleRow from './singleRow';

import styles from './style.css';


class orderList extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(init());
  }
  render() {
    const {
      dispatch, dataSource, total, queryString, visible, remark, loadUpdata,
    } = this.props;
    return (
      <div className={styles.content}>
        {/*  搜索  */}
        <TabsHeader {...this.props} />

        {/*  列表  */}
        <div className={styles.table_bg}>

          {
            dataSource
              .map((v, i) => <SingleRow data={v} index={i} key={v.order_id} {...this.props} />)
          }
        </div>
        <Modal
          visible={visible}
          onCancel={() => dispatch(change('visible', false))}
          footer={null}
        >
          <div style={{ margin: '30px 50px 15px' }}>
            <div>{__('common.order_operation6')}
              <Input.TextArea
                style={{ margin: '10px auto' }}
                rows={3}
                value={remark}
                onChange={e => dispatch(change('remark', e.target.value))}
              />
            </div>
            <Button
              key="submit"
              type="primary"
              loading={loadUpdata}
              onClick={() => {
                if (remark.trim().length === 0) {
                  return message.warning(__('common.order_operation9'));
                }
                return dispatch(remarkSave(5693173, remark));
              }}
                 // dataSource.order_id
              style={{ marginRight: '20px' }}
            >
              {__('common.order_operation7')}
            </Button>
            <Button key="back" onClick={() => dispatch(change('visible', false))}>
              {__('common.order_operation8')}
            </Button>
          </div>
        </Modal>
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
  visible: PropTypes.bool,
  loadUpdata: PropTypes.bool,
  total: PropTypes.number,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  queryString: PropTypes.shape(),
  location: PropTypes.shape(),
  remark: PropTypes.string,
};

const mapStateToProps = state => state['order/list'];
export default connect(mapStateToProps)(orderList);
