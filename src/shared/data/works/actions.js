import { normalize } from 'normalizr'
import get from '../../services/get'
import { endpoints } from '../../services/endpoints'
import * as types from './actionTypes'
import * as schemas from './schemas'
import * as selectors from './selectors'

export const fetchWorksSuccess = payload => ({
  type: types.FETCH_WORKS_SUCCESS,
  receivedAt: Date.now(),
  payload
})

export const fetchWorksFail = payload => ({
  type: types.FETCH_WORKS_FAIL,
  receivedAt: Date.now(),
  payload
})

export const fetchWorks = () => dispatch => {
  dispatch({ type: types.FETCH_WORKS })

  return get(endpoints.WORKS)
    .then(response => response.json())
    .then(data => normalize(data.items, [schemas.works]))
    .then(normalized => dispatch(fetchWorksSuccess(normalized)))
    .catch(error => dispatch(fetchWorksFail(error)))
}

export const fetchWorksIfNeeded = () => (dispatch, getState) => {
  if (selectors.shouldFetchWorks(getState())) {
    return dispatch(fetchWorks())
  }

  return Promise.resolve()
}
