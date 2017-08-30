import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Spin } from 'antd';

import Sider from './sider.jsx';
import styles from './style.css';

class Navigation extends Component {
  render() {
    const {
      linkList, children, current, menus, expandable,
      dispatch, navs, pathList,
    } = this.props;
    const routerMatchList = linkList.filter(
      ({ link }) => (link === '/' || `${current}/`.startsWith(`${link}/`)))
      .sort((item1, item2) => item1.link.length > item2.link.length);
    document.title = [...routerMatchList].reverse()[0]
      ?
      [...routerMatchList].reverse()[0].crumbName : '';
    const crumbList = pathList.map((v, i) => (
      <div className={styles.bread_crumbs_bg}>
        <Link
          key={v.link}
          style={i === pathList.length - 1 ? { color: '#d9d9d9' } : { color: '#919191' }}
          className={styles.tabActive}
          to={v.link}
        >{v.crumbName}</Link>
        <div className={styles.menubtn}>
          <a
            href={'index.html' + location.hash }
            className={styles.language}
          >中</a>
          <a
            href={'en.html' + location.hash}
            className={styles.language}
          >En</a>
        </div>
      </div>
    ));

    return (
      <div className={styles.layoutAside}>
        <aside>
          <Sider
            current={current} menus={menus}
            routerMatchList={routerMatchList} linkList={linkList}
            navs={navs}
            dispatch={dispatch}
          />
        </aside>
        <div className={styles.main}>
          <div className={styles.crumb}>
            {
              crumbList
            }
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  dispatch: PropTypes.func,
  children: PropTypes.element,
  current: PropTypes.string,
  load: PropTypes.bool,
  navs: PropTypes.shape(),
  linkList: PropTypes.arrayOf(PropTypes.shape()),
  menus: PropTypes.arrayOf(PropTypes.shape()),
  expandable: PropTypes.string,
  pathList: PropTypes.arrayOf(PropTypes.shape()),
};

const mapStateToProps = state => state.navigation;

export default connect(mapStateToProps)(Navigation);
