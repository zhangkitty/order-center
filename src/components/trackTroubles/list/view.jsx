import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import assign from 'object-assign';
import { Collapse } from 'antd';
import { getFilters, getData, filterCommit, commit, getStatusAll } from './action';
import Filters from './filters';
import Tableview from './tableView';
import Modals from './modals';
import Pagination from '../../publicComponent/pagination';
import style from './style.css';
import EditModal from './editModal';

// TODO: lan
const lan = {
  header: '物流问题列表',
  pendingNum: '待处理',
  followingNum: '跟进中',
  processedNum: '已处理',
  invalidFollowingNum: '无效跟进',
};
const pageChange = (filter, pageNumber, pageSize, dispatch) => {
  const query = assign({}, filter, {
    pageNumber,
    pageSize,
  });
  dispatch(commit('filter', query));
  dispatch(getData(query));
};
class TrackTroublesList extends Component {
  constructor(props) {
    super(props);
    props.dispatch(getFilters());
    props.dispatch(getStatusAll());
    if (props.params.pkg) {
      props.dispatch(filterCommit('reference_number', props.params.pkg));
      props.dispatch(getData(assign({}, props.filter, { reference_number: props.params.pkg })));
    } else {
      props.dispatch(getData(props.filter));
    }
  }
  render() {
    const { count, dispatch, filter, pendingNum, followingNum, processedNum, invalidFollowingNum } = this.props;
    return (
      <div style={{ padding: '25px' }}>
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={lan.header} key="1">
            <Filters {...this.props} />
          </Collapse.Panel>
        </Collapse>
        <div style={{ textAlign: 'right', padding: '5px', margin: '5px' }}>
          <span className={style.tipAll}>{lan.pendingNum}({pendingNum})</span>
          <span className={style.tipAll}>{lan.followingNum}({followingNum})</span>
          <span className={style.tipAll}>{lan.processedNum}({processedNum})</span>
          <span className={style.tipAll}>{lan.invalidFollowingNum}({invalidFollowingNum})</span>
        </div>
        <div style={{ margin: '5px 0 15px 0' }}>
          <Tableview {...this.props} />
        </div>
        <Pagination
          total={+count}
          current={filter.pageNumber}
          onChange={(pageNumber, pageSize) => pageChange(filter, pageNumber, pageSize, dispatch)}
          onShowSizeChange={(pageNumber, pageSize) =>
            pageChange(filter, pageNumber, pageSize, dispatch)}
        />
        <Modals {...this.props} />
        <EditModal {...this.props} />
      </div>
    );
  }
}

TrackTroublesList.propTypes = {
  dispatch: PropTypes.func,
  count: PropTypes.string,
  pendingNum: PropTypes.string,
  followingNum: PropTypes.string,
  processedNum: PropTypes.string,
  invalidFollowingNum: PropTypes.string,
  params: PropTypes.shape(),
  filter: PropTypes.shape(),
};
const mapStateToProps = state => state['trackTroubles/list'];
export default connect(mapStateToProps)(TrackTroublesList);
