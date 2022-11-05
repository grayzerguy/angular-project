import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { CartModel } from 'src/app/models/cart.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  public user: UserModel;
  public cart : CartModel[] ;
  
  public cartItemModel : CartModel;
  private unsubscribe: Unsubscribe;
  // public hidden: boolean = true;

  constructor(private router: Router ) { }

  ngOnInit(): void {

    this.user = store.getState().authState.user;
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().authState.user;
    })
    this.cart = store.getState().CartState.carts
       //get cart from redux
  }
  ngOnDestroy(): void {
    this.unsubscribe();

  }
  public logInButton() {
    this.router.navigateByUrl("/login");
    // this.hidden = false;
  }
  public signUpButton() {
    this.router.navigateByUrl("/register");
    // this.hidden = false;
  }

  public getTotalQuantity() {
   return  store.getState().CartState.carts[0].items.map(({quantity}) => quantity).reduce((total, quantity) => total + quantity,0)
  }
 
}
