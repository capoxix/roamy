import * as API from '../util/discover_api_util';

export const RECEIVE_CAR_END_POINTS = 'RECEIVE_CAR_END_POINTS';
export const RECEIVE_QUERY_ERRORS = 'RECEIVE_QUERY_ERRORS';
export const CLEAR_END_POINTS = 'CLEAR_END_POINTS';

const receiveCarEndPoints = (endPoints) => {
  return ({
    type: RECEIVE_CAR_END_POINTS,
    endPoints
  })
}
const receiveQueryErrors = (errors) => {
  return ({
    type: RECEIVE_QUERY_ERRORS,
    errors
  })
}

export const sendQuery = (query) => (dispatch) => {
  return API.discoverCar(query)
  .then((res) => {
    console.log(res)
    dispatch(receiveCarEndPoints(res.data))
  })
}
