import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemModel, CartModel } from '../models/cart.model';
// import { ProductModel } from '../models/products-model';
import { cartAddedAction } from '../redux/cart.state';
import store from '../redux/store';

export const CART_KEY = "cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: CartModel[] = [];




  constructor(private http: HttpClient) { }

  public initCartLocalStorage() {
    const cart : CartModel = this.getCart();
    if (!cart) {    
      
      localStorage.setItem(CART_KEY, JSON.stringify( {
        items: [] = []
      }));   
    }
   }
  public getCart() : CartModel {
    const cartJsonString : string = localStorage.getItem(CART_KEY);
    const cart : CartModel = JSON.parse(cartJsonString);
    store.dispatch(cartAddedAction(cart));
    return cart;
   }
   public setCartItem(cartItem:CartItemModel) : CartModel {
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
   store.dispatch(cartAddedAction(cart));
   return cart;
      }
  }
  




























