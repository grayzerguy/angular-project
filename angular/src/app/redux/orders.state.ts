import { OrderModel } from "../models/order.model";

export class OrdersState {
  public orders: OrderModel[] = [];
}

export enum OrdersActionType {
  FetchOrder = "FetchOrder",
  AddToOrder = "AddToOrder",
  GetOrderByUser = "GetOrderByUser",
  DeleteOrder = "DeleteOrder",
  UpDateOrder = "UpDateOrder",
}

export interface OrdersAction {
  type: OrdersActionType;
  payload: any;
}

export function fetchOrdersAction(orders: OrderModel[]): OrdersAction {
  return { type: OrdersActionType.FetchOrder, payload: orders };
}
export function addToOrderAction(order: OrderModel): OrdersAction {
  return { type: OrdersActionType.AddToOrder, payload: order };
}
export function GetOrderByUserAction(userId: string): OrdersAction {
  return { type: OrdersActionType.GetOrderByUser, payload: userId };
}
export function DeleteOrderAction(id: string): OrdersAction {
  return { type: OrdersActionType.DeleteOrder, payload: id };
}
export function UpDateOrderAction(order: OrderModel): OrdersAction {
  return { type: OrdersActionType.UpDateOrder, payload: order };
}

export function ordersReducer(currentState = new OrdersState(), action: OrdersAction): OrdersState {
  const newState = { ...currentState }; // copy the current state to a new object
  switch (action.type) {
    case OrdersActionType.FetchOrder:
      newState.orders = action.payload;
      break;
    case OrdersActionType.AddToOrder:
      newState.orders.push(action.payload);
      break;
    case OrdersActionType.GetOrderByUser:
      newState.orders.filter(o => o.user === action.payload);
      break;
    case OrdersActionType.DeleteOrder:
      const indexToDelete = newState.orders.findIndex(o => o._id === action.payload);
      newState.orders.splice(indexToDelete, 1);

      break;
    case OrdersActionType.UpDateOrder:
      const indexToUpdate = newState.orders.findIndex(o => o._id === action.payload._id);
      if (indexToUpdate >= 0) {
        newState.orders[indexToUpdate] = action.payload;
      }
            break;

  }
  return newState;
}

//

