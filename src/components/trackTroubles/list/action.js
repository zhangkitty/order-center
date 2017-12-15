import * as types from './types';

export const commit = (key, value) => ({ type: types.commit, key, value });
export const filterCommit = (key, value) => ({ type: types.filterCommit, key, value });
export const getFilters = () => ({ type: types.getFilters });
export const getData = filter => ({ type: types.getData, filter });
