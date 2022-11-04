import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user = new UserModel();

  constructor(private authService : AuthService , private notify : NotifyService , private router:Router) { }

  ngOnInit(): void {
  }

  public async register() {
    try {
      await this.authService.register(this.user);
      this.notify.success("User registered successfully");
      if (this.authService.isLoggedIn()) {
        this.router.navigateByUrl("/store");
      }
      // this.router.navigateByUrl("/login");

    }
    catch (err: any) {
      this.notify.error(err)
    }
  }
 

}
