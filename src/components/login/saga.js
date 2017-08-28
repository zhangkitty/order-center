/**
 * Created by mac on 17/4/18.
 */
import { take } from 'redux-saga/effects';

export default function* () {
  yield take('forever');
}
