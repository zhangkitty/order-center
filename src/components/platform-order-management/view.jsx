import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import Logistics from './logistics';
import { getListPlatForm } from './action';
import LogView from './logview';

const lan = {
  日志下载: '日志下载',
  物流渠道配置: '物流渠道配置',
};
class PlatformOrderManagement extends Component {
  constructor(props) {
    super(props);
    props.dispatch(getListPlatForm());
  }

  render() {
    const TabPane = Tabs.TabPane;
    return (
      <div>
        <Tabs defaultActiveKey="1" >
          <TabPane tab={lan.日志下载} key="1">
            <LogView {...this.props} />
          </TabPane>
          <TabPane tab={lan.物流渠道配置} key="2">
            <Logistics {...this.props} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => state['platform-order-management'];
export default connect(mapStateToProps)(PlatformOrderManagement);
