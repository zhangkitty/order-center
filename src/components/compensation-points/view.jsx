
import React, { Component, PropTypes } from 'react';
import { Select, Button, Table } from 'antd';
import { connect } from 'react-redux';
import { pointRewardConfig, changeValue, pointRewardList } from './action';
import styles from './style.css';
import Page from '../publicComponent/pagination';

const lan = {
  站点: '站点',
  国家: '国家',
  是否COD: '是否COD',
  订单状态: '订单状态',
  搜索: '搜索',
  新增: '新增',
  删除: '删除',
};
class compensationPoints extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(pointRewardConfig());
  }


  render() {
    const columns = [
      {
        title: '站点',
        dataIndex: 'site_name',
        key: 'site_name',
      },
      {
        title: '国家',
        dataIndex: 'country_name',
        key: 'country_name',
      },
      {
        title: '是否COD',
        dataIndex: 'is_cod',
        key: 'is_cod',
      },
      {
        title: '订单状态',
        dataIndex: 'order_status',
        key: 'order_status',
      },
      {
        title: '赠送场景',
        dataIndex: 'point_name',
        key: 'point_name',
      },
      {
        title: '可操作项',
      },

    ];
    const Option = Select.Option;
    const { dataSource, total, page_number,
      all_COD_status, all_country, all_order_status, all_siteFrom, siteFrom1, dispatch, country1, COD_status1, order_status1 } = this.props;
    return (
      <div>
        <article>
          <div className={styles.line}>
            <div className={styles.lineleft}>{lan.站点}</div>
            <Select
              className={styles.lineright}
              value={siteFrom1}
              onChange={value => dispatch(changeValue('siteFrom1', value))}
              mode="multiple"
            >
              {
             all_siteFrom.map(v => <Option value={v.id}>{v.name}</Option>)
             }
            </Select>
          </div>
          <div className={styles.line}>
            <div className={styles.lineleft}>{lan.国家}</div>
            <Select
              className={styles.lineright}
              value={country1}
              onChange={value => dispatch(changeValue('country1', value))}
              mode="multiple"
            >
              {
             all_country.map(v => <Option value={v.id}>{v.country}</Option>)
             }
            </Select>
          </div>
          <div className={styles.line}>
            <div className={styles.lineleft}>{lan.是否COD}</div>
            <Select
              allowClear
              value={COD_status1}
              className={styles.lineright}
              onChange={value => dispatch(changeValue('COD_status1', value))}
            >
              {
               all_COD_status.map((v, idx) => <Option value={idx++}>{v}</Option>)
              }

            </Select>
          </div>
          <div className={styles.line}>
            <div className={styles.lineleft}>{lan.订单状态}</div>
            <Select
              allowClear
              className={styles.lineright}
              value={order_status1}
              onChange={value => dispatch(changeValue('order_status1', value))}
            >
              {
                all_order_status.map((v, idx) => <Option value={idx++}>{v}</Option>)
              }
            </Select>

            <Button
              className={styles.button}
              onClick={() => dispatch(pointRewardList(this.props))}
            >
              {lan.搜索}
            </Button>
            <Button
              className={styles.button}
            >
              {lan.新增}
            </Button>
            <Button
              className={styles.button}
            >
              {lan.删除}
            </Button>
          </div>
        </article>
        <Table
          className={styles.table}
          pagination={false}
          dataSource={dataSource}
          columns={columns}
        />

        <Page
          total={total}
          onChange={(page, pageSize) => {
            dispatch(changeValue('page_number', page));
            dispatch(pointRewardList(this.props, page, pageSize));
          }}
          onShowSizeChange={(page, pageSize) => {
            dispatch(changeValue('page_size', pageSize));
            dispatch(pointRewardList(this.props, page, pageSize));
          }}
          current={page_number}
        />
      </div>
    );
  }
}

compensationPoints.propTypes = {

};
const mapStateToProps = state => state['compensation-points'];
export default connect(mapStateToProps)(compensationPoints);
