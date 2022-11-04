import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModel } from '../models/cart.model';
import { ProductModel } from '../models/products-model';
import { CartAction, cartAddedAction } from '../redux/cart.state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: CartModel[] = [];




  constructor(private http: HttpClient) { }

  public initCartLocalStorage() {
    const intiaCart = {
      cart: [] = []
    }
    localStorage.setItem("cart", JSON.stringify(intiaCart));
  }

  public addToCart(cartItem: CartModel) {
    ///chach if the product is already in the cart (local storage)
    // const cartInLocalStorage = localStorage.getItem("cart");
    // if (cartInLocalStorage) {
    //   this.cart = JSON.parse(cartInLocalStorage);
    // }
    //  cartItem to array
    const cartItemToAdd = new CartModel();
    // cartItemToAdd.productId = cartItem.productId;
    // cartItemToAdd.quantity = cartItem.quantity;
    this.cart.push(cartItemToAdd);
    console.log(this.cart);
    //update local storage
    localStorage.setItem("orderItems", JSON.stringify(this.cart));
    // store.dispatch(cartAddedAction(cartItemToAdd));  //  <---  to update the cart in the redux store  הפעל מאוחר יותר ולא לשכוח למחוק ביצירת הזמנה

  }

  //delete from cart

}




