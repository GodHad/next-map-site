import { PlaceValues } from "@lib/Places";
import {
    SELECT_PLACE_WITH_WISH,
    PlaceState,
    PlaceActionTypes,
} from "./placeTypes";

export const initialPlaceState: PlaceState = {
    places: null
}

export function placeReducer(
    state = initialPlaceState,
    action: PlaceActionTypes
) {
    switch (action.type) {
        case SELECT_PLACE_WITH_WISH:
            const { category, position } = action.payload;

            const newPosition = {
                lat: position[0],
                lng: position[1],
            };

            const newPlace: PlaceValues = { category: category, position: newPosition };
            const updatedPlaces = state.places ? state.places.concat(newPlace) : [newPlace];
            return {
                ...state,
                places: updatedPlaces
            };
        default:
            return state;
    }
}