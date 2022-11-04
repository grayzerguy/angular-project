import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') myForm: any;

  public credential = new CredentialsModel();
  constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }



  public goToSignup() {
    this.router.navigateByUrl("/register");
  }



  ngOnInit(): void {
  }
  public async logIn() {
    try {
      await this.authService.login(this.credential);
      
      this.notify.success("User login successfully");
      this.router.navigateByUrl("/store");
    }
    catch (err: any) {
      this.notify.error(err)
    }
   
  }
  public async register() {
    this.router.navigateByUrl("/register");

}
}
