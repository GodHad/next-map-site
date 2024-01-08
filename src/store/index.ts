import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import { PlaceState } from './placeTypes';
import { initialPlaceState } from './placeReducer';
import { placeReducer } from './placeReducer';
import { categoryReducer } from './categoryReducer';

const reducer = combineReducers({
    places: placeReducer,
    category: categoryReducer
});

export const store = createStore(reducer, applyMiddleware(thunk))

export interface AppState {
    places: PlaceState
    category: null | string
}
export const initialAppState: AppState = {
    places: initialPlaceState,
    category: null
};
