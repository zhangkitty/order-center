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
        link: '/order',
        name: __('common.order_list'),
        crumbName: __('common.order_list'),
        nav: true,
      }, {
        link: '/order/goodsRefund',
        name: __('common.goods_refunds'),
        crumbName: __('common.goods_refunds'),
        nav: true,
      }, {
        link: '/order/cancelGoods',
        name: __('common.choose_goods'),
        crumbName: __('common.choose_goods'),
        nav: true,
      }, {
        link: '/order/diffRefund',
        name: __('common.diff_refund'),
        crumbName: __('common.diff_refund'),
        nav: true,
      },
      {
        link: '/order/details/modify-diff-refund',
        name: __('common.modifyDiffRefund'),
        crumbName: __('common.modifyDiffRefund'),
        nav: true,
      },
      {
        link: '/order/details/modify-goods-refund',
        name: __('common.modifyDiffRefund'),
        crumbName: __('common.modifyDiffRefund'),
        nav: true,
      },
      {
        link: '/order/details/entry',
        name: __('nav.order_details'),
        crumbName: __('nav.order_details'),
        nav: true,
      },
      {
        link: '/order/details/edit-address',
        name: __('nav.order_details_edit_address'),
        crumbName: __('nav.order_details_edit_address'),
        nav: false,
      },
      {
        link: '/order/details/to-return-goods',
        name: __('nav.order_details_to_return_goods'),
        crumbName: __('nav.order_details_to_return_goods'),
        nav: false,
      },
      {
        link: '/order/details/goods-control/list',
        name: __('nav.goods_control'),
        crumbName: __('nav.goods_control'),
        nav: false,
      },
      {
        link: '/order/details/goods-control/edit',
        name: __('nav.goods_control_edit'),
        crumbName: __('nav.goods_control_edit'),
        nav: false,
      },
      {
        link: '/refund',
        name: __('nav.refund'),
        crumbName: __('nav.refund'),
        nav: true,
      },
      {
        link: '/refund/details',
        name: __('nav.refund_details'),
        crumbName: __('nav.refund_details'),
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
