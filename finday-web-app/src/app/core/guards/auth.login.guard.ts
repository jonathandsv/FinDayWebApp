import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable()
export class AuthLoginGuard implements CanActivate {
  private isLoggedIn: boolean;
  private observer$: Observable<boolean>;


  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    return this.validacaoGuardToken();
  }

  canActivateChild(): boolean {
    return this.validacaoGuardToken();
  }

  validacaoGuardToken() {
    const tokenExpired = this.tokenService.tokenExpired();

    if (tokenExpired) {
      this.router.navigate(['/login']);
    }
    const usuario = this.tokenService.decryptToken();
    return !tokenExpired;
  }
}
