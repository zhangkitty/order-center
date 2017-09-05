/**
 * Created by fed on 2017/8/28.
 */
import { Spin } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router } from 'react-router';
// international
import { LocaleProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import Nav from './navigation/view.jsx';
import Login from './login/view.jsx';
import './root.css';

const NotFound = () => <div>404</div>;

// alert!! for loader
const Loading = () =>  <Spin spinning={true}/>;
import reducers from './index';
let store;

let locale = {};
if (process.env.LOCALE === 'en') {
  locale = require('antd/lib/locale-provider/en_US');
  moment.locale('en');
}
if (process.env.LOCALE === 'zh') {
  moment.locale('zh-cn');
}

const RootView = ({ history, store: storeRedux }) => {
  store = storeRedux;
  return (
    <LocaleProvider locale={locale}>
      <Router history={ history }>
        <Route path="/login" component={Login} />
        <Route path='/' component={Nav}>
          __ROOT_ROUTE__
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    </LocaleProvider>
  );
};

RootView.propTypes = {
  /* eslint  react/forbid-prop-types: 0 */
  appLocale: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default RootView;