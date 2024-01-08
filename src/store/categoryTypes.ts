import { CategorySelect } from "@components/Map/ui/CategorySelect";
import { MarkerCategoriesValues } from "@lib/MarkerCategories";

export const CATEGORY_SELECTED = 'CATEGORY_SELECTED';
export const CATEGORY_CLEARED = 'CATEGORY_CLEARED';

interface CategorySelected {
    type: typeof CATEGORY_SELECTED,
    payload: {category: string}
}

interface CategoryCleared {
    type: typeof CATEGORY_CLEARED
}

export type CategoryActionTypes = 
    | CategorySelected
    | CategoryCleared

export type CategoryState = MarkerCategoriesValues | null