/**
 * Created by fed on 2017/8/28.
 */
import { take } from 'redux-saga/effects';

export default function* () {
  yield take('forever');
}
