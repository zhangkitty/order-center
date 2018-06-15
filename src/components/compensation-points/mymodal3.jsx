import React from 'react';
import { Modal, Select, Button, Popover, Table } from 'antd';
import { changeValue, editPointRewardHandle } from './action';
import styles from './style.css';


const lan = {
  站点: '站点',
  国家: '国家',
  是否COD: '是否COD',
  订单状态: '订单状态',
  搜索: '搜索',
  新增: '新增',
  删除: '删除',
  选择赠送场景: '选择赠送场景',
};
const Mymodal3 = (props) => {
  const Option = Select.Option;
  const { dispatch, all_pointType, selectedRows3, selectedRowKeys3, all_siteFrom, all_country, all_COD_status, modalShow3, all_order_status, siteFrom3, country3, COD_status3, order_status3 } = props;
  return (
    <Modal
      visible={modalShow3}
      onCancel={() => dispatch(changeValue('modalShow3', false))}
      onOk={() => dispatch(editPointRewardHandle(props))}
    >
      <article>
        <div className={styles.line}>
          <div className={styles.lineleft}>{lan.站点}</div>
          <Select
            className={styles.lineright}
            value={siteFrom3.toLocaleString() === 'all' ? undefined : siteFrom3}
            onChange={value => dispatch(changeValue('siteFrom3', value))}
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
            value={country3.toLocaleString() === 'all' ? undefined : country3}
            onChange={value => dispatch(changeValue('country3', value))}
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
            value={COD_status3 || null}
            className={styles.lineright}
            onChange={value => dispatch(changeValue('COD_status3', value))}
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
            value={order_status3 || null}
            onChange={value => dispatch(changeValue('order_status3', value))}
          >
            <Option value={null}>全部</Option>
            {
              all_order_status.map((v, idx) => <Option value={++idx}>{v}</Option>)
            }
          </Select>

        </div>

        <div className={styles.line}>
          <div className={styles.lineleft} />
          <Popover
            trigger="click"
            content={(
              <Table
                // pagination={{
                //   onChange: () => dispatch(changeValue('selectedRowKeys3', [])),
                // }}
                rowSelection={{
                  selectedRowKeys: selectedRowKeys3,
                  type: 'checkbox',
                  onChange: (selectedRowKeys, selectedRows) => {
                    dispatch(changeValue('selectedRowKeys3', selectedRowKeys));
                    dispatch(changeValue('selectedRows3', selectedRows));
                  },
                }}
                rowKey="point_type_id"
                dataSource={all_pointType}
                columns={
                [
                  {
                    title: '积分ID',
                    dataIndex: 'point_type_id',
                    key: 'point_type_id',
                  }, {
                    title: '赠送场景',
                    dataIndex: 'type_name',
                    key: 'type_name',
                  },
                ]}
              />
              )}

          >
            <Button
              className={styles.lineright}
            >
              {lan.选择赠送场景}
            </Button>
          </Popover>


        </div>

      </article>

    </Modal>
  );
};

export default Mymodal3;
