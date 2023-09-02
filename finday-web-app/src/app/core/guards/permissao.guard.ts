import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { MessageService } from 'primeng/api';
import { emitirMensagem } from 'src/app/shared/utils/emitirMensagem';
import { UserService } from '../services/user.service';

@Injectable()
export class PermissaoGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private userService: UserService,
    public activatedRoute: ActivatedRoute,
    public messageService: MessageService

  ) {
    this.userService.$usuario.subscribe({
      next: (resp) => {}
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.validacaoPermissao(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.validacaoPermissao(route, state);
  }

  validacaoPermissao(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const funcionalidade = route.routeConfig?.data?.funcionalidade;
    const acao = route.routeConfig?.data?.acao;
    if (funcionalidade && acao) {
      if (this.userService.verificarPermissaoAcao(funcionalidade, acao)) {
        return true;
      } else {
        this.router.navigate(['/']);
        emitirMensagem(this.messageService, "warn", "Usuário não autorizado");
        return false
      }
    }
    return true;
  }
}
