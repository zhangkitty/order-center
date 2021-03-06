
import React, { Component, PropTypes } from 'react';
import { Select, Button, Table, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { pointRewardConfig, changeValue, pointRewardList, delPointReward } from './action';
import styles from './style.css';
import Page from '../publicComponent/pagination';
import Mymodal2 from './mymodal2';
import Mymodal3 from './mymodal3';
import Mymodal4 from './mymodal4';

const lan = {
  站点: '站点',
  国家: '国家',
  是否COD: '是否COD',
  订单状态: '订单状态',
  搜索: '搜索',
  新增: '新增',
  删除: '删除',
};

const x_arr = v => Array.isArray(v) ? v : [v];
class compensationPoints extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(pointRewardConfig());
  }


  render() {
    const Option = Select.Option;
    const { dataSource, total, page_number, listselectedRowKeys,
      all_COD_status, all_country, all_order_status, all_siteFrom, siteFrom1, dispatch, country1, COD_status1, order_status1 } = this.props;
    const columns = [
      {
        title: '站点',
        dataIndex: 'site_from',
        key: 'site_from',
      },
      {
        title: '国家',
        dataIndex: 'country_name',
        key: 'country_name',
      },
      {
        title: '是否COD',
        dataIndex: 'cod_name',
        key: 'cod_name',
      },
      {
        title: '订单状态',
        dataIndex: 'order_status_name',
        key: 'order_status_name',
      },
      {
        title: '赠送场景',
        dataIndex: 'point_name',
        key: 'point_name',
      },
      {
        title: '可操作项',
        render: (text, record) => (
          <div>
            <Button
              onClick={() => {
                dispatch(changeValue('id', record.id));
                dispatch(changeValue('modalShow3', true));
                dispatch(changeValue('COD_status3', +record.is_cod));
                dispatch(changeValue('country3', x_arr(record.country_id)));
                dispatch(changeValue('order_status3', +record.order_status));
                dispatch(changeValue('siteFrom3', x_arr(record.site_from)));
                dispatch(changeValue('selectedRowKeys3', x_arr(record.point_type_id)));
                dispatch(changeValue('selectedRows3', x_arr({ point_type_id: record.point_type_id, type_name: record.point_name })));
              }}
            >编辑</Button>
            <Button
              onClick={() => {
                dispatch(changeValue('modalShow4', true));
                dispatch(changeValue('COD_status4', +record.is_cod));
                dispatch(changeValue('country4', x_arr(record.country_id)));
                dispatch(changeValue('order_status4', +record.order_status));
                dispatch(changeValue('siteFrom4', x_arr(record.site_from)));
                dispatch(changeValue('selectedRowKeys4', x_arr(record.point_type_id)));
                dispatch(changeValue('selectedRows4', x_arr({ point_type_id: record.point_type_id, type_name: record.point_name })));
              }}
            >克隆</Button>
          </div>
          ),
      },

    ];


    const rowSelection = {
      selectedRowKeys: listselectedRowKeys,
      type: 'checkbox',
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch(changeValue('listselectedRowKeys', selectedRowKeys));
        dispatch(changeValue('listselectedRows', selectedRows));
      },
    };
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
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
              <Option value={null}>全部</Option>
              {
               all_COD_status.map((v, idx) => <Option value={++idx}>{v}</Option>)
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
              <Option value={null}>全部</Option>
              {
                all_order_status.map((v, idx) => <Option value={++idx}>{v}</Option>)
              }
            </Select>

            <Button
              className={styles.button}
              onClick={() => {
                dispatch(changeValue('page_number', 1));
                dispatch(pointRewardList(this.props, 1));
              }}
            >
              {lan.搜索}
            </Button>
            <Button
              className={styles.button}
              onClick={() => dispatch(changeValue('modalShow2', true))}
            >
              {lan.新增}
            </Button>
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => dispatch(delPointReward(this.props))}
            >
              <Button
                className={styles.button}
              >
                {lan.删除}
              </Button>
            </Popconfirm>

          </div>
        </article>
        <Table
          className={styles.table}
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
        />

        <Page
          total={total}
          onChange={(page, pageSize) => {
            dispatch(changeValue('page_number', page));
            dispatch(pointRewardList(this.props, page, pageSize));
            dispatch(changeValue('listselectedRowKeys', []));
          }}
          onShowSizeChange={(page, pageSize) => {
            dispatch(changeValue('page_size', pageSize));
            dispatch(pointRewardList(this.props, page, pageSize));
            dispatch(changeValue('listselectedRowKeys', []));
          }}
          current={page_number}
        />

        <Mymodal2 {...this.props} />
        <Mymodal3 {...this.props} />
        <Mymodal4 {...this.props} />
      </div>
    );
  }
}

compensationPoints.propTypes = {

};
const mapStateToProps = state => state['compensation-points'];
export default connect(mapStateToProps)(compensationPoints);
