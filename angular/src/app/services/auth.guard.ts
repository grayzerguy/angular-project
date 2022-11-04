
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

public constructor(private notify : NotifyService , private router : Router) { }
  // This function invoked whenever user tries to enter a route required to be logged - in
  canActivate(): boolean{
    // if the user is logged in - return true
    // if the user is not logged in - return false

    //admin guard
    // if(store.getState().authState.token.includes("isAdmin")) {
    //   return true;
    //   }

    if(store.getState().authState.token) {
    return true;
    }

    // if the user is not logged in - notify him and return false
    this.notify.error("You are not logged in");
    this.router.navigateByUrl("/login");
    return false;


}

  // canActivate(

  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

}
