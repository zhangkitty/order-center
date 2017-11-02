/**
 *  Create by liufeng on 2017/9/05
 *  订单列表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Button, Input, Modal, message, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import Pagination from '../../publicComponent/pagination';
import {
  search, searchHigh, searchHistory,
  change, commit, commit2, commitHistory, init, remarkSave,
} from './action';
import TabsHeader from './tabsHeader';
import SingleRow from './singleRow';
import ChnageGoods from './changeGoods';
import MarkTag from './markTag';

import styles from './style.css';

class orderList extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(init());
    const { params: { billno } } = props;
    if (billno) {
      this.props.dispatch(commit('billno', billno));
    }
  }
  componentDidMount(props) {
    this.props.dispatch(search(assign({},
      this.props.queryString,
      {
        billno: this.props.params.billno,
        pageNumber: 1,
        paytimeStart: this.props.queryString.paytimeStart,
        paytimeEnd: this.props.queryString.paytimeEnd,
      })));
  }
  render() {
    const {
      dispatch, dataSource, total, queryString, queryString2, queryString3, visible,
      loadUpdata, searchType, remarkModal, searchLoad,
    } = this.props;

    const pageCurrent = () => {
      if (Number(searchType) === 0) {
        return queryString.pageNumber;
      } else if (Number(searchType) === 1) {
        return queryString2.pageNumber;
      }
      return queryString3.pageNumber;
    };
    return (
      <div className={styles.content}>
        {/*  搜索  */}
        <TabsHeader {...this.props} />

        {/*  列表  */}
        <Spin spinning={searchLoad}>
          <div className={styles.table_bg}>
            {
              dataSource
                .map((v, i) => <SingleRow data={v} index={i} key={v.order_id} {...this.props} />)
            }
            {
              Number(total) === 0 ? <div style={{ textAlign: 'center', color: 'rgba(0,0,0, .8)' }}><Icon type="frown-o" /> {__('common.contentTitle')}</div> : null
            }
          </div>
        </Spin>
        {/* 备注提交 */}
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
                value={remarkModal.remark}
                onChange={e => dispatch(change('remarkModal', assign({}, remarkModal, { remark: e.target.value })))}
              />
            </div>
            <Button
              key="submit"
              type="primary"
              loading={loadUpdata}
              onClick={() => {
                if (remarkModal.remark.trim().length === 0) {
                  return message.warning(__('common.order_operation9'));
                }
                return dispatch(remarkSave(remarkModal.order_id, remarkModal.remark));
              }}
              style={{ marginRight: '20px' }}
            >
              {__('common.order_operation7')}
            </Button>
            <Button key="back" onClick={() => dispatch(change('visible', false))}>
              {__('common.order_operation8')}
            </Button>
          </div>
        </Modal>
        {/* 换货 */}
        <ChnageGoods {...this.props} />
        {/* 订单标记 */}
        <MarkTag {...this.props} />
        <Pagination
          total={total}
          current={pageCurrent()}
          onChange={
            (pageNumber, pageSize) => {
              if (Number(searchType) === 0) {
                dispatch(commit('pageNumber', pageNumber));
                dispatch(commit('pageSize', pageSize));
                dispatch(search(assign({}, queryString, { pageNumber, pageSize })));
              } else if (Number(searchType) === 1) {
                dispatch(commit2('pageNumber', pageNumber));
                dispatch(commit2('pageSize', pageSize));
                dispatch(searchHigh(assign({}, queryString2, { pageNumber, pageSize })));
              } else {
                dispatch(commitHistory('pageNumber', pageNumber));
                dispatch(commitHistory('pageSize', pageSize));
                dispatch(searchHistory(assign({}, queryString3, { pageNumber, pageSize })));
              }
            }
          }
          onShowSizeChange={
            (pageNumber, pageSize) => {
              if (Number(searchType) === 0) {
                dispatch(commit('pageNumber', pageNumber));
                dispatch(commit('pageSize', pageSize));
                dispatch(search(assign({}, queryString, { pageNumber, pageSize })));
              } else if (Number(searchType) === 1) {
                dispatch(commit2('pageNumber', pageNumber));
                dispatch(commit2('pageSize', pageSize));
                dispatch(searchHigh(assign({}, queryString2, { pageNumber, pageSize })));
              } else {
                dispatch(commitHistory('pageNumber', pageNumber));
                dispatch(commitHistory('pageSize', pageSize));
                dispatch(searchHistory(assign({}, queryString3, { pageNumber, pageSize })));
              }
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
  queryString2: PropTypes.shape(),
  queryString3: PropTypes.shape(),
  location: PropTypes.shape(),
  remark: PropTypes.string,
  searchType: PropTypes.number,
  remarkModal: PropTypes.shape(),
};

const mapStateToProps = state => state['order/list'];
export default connect(mapStateToProps)(orderList);
