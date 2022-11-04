import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public constructor(private notify: NotifyService, private router: Router) { }

  canActivate(): boolean {
    if (store.getState().authState.user?.isAdmin) {
      return true;
    }
    this.notify.error("You are not allowed to enter this page");
    this.router.navigateByUrl("/store");
    return false;
  }





  //   this.notify.error("You are not admin");
  //   this.router.navigateByUrl("/store");
  //   return false;
  // }


  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

}
