import * as types from './types';

export const change = (key, value) => ({
  type: types.change,
  key,
  value,
});

export const init = () => ({
  type: types.init,
});

export const search = props => ({
  type: types.search,
  props,
});
