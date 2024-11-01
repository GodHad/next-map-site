import { Leaf, LocateFixed, LucideProps, PersonStanding } from 'lucide-react'
import { FunctionComponent } from 'react'
import colors from 'tailwindcss/colors'

export enum Category {
  LOCATE = 0,
  CAT1 = 1,
  CAT2 = 2,
}

export interface MarkerCategoriesValues {
  category: Category
  name: string
  icon: FunctionComponent<LucideProps>
  color: string
  hideInMenu?: boolean
}

export type MarkerCategoryType = {
  [key in Category]: MarkerCategoriesValues
}

const MarkerCategories: MarkerCategoryType = {
  [Category.LOCATE]: {
    category: Category.LOCATE,
    name: 'Category 1',
    icon: LocateFixed,
    color: colors.green[400],
    hideInMenu: false,
  },
  [Category.CAT1]: {
    category: Category.CAT1,
    name: 'Category 2',
    icon: Leaf,
    color: colors.blue[400],
  },
  [Category.CAT2]: {
    category: Category.CAT2,
    name: 'Category 3',
    icon: PersonStanding,
    color: colors.red[400],
  },
}

export default MarkerCategories
