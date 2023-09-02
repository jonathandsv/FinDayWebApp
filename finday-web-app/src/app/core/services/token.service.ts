import { Injectable } from '@angular/core';
import { Perfil, Usuario } from 'src/app/shared/models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Token } from '../interfaces/token.interface';

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

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }

  decryptToken(): Usuario {
    var user = this.jwtHelper.decodeToken(this.getToken());
    this.montarPerfil(user);
    return user as Usuario
  }

  private montarPerfil(user: any) {
    if (user && user.nomeperfil) {
      let perfil: Perfil = {
        nome: user.nomeperfil,
        funcionalidades: []
      };

      Object.entries(user).forEach(([key, value]) => {
        if (typeof value == 'object' && Array.isArray(value)) {
          perfil.funcionalidades.push({
            nome: key,
            acoes: value as string[]
          });
        }
      });

      user.perfil = perfil;
    }
  }

  tokenExpired() {
    const expired = this.jwtHelper.isTokenExpired(this.getToken())
    return expired;
  }
}
