import { OrdersService } from './../../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { OrderItemModel } from 'src/app/models/order-Item.maodel';
import { ProductModel } from 'src/app/models/products-model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  public orders: OrderModel[] = []


  constructor(private ordersService: OrdersService
  ) { }

  async ngOnInit() {
    try {
  
      this.orders = await this.ordersService.getAllOrders();

    }
    catch (err: any) {

    }
  }
}
