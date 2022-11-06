import { OrderItemModel } from './order-Item.maodel';
import { UserModel } from './user.model';

export class OrderModel {
  public _id?: string;
  public user?: UserModel;
  public orderItems?: OrderItemModel;
  public totalPrice?: number;
  public city?: string;
  public shippingAddress?: string;
  public dateOrdered?: Date;
  public dateShipped?: Date;
  public lastFourDigits?: number;
}
