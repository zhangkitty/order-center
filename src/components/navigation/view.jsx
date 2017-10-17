import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Sider from './sider';
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
      <span key={i} style={{ fontSize: '13px' }}>
        <Link
          key={v.link}
          style={i === pathList.length - 1 ? { color: 'rgba(0,0,0,.8)' } : { color: 'rgba(0,0,0,1)' }}
          className={styles.tabActive}
          to={i === pathList.length - 1 ? null : v.link}
        >{v.crumbName}</Link>
        {
          i !== pathList.length - 1 && ' / '
        }
      </span>
    ));

    return (
      <div className={styles.layoutAside}>
        <aside style={{ display: 'none' }}>
          <Sider
            current={current} menus={menus}
            routerMatchList={routerMatchList} linkList={linkList}
            navs={navs}
            dispatch={dispatch}
          />
        </aside>
        <div className={styles.main}>
          <div className={styles.crumb}>
            <div>
              {
                  crumbList
              }
            </div>
            <div className={styles.menubtn}>
              <a
                href={'index.html' + location.hash}
                className={styles.language}
              >中</a>
              <a
                href={'en.html' + location.hash}
                className={styles.language}
              >En</a>
            </div>
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
