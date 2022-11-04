import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  public user: UserModel;
  private unsubscribe: Unsubscribe;
  // public hidden: boolean = true;

  constructor(private router: Router ) { }

  ngOnInit(): void {

    this.user = store.getState().authState.user;
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().authState.user;
    })

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
 
  

}
