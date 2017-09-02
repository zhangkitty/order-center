/**
 * Created by fed on 2017/8/28.
 */
import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import '!!style-loader!css-loader!antd/dist/antd.min.css';

import rootReducer, { rootSaga } from './components';

import RootView from './components/root';

// reducers
const reducersWithRouter = combineReducers(rootReducer);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducersWithRouter,
  compose(
    applyMiddleware(
      routerMiddleware(hashHistory),
    ),
    applyMiddleware(sagaMiddleware),
    (window.devToolsExtension && window.devToolsExtension()) || (f => f),
  ),
);

const history = syncHistoryWithStore(hashHistory, store);
sagaMiddleware.run(rootSaga);

render(<Provider store={store}>
  <RootView history={history} store={store} />
</Provider>,
  document.getElementById('container'));
