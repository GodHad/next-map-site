import { PlacesType } from "@lib/Places";

export const SELECT_PLACE_WITH_WISH = 'SELECT_PLACE_WITH_WISH';

type LatLngExpression = [number, number];

// Your action payload type
type SelectPlaceWithWishPayloadType = {
  category: number;
  position: LatLngExpression; // Assuming LatLngExpression is the type used in your payload
};

interface SelectPlaceWithWish {
    type: typeof SELECT_PLACE_WITH_WISH,
    payload: SelectPlaceWithWishPayloadType
}

export type PlaceActionTypes = 
    | SelectPlaceWithWish

export interface PlaceState {
    places: PlacesType | null
}