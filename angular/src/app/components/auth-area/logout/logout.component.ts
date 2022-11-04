import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-logout',
  // when we don't have HTML we put  template: ""
   // we don't need to have HTML because we don't need to show anything to the user
  // we just need to logout the user and redirect him to the login page

  template: ""
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private notify: NotifyService, private router: Router) { }

  ngOnInit(): void {
    this.authService.logout();

    this.notify.success("You Logged out")
    this.router.navigateByUrl("/login")
    //update the redux store
    // this.authService


  }

  

}


