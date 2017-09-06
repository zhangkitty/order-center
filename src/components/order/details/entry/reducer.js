import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return defaultState;
  }
};
