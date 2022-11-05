import { Component, Input } from '@angular/core';
import { CartItemModel, CartModel } from 'src/app/models/cart.model';
import { ProductModel } from 'src/app/models/products-model';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  public productImage = environment.productsUrl
  @Input()
  public product: ProductModel
  @Input("show-actions")
  public showActions = true
  @Input()
  public cart: CartModel


  constructor(private cartService: CartService ,private notifyService: NotifyService) { }

  ngOnInit(): void {}

  public addProductToCart() {
 
    const cartItem : CartItemModel = {
      productId: this.product._id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)
    this.notifyService.success("Product added to cart")
   
  }
}



