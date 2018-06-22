
import React, { Component, PropTypes } from 'react';
import { Button, Table } from 'antd';

import { connect } from 'react-redux';
import { orderReturnLabelQueryAll } from './action';

const lan = {
  添加RL模板: '添加RL模板',
  添加RAN模板: '添加RAN模板',
  添加前端文案: '添加前端文案',
};

class copywritingConfig extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(orderReturnLabelQueryAll());
  }


  render() {
    const { dataSource } = this.props;
    const columns = [
      {
        title: '编号',
      },
      {
        title: '文案类型',
      },
      {
        title: '物流渠道',
      },
      {
        title: '仓库',
      },
      {
        title: '更新时间',
      },
      {
        title: '详细列表',
      },
      {
        title: '开启状态',
      },
      {
        title: '操作',
      },
    ];
    return (
      <div>
        <div>
          <Button>{lan.添加RL模板}</Button>
          <Button>{lan.添加RAN模板}</Button>
          <Button>{lan.添加前端文案}</Button>
        </div>

        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>

      </div>
    );
  }
}

copywritingConfig.propTypes = {

};
const mapStateToProps = state => state['copywriting-config'];
export default connect(mapStateToProps)(copywritingConfig);
