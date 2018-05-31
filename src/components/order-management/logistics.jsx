import React from 'react';
import { Select, Input, Button, Table, Popover, message } from 'antd';
import styles from './style.css';
import { change, getListLogisticChannel, changePage, add, edit, delLogisticChannel } from './action';
import Page from '../publicComponent/pagination';
import Add from './add';
import Edit from './edit';

const lan = {
  平台: '平台',
  是否自定义: '是否自定义',
  自发物流渠道: '自发物流渠道',
  平台物流渠道: '平台物流渠道',
  全部: '全部',
  搜索: '搜索',
  新增: '新增',
  删除: '删除',
};


const logistics = (props) => {
  const Option = Select.Option;
  const {
    allPlatForm,
    isCustomize,
    dispatch,
    choosePlatForm,
    chooseIsCustomize,
    Logistics1,
    Logistics2,
    logistic_channel_list,
    totalItem,
    currentPage,
    selectedRows,
    popVisiable,
    selectedRowKeys,
  } = props;
  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys,
    onChange: (selectedRowKeys1, selectedRows1) => {
      dispatch(change('selectedRows', selectedRows1));
      dispatch(change('selectedRowKeys', selectedRowKeys1));
    },
  };
  const columns = [
    {
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: '是否自定义',
      dataIndex: 'support_custom',
      key: 'support_custom',
      render: (text) => {
        const temp = {
          0: '否',
          1: '是',
        };
        return temp[text];
      },
    },
    {
      title: '自发物流渠道',
      dataIndex: 'custom_channel',
      key: 'custom_channel',
    },
    {
      title: '平台物流渠道',
      dataIndex: 'platform_channel',
      key: 'platform_channel',
    },
    {
      title: '追踪网址',
      dataIndex: 'tracking_website',
      key: 'tracking_website',
    },
    {
      title: '配置时间',
      dataIndex: 'last_update_time',
      key: 'last_update_time',
    },
    {
      title: '配置人',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (<Button
        value={text}
        size="small"
        onClick={(e) => {
          dispatch(edit(e.target.value, props));
        }}
      >编辑
        </Button>),
    },

  ];


  return (
    <div>
      <section className={styles.line}>
        <div className={styles.divinline}>{lan.平台}</div>
        <Select
          className={styles.allPlatForm}
          value={choosePlatForm}
          onChange={value => dispatch(change('choosePlatForm', value))}
        >
          <Option value="">{lan.全部}</Option>
          {
            allPlatForm.map(v =>
              <Option value={v}>{v}</Option>,
            )
          }
        </Select>
        <div className={styles.divinline}>{lan.是否自定义}</div>
        <Select
          className={styles.allPlatForm}
          value={chooseIsCustomize}
          onChange={value => dispatch(change('chooseIsCustomize', value))}
        >
          <Option value="">{lan.全部}</Option>
          {
            isCustomize.map(v =>
              <Option value={v}>{v}</Option>,
            )
          }
        </Select>
        <div className={styles.divinline}>{lan.自发物流渠道}</div>
        <Input
          className={styles.allPlatForm}
          value={Logistics1}
          onChange={e => dispatch(change('Logistics1', e.target.value))}
        />
        <div className={styles.divinline}>{lan.平台物流渠道}</div>
        <Input
          className={styles.allPlatForm}
          value={Logistics2}
          onChange={e => dispatch(change('Logistics2', e.target.value))}
        />
      </section>


      <section className={styles.threeButtons}>
        <Popover
          visiable={popVisiable}
          trigger="click"
          content={
            <div>
              <span>是否确认删除</span>
              <div className={styles.Popover}>
                <Button
                  size="small" style={{ marginLeft: 2 }}
                  onClick={
                    () => {
                      if (selectedRows.length === 0) {
                        return message.info('没有选择任何项');
                      }
                      return dispatch(delLogisticChannel(props));
                    }
                  }
                >
                是
                </Button>
              </div>
            </div>
          }
        >
          <Button
            className={styles.button}
            size="small"
          >
            {lan.删除}
          </Button>
        </Popover>
        <Button
          className={styles.button}
          size="small"
          onClick={() => dispatch(add(props))}
        >
          {lan.新增}
        </Button>
        <Button
          className={styles.button}
          size="small"
          onClick={() => dispatch(getListLogisticChannel(props))}
        >
          {lan.搜索}
        </Button>
      </section>
      <Table
        dataSource={logistic_channel_list}
        columns={columns}
        pagination={false}
        rowSelection={rowSelection}
      />

      <Page
        total={totalItem}
        current={currentPage}
        onChange={(page, pageSize) => dispatch(changePage(page, pageSize, props))}
        onShowSizeChange={(page, pageSize) => dispatch(changePage(page, pageSize, props))}
      />

      <Add {...props} />
      <Edit {...props} />
    </div>
  );
};

export default logistics;
