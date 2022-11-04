import { UserModel } from "../models/user.model";
import jwtDecode from "jwt-decode";


export class AuthState {

  public user: UserModel = null;
  public token: string = null;

  public constructor() {

    this.token = localStorage.getItem("token");
    if (this.token) {
      const encodedObject: any = jwtDecode(this.token);
      this.user = encodedObject.user;
    }
  }
}
//Action Types
export enum AuthActionTypes {
  Register = "Register",
  Login = " Login",
  Logout = "Logout",

}
//Action
export interface AuthAction {
  type: AuthActionTypes;
  payload?: string;

}
// Action Creators :
export function registerAction(token: string): AuthAction {
  return { type: AuthActionTypes.Register, payload: token };
}
export function loginAction(token: string): AuthAction {
  return { type: AuthActionTypes.Login, payload: token };
}
export function logoutAction(): AuthAction {
  return { type: AuthActionTypes.Logout };
}
// Reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
  const newState = { ...currentState }; // copy the current state to a new object
  switch (action.type) {

    case AuthActionTypes.Register:
    case AuthActionTypes.Login:
      newState.token = action.payload;
      const encodedObject: any = jwtDecode(action.payload);
      newState.user = encodedObject.user;
      localStorage.setItem('token', action.payload)
      break;

    case AuthActionTypes.Logout:
      newState.token = null;
      newState.user = null;
      localStorage.removeItem("token");
      break;
  }
  return newState;
}

