import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import assign from 'object-assign';
import { Collapse } from 'antd';
import { getFilters, getData, filterCommit } from './action';
import Filters from './filters';

// TODO: lan
const lan = {
  header: '物流问题列表',
};
class TrackTroublesList extends Component {
  constructor(props) {
    super(props);
    props.dispatch(getFilters());
    if (props.params.pkg) {
      props.dispatch(filterCommit('reference_number', props.params.pkg));
      props.dispatch(getData(assign({}, props.filter, { reference_number: props.params.pkg })));
    } else {
      props.dispatch(getData(props.filter));
    }
  }
  render() {
    return (
      <div >
        <Collapse defaultActiveKey={['1']} >
          <Collapse.Panel header={lan.header} key="1">
            <Filters {...this.props} />
          </Collapse.Panel>
        </Collapse>

      </div>
    );
  }
}

TrackTroublesList.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.shape(),
  filter: PropTypes.shape(),
};
const mapStateToProps = state => state['trackTroubles/list'];
export default connect(mapStateToProps)(TrackTroublesList);
