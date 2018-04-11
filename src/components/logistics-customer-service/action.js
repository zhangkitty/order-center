import * as types from './types';
import { makeActionCreator } from '../../lib/deal-func';

export const init = makeActionCreator(types.init, 'pageNumber', 'pageSize');
export const initSuccess = makeActionCreator(types.initSuccess, 'val');
export const initFailed = makeActionCreator(types.initFailed);

