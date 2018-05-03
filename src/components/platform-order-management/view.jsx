import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import Logistics from './logistics';
import { getListPlatForm } from './action';


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
        <Tabs defaultActiveKey="2" >
          <TabPane tab={lan.日志下载} key="1">
          Content of Tab Pane 1
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
