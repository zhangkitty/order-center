import React from 'react';
import { Modal, Select, Button, Popover, Table } from 'antd';
import { changeValue, copyPointRewardHandle } from './action';
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
const Mymodal4 = (props) => {
  const Option = Select.Option;
  const { dispatch, all_pointType, selectedRows4, all_siteFrom, all_country, all_COD_status, modalShow4, all_order_status, siteFrom4, country4, COD_status4, order_status4 } = props;
  return (
    <Modal
      visible={modalShow4}
      onCancel={() => dispatch(changeValue('modalShow4', false))}
      onOk={() => dispatch(copyPointRewardHandle(props))}
    >
      <article>
        <div className={styles.line}>
          <div className={styles.lineleft}>{lan.站点}</div>
          <Select
            className={styles.lineright}
            value={siteFrom4}
            onChange={value => dispatch(changeValue('siteFrom4', value))}
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
            value={country4}
            onChange={value => dispatch(changeValue('country4', value))}
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
            value={COD_status4}
            className={styles.lineright}
            onChange={value => dispatch(changeValue('COD_status4', value))}
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
            value={order_status4}
            onChange={value => dispatch(changeValue('order_status4', value))}
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
                rowSelection={{
                  type: 'checkbox',
                  onChange: (selectedRowKeys, selectedRows) => {
                    dispatch(changeValue('selectedRows4', selectedRows));
                  },
                }}
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

export default Mymodal4;
