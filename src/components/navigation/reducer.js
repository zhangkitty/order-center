/**
 * Created by yeyangmei on 16/9/13.
 */
import { LOCATION_CHANGE } from 'react-router-redux';
import assign from 'object-assign';

const menus = [
  {
    name: __('common.order_manage'),
    key: 'hello',
    icon: 'bars',
    children: [
      {
        link: '/hello',
        name: __('nav.hello'),
        crumbName: __('nav.helloCrumb'),
        nav: true,
      }, {
        link: '/order',
        name: __('common.order_list'),
        crumbName: __('common.order_list'),
        nav: true,
      }, {
        link: '/order/goodsRefunds',
        name: __('common.goods_refunds'),
        crumbName: __('common.goods_refunds'),
        nav: true,
      }, {
        link: '/order/chooseGoods',
        name: __('common.choose_goods'),
        crumbName: __('common.choose_goods'),
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
    sub_permission_list: []
  },
  curPath: {},
  pathList: [],
};

const routerMatch = (current) => {
  return linkList
    .filter(({ link }) => (link === '/' || `${current}/`.startsWith(`${link}/`)))
    .sort((item1, item2) => item1.link.length > item2.link.length);
};


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
