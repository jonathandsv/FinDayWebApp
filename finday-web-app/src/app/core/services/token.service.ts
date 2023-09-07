import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from 'src/app/shared/models/user';

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
    return window.localStorage.getItem(KEY) ? (window.localStorage.getItem(KEY) as string) : '';
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }

  decryptToken(): Usuario {
    var user = this.jwtHelper.decodeToken(this.getToken());
    //this.montarPerfil(user);
    return user as Usuario
  }

  tokenExpired() {
    const expired = this.jwtHelper.isTokenExpired(this.getToken())
    return expired;
  }

  // private montarPerfil(user: any) {
  //   if (user && user.nomeperfil) {
  //     let perfil: Perfil = {
  //       nome: user.nomeperfil,
  //       funcionalidades: []
  //     };

  //     Object.entries(user).forEach(([key, value]) => {
  //       if (typeof value == 'object' && Array.isArray(value)) {
  //         perfil.funcionalidades.push({
  //           nome: key,
  //           acoes: value as string[]
  //         });
  //       }
  //     });

  //     user.perfil = perfil;
  //   }
  // }
}
