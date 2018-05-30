import moment from 'moment';
import assign from 'object-assign';
import * as TYPES from './types';

const defaultState = {
  dataSource: [{
    id: 1,
    name: 'Aliexpress',
    load: false,
    date: moment(Date.now()).format('YYYYMMDD'),
  }],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.COMMIT:
      return assign({}, state, {
        [action.key]: action.val,
      });
    case TYPES.LOG:
      return assign({}, state, {
        dataSource: action.data.map((v, i) => (i === +action.index ?
          assign({}, v, { load: true }) : v)),
      });
    case TYPES.CHNAGE_DATE:
      return assign({}, state, {
        dataSource: state.dataSource.map((v, i) => (i === +action.index ?
          assign({}, v, { date: action.date }) : v)),
      });
    default:
      return state;
  }
};
