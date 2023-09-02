import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { emitirMensagem } from 'src/app/shared/utils/emitirMensagem';

@Injectable()
export class AuthGuard implements CanActivate {
  private isLoggedIn: boolean;
  private observer$: Observable<boolean>;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(): boolean {
    return this.validacaoGuardToken();
  }

  canActivateChild(): boolean {
    return this.validacaoGuardToken();
  }

  validacaoGuardToken() {
    const tokenExpired = this.tokenService.tokenExpired();

    const usuario = this.tokenService.decryptToken();
    if (tokenExpired || usuario.codigo == 0 || !usuario.cpf) {
      this.router.navigate(['/login']);
    }

    return !tokenExpired;
  }
}
