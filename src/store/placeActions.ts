import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
    SELECT_PLACE_WITH_WISH,
    PlaceState
} from "./placeTypes";
import { LatLngExpression } from "./placeTypes";
import { CATEGORY_CLEARED } from "./categoryTypes";

export function selectPlaceWithWish(
    latlng: LatLngExpression
): ThunkAction<void, PlaceState, null, Action<string>> {
    return (dispatch: any, getState: any) => {
        const category = getState().category;
        dispatch({ type: SELECT_PLACE_WITH_WISH, payload: { position: latlng, category: category?.category } })
        dispatch({ type: CATEGORY_CLEARED })
    }
}