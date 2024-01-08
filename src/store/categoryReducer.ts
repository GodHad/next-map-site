import { CategoryState, CategoryActionTypes, CATEGORY_CLEARED, CATEGORY_SELECTED } from "./categoryTypes";
import MarkerCategories, { MarkerCategoriesValues } from "@lib/MarkerCategories";

export const initialCategoryState: CategoryState = null

export function categoryReducer(
    state = initialCategoryState,
    action: CategoryActionTypes
) {
    switch (action.type) {
        case CATEGORY_SELECTED:
            return action.payload
        case CATEGORY_CLEARED:
            return null
        default:
            return state;
    }
}