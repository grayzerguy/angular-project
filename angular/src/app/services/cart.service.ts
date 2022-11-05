import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemModel, CartModel } from '../models/cart.model';
import { ProductModel } from '../models/products-model';
import { CartAction, cartAddedAction } from '../redux/cart.state';
import store from '../redux/store';

export const CART_KEY = "cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: CartModel[] = [];




  constructor(private http: HttpClient) { }

  public initCartLocalStorage() {
    const intialCart = {
      items: [] = []
    }
    const intialCartJason = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJason);
  }
   getCart() : CartModel {
    const cartJsonString : string = localStorage.getItem(CART_KEY);
    const cart : CartModel = JSON.parse(cartJsonString);
    return cart;


   }
   setCartItem(cartItem:CartItemModel) : CartModel {
    const cart = this.getCart();
    const cartItemExists = cart.items.find(item => item.productId === cartItem.productId);
    if (cartItemExists) {
      cart.items.map(item => {
        if (item.productId === cartItem.productId) {
          item.quantity += cartItem.quantity;
          
        }
        return item;
      })
    } else {
      cart.items.push(cartItem);
     
    }

   const cartJason = JSON.stringify(cart);
     localStorage.setItem(CART_KEY, cartJason);  
   return cart;
  }
}
  


























  // public addToCart(cartItem: CartModel) {
  //   ///chach if the product is already in the cart (local storage)
    // const cartInLocalStorage = localStorage.getItem("cart");
    // if (cartInLocalStorage) {
    //   this.cart = JSON.parse(cartInLocalStorage);
    // }
    //  cartItem to array
    // const cartItemToAdd = new CartModel();
    // cartItemToAdd.productId = cartItem.productId;
    // cartItemToAdd.quantity = cartItem.quantity;
    // this.cart.push(cartItemToAdd);
    // console.log(this.cart);
    //update local storage
    // localStorage.setItem("orderItems", JSON.stringify(this.cart));
    // store.dispatch(cartAddedAction(cartItemToAdd));  //  <---  to update the cart in the redux store  הפעל מאוחר יותר ולא לשכוח למחוק ביצירת הזמנה



  //delete from cart

// }




