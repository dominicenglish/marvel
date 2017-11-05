import { call, put, takeLatest, takeEvery, take, fork } from 'redux-saga/effects';
import { FETCH } from './actions.js';
import * as api from '../api.js';

function* fetchData(action={}) {
  const { path, successAction, failAction } = action;
  try {
    const response = yield call(api.query, path);
    yield put({ ...successAction, response, path });
  } catch (e) {
    yield put({ ...failAction, message: e.message, path });
  }
}

export default function* rootSaga() {
  // Keep track of recently made queries
  const queryState = {};
  while (true) {
    const action = yield take(FETCH);
    const previousTask = queryState[action.path];
    // Only query api if we haven't done this exact query already
    if (!previousTask) {
      queryState[action.path] = yield fork(fetchData, action);
    }
  }
}
