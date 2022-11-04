
import { ProductModel } from "../models/products-model";

//  רם היה סל קניות אז או שהיה עוד פאבליק או שהיה סטייט נפרד לסל הקניות

// Products State - products data needed in the application level :
export class ProductsState {
  public products: ProductModel[] = [];  // מערך של מוצרים
}
//איזה פעולות אפשר לעשות  להביא ןהוסיף לעדכן ולמחוק
// Products Action Type - any action which can be done on the above products state :
export enum ProductsActionType {
  FetchProducts = "FetchProducts",
  AddProduct = "AddProduct",
  UpdateProduct = "UpdateProduct",
  DeleteProduct = "DeleteProduct",
  countProducts = "countProducts",
  getProductsByCategory = "getProductsByCategory",

}
//אובייקת  שמתאר פעולה אחת לביצוע
// Products Action - any single object sent to the store during " dispatch " :
export interface ProductsAction {
  type: ProductsActionType;
  payload: any;
}

// Products Action Creators - function for creating ProductsAction objects . each
export function fetchProductsAction(products: ProductModel[]): ProductsAction {
  return { type: ProductsActionType.FetchProducts, payload: products };
}
export function addProductAction(product: ProductModel): ProductsAction {
  return { type: ProductsActionType.AddProduct, payload: product };
}
export function updateProductAction(product: ProductModel): ProductsAction {
  return { type: ProductsActionType.UpdateProduct, payload: product };
}
export function deleteProductAction(id: string): ProductsAction {
  return { type: ProductsActionType.DeleteProduct, payload: id };
}
export function countProductsAction(): ProductsAction {
  return { type: ProductsActionType.countProducts, payload: null };
}
export function getProductsByCategoryAction(categoryId: string): ProductsAction {
  return { type: ProductsActionType.getProductsByCategory, payload: categoryId };
}


// Products Reducer the main function performing any action on products state :
//the new ProductsState ( ) is a default value for the first time only
export function productsReducer(currentState = new ProductsState(), action: ProductsAction): ProductsState {
  const newState = { ...currentState }; // copy the current state to a new object
  switch (action.type) {
    case ProductsActionType.FetchProducts:
      newState.products = action.payload;
      
      break;
    case ProductsActionType.AddProduct:
      newState.products.push(action.payload);
      break;
    case ProductsActionType.UpdateProduct:
      const indexToUpdate = newState.products.findIndex(p => p._id === action.payload.id);
      if (indexToUpdate >= 0) {
        newState.products[indexToUpdate] = action.payload;
      }
      break;
    case ProductsActionType.DeleteProduct:
      const indexToDelete = newState.products.findIndex(p => p._id === action.payload);
      newState.products.splice(indexToDelete, 1);
      break;
    case ProductsActionType.countProducts:
      newState.products.length;
      break;
    case ProductsActionType.getProductsByCategory:
      newState.products.filter(p => p.categoryId === action.payload);
      break;

  }
  return newState;
}



