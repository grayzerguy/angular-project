import { Component, Input } from '@angular/core';
import { CartModel } from 'src/app/models/cart.model';
import { ProductModel } from 'src/app/models/products-model';
import { CartService } from 'src/app/services/cart.service';
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


  constructor(private cartService: CartService) { }

  public addToCart(productId: ProductModel, quantity: number) {
    const cartItem = new CartModel();
    // cartItem.productId = productId._id;
    //     cartItem.quantity = quantity;
        this.cartService.addToCart(cartItem);
  }
}


