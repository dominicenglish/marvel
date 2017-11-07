import { call, put, takeLatest, takeEvery, take, fork } from 'redux-saga/effects';
import { normalize, schema, arrayOf } from 'normalizr';
import { FETCH } from './actions.js';
import * as api from '../api.js';

function* fetchData(action={}) {
  // new implementation
  if ( action.types ) {
    const { types, path, resource, id, params } = action;
    const [ requestType, successType, failType ] = types;

    try {
      yield put({ type: requestType, initialAction: action });
      const response = yield call(api.query, path);
      const normalisedResults = normalize(response.data.results, api.Schemas.RESULTS);
      yield put({ type: successType, initialAction: action, response, normalisedResults });
    } catch (e) {
      yield put({ type: failType, initialAction: action, message: e.message });
    }
  } else {

    const { path, successAction, failAction } = action;
    try {
      const response = yield call(api.query, path);
      yield put({ ...successAction, response, path });
    } catch (e) {
      yield put({ ...failAction, message: e.message, path });
    }
  }
}

export default function* rootSaga() {
  // Keep track of recently made queries
  const queryState = {};
  while (true) {
    const action = yield take(FETCH);
    const { resource, id, params, subresource } = action;
    const path = api.buildPath(resource, params, id, subresource);
    action.path = path;
    const previousTask = queryState[path];
    // Only query api if we haven't done this exact query already
    if (!previousTask) {
      queryState[path] = yield fork(fetchData, action);
    }
  }
}
