import { CartModel } from "../models/cart.model";


export class CartState {
  public carts: CartModel[] = [];
}

export enum CartsActionType {

  CartAdded = "CartAdded",
  CartUpdated = "CartUpdated",
  CartDeleted = "CartDeleted",

}

export interface CartAction {
  type: CartsActionType;
  payload: any;
}

export function cartAddedAction(cart: CartModel): CartAction {
  return { type: CartsActionType.CartAdded, payload: cart };
}

export function cartUpdatedAction(cart: CartModel): CartAction {
  return { type: CartsActionType.CartUpdated, payload: cart };
}

export function cartDeletedAction(productId: string): CartAction {
  return { type: CartsActionType.CartDeleted, payload: productId };
}

export function cartsReducer(currentState = new CartState(), action: CartAction): CartState {
  const newState = { ...currentState }; // copy the current state to a new object
  switch (action.type) {

    case CartsActionType.CartAdded:
      newState.carts.push(action.payload);
      break;

    // case CartsActionType.CartUpdated:
    //   const indexToUpdate = newState.carts.findIndex(c => c.productId === action.payload.productId);
    //   if (indexToUpdate >= 0) {
    //     newState.carts[indexToUpdate] = action.payload;
    //   }
    //   break;

    // case CartsActionType.CartDeleted:
    //   const indexToDelete = newState.carts.findIndex(c => c.productId === action.payload);
    //   newState.carts.splice(indexToDelete, 1);
    //   break;
  }
  return newState;
}

