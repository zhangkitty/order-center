/**
 * Created by yeyangmei on 16/9/13.
 */
import { LOCATION_CHANGE } from 'react-router-redux';

const menus = [
  {
    name: __('common.order_manage'),
    key: 'hello',
    icon: 'bars',
    children: [
      {
        link: '/order', // 订单列表
        name: __('common.order_list'),
        crumbName: __('common.order_list'),
        nav: true,
      }, {
        link: '/order/goodsRefund', // 商品退款
        name: __('common.goods_refunds'),
        crumbName: __('common.goods_refunds'),
        nav: true,
      }, {
        link: '/order/cancelGoods', // 取消商品
        name: __('common.choose_goods'),
        crumbName: __('common.choose_goods'),
        nav: true,
      }, {
        link: '/order/diffRefund', // 差价退款
        name: __('common.diff_refund'),
        crumbName: __('common.diff_refund'),
        nav: true,
      },
      {
        link: '/order/details/entry', // 订单详情
        name: __('nav.order_details'),
        crumbName: __('nav.order_details'),
        nav: true,
      },
      {
        link: '/order/details/edit-address', // 订单详情中的修改地址
        name: __('nav.order_details_edit_address'),
        crumbName: __('nav.order_details_edit_address'),
        nav: false,
      },
      {
        link: '/order/details/to-return-goods', // 订单详情-退货
        name: __('nav.order_details_to_return_goods'),
        crumbName: __('nav.order_details_to_return_goods'),
        nav: false,
      },
      {
        link: '/order/details/goods-control/list', // 品控
        name: __('nav.goods_control'),
        crumbName: __('nav.goods_control'),
        nav: false,
      },
      {
        link: '/order/details/goods-control/edit', // 品控编辑
        name: __('nav.goods_control_edit'),
        crumbName: __('nav.goods_control_edit'),
        nav: false,
      },
      {
        link: '/order/details/change-refund',  // 修改退款
        name: __('nav.change_refund'),
        crumbName: __('nav.change_refund'),
        nav: false,
      },
      {
        link: '/order/details/cash-refund',  // 提现退款
        name: __('nav.cash_refund'),
        crumbName: __('nav.cash_refund'),
        nav: false,
      },
      {
        link: '/refund', // 退款列表
        name: __('nav.refund'),
        crumbName: __('nav.refund'),
        nav: true,
      },
      {
        link: '/refund/details',  // 退款详情
        name: __('nav.refund_details'),
        crumbName: __('nav.refund_details'),
        nav: true,
      },
      {
        link: '/order-management',  // 平台订单管理
        name: __('nav.order_management'),
        crumbName: __('nav.order_management'),
        nav: true,
      },
      {
        link: '/returns', // 退货列表
        name: __('nav.returns'),
        crumbName: __('nav.returns'),
        nav: true,
      },
      {
        link: '/returns/details',  // 退货详情
        name: __('nav.returns_details'),
        crumbName: __('nav.returns_details'),
        nav: true,
      },
      {
        link: '/failedaddrorder',  // 平台订单管理
        name: __('nav.failedaddrorder'),
        crumbName: __('nav.failedaddrorder'),
        nav: true,
      },
      {
        link: '/order-export',  // 订单信息导出
        name: __('nav.order_export'),
        crumbName: __('nav.order_export'),
        nav: true,
      },
      {
        link: '/trackTroubles',  // 物流问题列表
        name: __('nav.tracktrouble'),
        crumbName: __('nav.tracktrouble'),
        nav: true,
      },
    ],
  },
];

const linkList = menus.reduce((concated, { children }) => (
  concated.concat(children)), []);

const defaultState = {
  current: '/',
  load: true,
  menus,
  linkList,
  expandable: 'expand',
  navs: {
    root_permission_list: [],
    sub_permission_list: [],
  },
  curPath: {},
  pathList: [],
};

const routerMatch = current => linkList
    .filter(({ link }) => (link === '/' || `${current}/`.startsWith(`${link}/`)))
    .sort((item1, item2) => item1.link.length > item2.link.length);


export default (state = defaultState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        current: action.payload.pathname,
        pathList: routerMatch(action.payload.pathname),
      });
    default:
      return state;
  }
};
