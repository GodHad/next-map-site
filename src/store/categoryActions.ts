import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { 
    CategoryState,
    CATEGORY_SELECTED,
    CATEGORY_CLEARED
} from "./categoryTypes";
import { Category, MarkerCategoriesValues } from "@lib/MarkerCategories";

export function categorySelected(
    category: MarkerCategoriesValues
): ThunkAction<void, CategoryState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({type: CATEGORY_SELECTED, payload: category})
    }
}

export function CategoryCleared(): ThunkAction<void, CategoryState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({type: CATEGORY_CLEARED});
    }
}
