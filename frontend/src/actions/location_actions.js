import { track, getFavorites} from "../util/location_api_util";

export const RECEIVE_TRACK_ERROR = "RECEIVE_TRACK_ERROR";

export const receiveTrackError = errors => ({
    type: RECEIVE_TRACK_ERROR,
    errors
});