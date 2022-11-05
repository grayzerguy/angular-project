import { addToOrderAction, DeleteOrderAction, fetchOrdersAction, UpDateOrderAction, } from "../redux/orders.state";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  public async getAllOrders(): Promise<OrderModel[]> {
    let orders = store.getState().OrdersState.orders;

    if (orders.length === 0) {
      orders = await firstValueFrom(this.http.get<OrderModel[]>(environment.ordersUrl));
      //update in redux
      store.dispatch(fetchOrdersAction(orders))

    }
    return orders
  }
  public async getOneOrder(id: string): Promise<OrderModel> {
    let orders = await this.getAllOrders();
    const order = orders.find(o => o._id === id)
    return order
  }
  public async addOrder(order: OrderModel): Promise<OrderModel> {
    //convert product to form data and send it to the server
    //we need to convert the number  to string
    const formData = new FormData();
    formData.append("user", order.user.id.toString());
    formData.append("orderItem", order.orderItems.toString());
    formData.append("shippingAddress", order.shippingAddress);
    formData.append("city", order.city);
    formData.append("phone", order.user.phone);

    const addedOrder = await firstValueFrom(this.http.post<OrderModel>(environment.ordersUrl, formData));

    store.dispatch(addToOrderAction(addedOrder));

    return addedOrder
  }
  public async deleteOrder(id: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(environment.ordersUrl + id));
    //update in redux
    store.dispatch(DeleteOrderAction(id))
  }
  //update the server
  public async updateOrder(order: OrderModel): Promise<OrderModel> {
    const formData = new FormData();
    formData.append("user", order.user.id.toString());
    formData.append("orderItem", order.orderItems.toString());
    formData.append("shippingAddress", order.shippingAddress);
    formData.append("city", order.city);
    formData.append("phone", order.user.phone);

    const updatedOrder = await firstValueFrom(this.http.put<OrderModel>(environment.ordersUrl + order._id, formData));
    //update in redux
    store.dispatch(UpDateOrderAction(updatedOrder));
    return updatedOrder
  }

  public async getOrdersByUserId(userId: string): Promise<OrderModel[]> {
    let orders = await this.getAllOrders();
    orders = orders.filter(o => o.user.id === userId);
    return orders
  }



}
