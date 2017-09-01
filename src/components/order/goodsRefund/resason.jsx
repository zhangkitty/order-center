import React from 'react';
import { Radio, Tag } from 'antd';
import style from './style.css';

const RG = Radio.Group;
const data = [
  {
    name: '支付购买',
    children: [
      {
        id: 2,
        name: '重复支付',
      },
      {
        id: 75,
        name: '订单变更',
      },
      {
        id: 76,
        name: '优惠折扣',
      },
      {
        id: 77,
        name: '不想买了',
      },
      {
        id: 23,
        name: '未授权',
      },
    ],
  },
  {
    name: '订单仓储',
    children: [
      {
        id: 9,
        name: '产品无货',
      },
      {
        id: 5,
        name: '备货太久',
      },
      {
        id: 78,
        name: '备货超15天',
      },
      {
        id: 66,
        name: '出仓逾期',
      },
      {
        id: 31,
        name: '数量短缺',
      },
    ],
  },
  {
    name: '物流运输',
    children: [
      {
        id: 79,
        name: '运输太久',
      },
      {
        id: 7,
        name: '收取关税',
      },
      {
        id: 80,
        name: '地址不发',
      },
      {
        id: 81,
        name: '未妥投丢件',
      },
      {
        id: 62,
        name: '销毁',
      },
      {
        id: 73,
        name: '不可抗力',
      },
      {
        id: 82,
        name: '物流运费',
      },
      {
        id: 83,
        name: '妥投未收到',
      },
      {
        id: 46,
        name: '未妥投退回',
      },
    ],
  },
  {
    name: '商品补偿',
    children: [
      {
        id: 44,
        name: '描述不符',
      },
      {
        id: 34,
        name: '工艺问题',
      },
      {
        id: 84,
        name: '不喜欢',
      },
      {
        id: 14,
        name: '不合适',
      },
      {
        id: 85,
        name: '尺码偏大',
      },
      {
        id: 86,
        name: '尺码偏小',
      },
      {
        id: 87,
        name: '尺码描述不符',
      },
      {
        id: 10,
        name: '材质',
      },
      {
        id: 30,
        name: '色差',
      },
      {
        id: 16,
        name: '破损',
      },
      {
        id: 40,
        name: '异味',
      },
      {
        id: 41,
        name: '发霉',
      },
      {
        id: 29,
        name: '污渍',
      },
      {
        id: 95,
        name: '发错',
      },
      {
        id: 88,
        name: '配饰漏发',
      },
    ],
  },
  {
    name: '商品退回',
    children: [
      {
        id: 55,
        name: '描述不符退回',
      },
      {
        id: 56,
        name: '工艺问题退回',
      },
      {
        id: 89,
        name: '不喜欢退回',
      },
      {
        id: 54,
        name: '不合适退回',
      },
      {
        id: 90,
        name: '尺码偏大退回',
      },
      {
        id: 91,
        name: '尺码偏小退回',
      },
      {
        id: 92,
        name: '尺码描述不符退回',
      },
      {
        id: 51,
        name: '材质退回',
      },
      {
        id: 52,
        name: '色差退回',
      },
      {
        id: 57,
        name: '破损退回',
      },
      {
        id: 58,
        name: '异味退回',
      },
      {
        id: 59,
        name: '发霉退回',
      },
      {
        id: 60,
        name: '污渍退回',
      },
      {
        id: 45,
        name: '发错退回',
      },
      {
        id: 93,
        name: '配饰漏发退回',
      },
    ],
  },
  {
    name: '其他类型',
    children: [
      {
        id: 35,
        name: '测试订单',
      },
      {
        id: 94,
        name: '过期问题件',
      },
    ],
  },
];
const Reason = () => (
  <div className={style.reason}>
    <span className={style.descWidth}>{__('order.goodsRefund.cancel_goods_reason')}</span>
    <div>
      <RG style={{ display: 'flex' }}>
        {
          data.map(v => (
            <div key={v.name} className={style.reasonitem}>
              <Tag color="#919191" style={{ textAlign: 'center' }}>{v.name}</Tag>
              {
                v.children.map(d => (
                  <Radio value={d.id} key={d.id}>{d.name}</Radio>
                ))
              }
            </div>
          ))
        }
      </RG>
    </div>
  </div>
);

export default Reason;

