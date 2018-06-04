import React from 'react';
import { Modal, Select, Button, Popover, Table } from 'antd';
import { changeValue, addPointRewardHandle } from './action';
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
const Mymodal2 = (props) => {
  const Option = Select.Option;
  const { dispatch, all_pointType, selectedRowKeys2, selectedRows2, all_siteFrom, all_country, all_COD_status, modalShow2, all_order_status, siteFrom2, country2, COD_status2, order_status2 } = props;
  return (
    <Modal
      visible={modalShow2}
      onCancel={() => dispatch(changeValue('modalShow2', false))}
      onOk={() => dispatch(addPointRewardHandle(props))}
    >
      <article>
        <div className={styles.line}>
          <div className={styles.lineleft}>{lan.站点}</div>
          <Select
            className={styles.lineright}
            value={siteFrom2}
            onChange={value => dispatch(changeValue('siteFrom2', value))}
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
            value={country2}
            onChange={value => dispatch(changeValue('country2', value))}
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
            value={COD_status2}
            className={styles.lineright}
            onChange={value => dispatch(changeValue('COD_status2', value))}
          >
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
            value={order_status2}
            onChange={value => dispatch(changeValue('order_status2', value))}
          >
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
                //   onChange: () => dispatch(changeValue('selectedRowKeys2', [])),
                // }}
                rowSelection={{
                  type: 'checkbox',
                  selectedRowKeys: selectedRowKeys2,
                  onChange: (selectedRowKeys, selectedRows) => {
                    console.log(selectedRowKeys, selectedRows);
                    dispatch(changeValue('selectedRows2', selectedRows));
                    dispatch(changeValue('selectedRowKeys2', selectedRowKeys));
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

export default Mymodal2;
