import { Menu, Icon, Popconfirm, Button } from 'antd';
import React from 'react';
import assign from 'object-assign';
import { Link } from 'react-router';
import styles from './style.css';
// import {
//   getPermission,
// } from '../../lib/permission';

const SubMenu = Menu.SubMenu;
const Sider = ({
  linkList,
  dispatch,
  current,
  navs: {
    root_permission_list,
    sub_permission_list,
  },
}) => (
  <div className={styles.menu}>
    <Menu
      selectedKeys={[current]}
      mode="vertical" theme="dark"
    >{
      root_permission_list.map(({ name: pName, permission: pPermission, id }) => (
        sub_permission_list.find(({ parent_id: parentId }) => parentId === id) ?
          <SubMenu
            key={id}
            title={
              <span>
                <Icon type={pPermission} className={styles.LevelIcon} />
                <span className={styles.Level1}>{pName}</span>
              </span>
            }
          >
            {
              sub_permission_list
                .filter(({ parent_id: parentId }) => parentId === id)
                .map(({ name, permission }) =>
                  assign({}, linkList.find(({ link }) => link === permission), { name }))
                .map((prop, i) => (
                  <Menu.Item
                    key={`${prop.link}-${i}`}
                    className={styles.menu2}
                  >
                    <Link to={prop.link} className={styles.Level2}>
                      <Icon type={prop.icon} className={styles.LevelIcon} />
                      {prop.name}
                    </Link>
                  </Menu.Item>
                ))
            }
          </SubMenu>
          : null
      ))
    }
    </Menu>
    <div className={styles.menubtn}>
      <a
        href={`index.html${location.hash}`}
        className={styles.language}
      >中</a>
      <a
        href={`en.html${location.hash}`}
        className={styles.language}
      >En</a>
    </div>
  </div>
);

Sider.propTypes = {
  current: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  linkList: React.PropTypes.arrayOf(React.PropTypes.shape()),
  navs: React.PropTypes.shape(),
};
export default Sider;

