import * as API from "../util/location_api_util";

export const RECEIVE_TRACK_ERROR = "RECEIVE_TRACK_ERROR";
export const RECEIVE_FAVORITE_POINTS = "RECEIVE_FAVORITE_POINTS";
export const RECEIVE_TRACKED_INPUT = "RECEIVE_TRACKED_INPUT";

export const receiveTrackError = errors => ({
    type: RECEIVE_TRACK_ERROR,
    errors
});

export const receiveFavorites = favorites => ({
    type: RECEIVE_FAVORITE_POINTS,
    favorites
});

export const receiveTrackedInput = trackedInput => ({
    type: RECEIVE_TRACKED_INPUT,
    trackedInput
})

export const getFavoritePoints = (userId) => (dispatch) => API.getFavorites(userId)
    .then(favorites => dispatch(receiveFavorites(favorites.data)));

export const trackInput = (location) => (dispatch) => API.track(location)
    .then(location => dispatch(receiveTrackedInput(location.data)));