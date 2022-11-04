import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import { loginAction, logoutAction, registerAction } from '../redux/auth.state';
import store from '../redux/store';
import { CredentialsModel } from '../models/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
 //register
  public async register(user: UserModel): Promise<void> {
    const token = await firstValueFrom(this.http.post<string>(environment.registerUrl, user));//firstValueFrom is a function that returns a promise and it takes an observable
    store.dispatch(registerAction(token));
  }
  //login
  public async login(credentials: CredentialsModel): Promise<void> {
    const token = await firstValueFrom(this.http.post<string>(environment.loginUrl, credentials));
    store.dispatch(loginAction(token));
  }
  //is the user logged in?
    public isLoggedIn(): boolean {
      return store.getState().authState.user != null;
    }
  //logout
  public logout(): void {
    store.dispatch(logoutAction());
  }
}

