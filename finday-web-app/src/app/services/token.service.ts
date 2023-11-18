import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  jwtHelper = new JwtHelperService();
  constructor() { }

  hasToken() {
    return !!this.getToken();
  }

  setToken(token: string) {
    this.removeToken();
    window.localStorage.setItem(KEY, token);
  }

  getToken(): string {
    return window.localStorage.getItem(KEY) as string;
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }

  decryptToken(): any {
    var user = this.jwtHelper.decodeToken(this.getToken());
    // this.buildPerfil(user);
    return user
  }

  tokenExpired() {
    const expired = this.jwtHelper.isTokenExpired(this.getToken())
    return expired;
  }
}
