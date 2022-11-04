import { CategoryModel } from '../models/category.model';

export class CategoriesState {
  public categories: CategoryModel[] = [];  // מערך של מוצרים
}

//איזה פעולות אפשר לעשות  להביא ןהוסיף לעדכן ולמחוק
//כל פעולה תקבל את הסטייט הנוכחי ותחזיר את הסטייט החדש
export enum CategoriesActionType {
  FetchCategories = "FetchCategories",
  AddCategory = "AddCategory",
  UpdateCategory = "UpdateCategory",
  DeleteCategory = "DeleteCategory"
}

export interface CategoriesAction {
  type: CategoriesActionType;
  payload: any;
}

export function fetchCategoriesAction(categories: CategoryModel[]): CategoriesAction {
  return { type: CategoriesActionType.FetchCategories, payload: categories };
}
export function addCategoryAction(category: CategoryModel): CategoriesAction {
  return { type: CategoriesActionType.AddCategory, payload: category };
}
export function updateCategoryAction(category: CategoryModel): CategoriesAction {
  return { type: CategoriesActionType.UpdateCategory, payload: category };
}
export function deleteCategoryAction(id: string): CategoriesAction {
  return { type: CategoriesActionType.DeleteCategory, payload: id };
}

export function categoriesReducer(currentState = new CategoriesState(), action: CategoriesAction): CategoriesState {
  const newState = { ...currentState }; // copy the current state to a new object
  switch (action.type) {
    case CategoriesActionType.FetchCategories:
      newState.categories = action.payload;
      break;
    case CategoriesActionType.AddCategory:
      newState.categories.push(action.payload);
      break;
    case CategoriesActionType.UpdateCategory:
      const indexToUpdate = newState.categories.findIndex(c => c._id === action.payload._id);
      if (indexToUpdate >= 0) {
        newState.categories[indexToUpdate] = action.payload;
      }
      break;
    case CategoriesActionType.DeleteCategory:
      const indexToDelete = newState.categories.findIndex(c => c._id === action.payload);
      newState.categories.splice(indexToDelete, 1);
      break;
  }
  return newState; // return the new state
}

