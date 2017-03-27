import { normalize } from 'normalizr'
import * as types from './actionTypes'
import * as schemas from './schemas'
import get from '../../services/get'
import { endpoints } from '../../services/endpoints'

export const fetchWorksSuccess = payload => ({
  type: types.FETCH_WORKS_SUCCESS,
  payload
})

export const fetchWorksFail = payload => ({
  type: types.FETCH_WORKS_FAIL,
  payload
})

export const fetchWorks = () => (
  dispatch => {
    // indicate start of fetch
    dispatch({ type: types.FETCH_WORKS })

    // fetch works
    return get(endpoints.WORKS)
      .then(response => response.json())
      .then(data => normalize(data.items, [schemas.works]))
      .then(normalized => dispatch(fetchWorksSuccess(normalized)))
      .catch(error => {
        import('../../services/analytics')
          .then(analytics => analytics.trackError(error))

        dispatch(fetchWorksFail(error))
      })
  }
)
