import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';


export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn)
    : Observable<HttpEvent<unknown>> {
    const tokenService = inject(TokenService);
    const expired = tokenService.tokenExpired();
    const router: Router = inject(Router);

      return next(req).pipe(
        catchError((error: any) => {
            errorMessage(req.url, router);
            //this._loading.setLoading(false, req.url);
            return throwError(() => error);
        })
      );
}

function errorMessage(ex: any, router: Router) {
debugger
    if (ex.status === 400) {
      if (!!ex.error) {
        if (typeof ex.error === 'object') {
          if (Array.isArray(ex.error?.messages)) {
            // emitirMensagem(this.messageService, 'warn', ex.error.messages.join('\n'));
            alert(ex.error.messages.join('\n'));
          } else {
            alert(ex.error.message);
          }
        } else {
          alert(ex.error);
        }
      }
      return;
    }
    else if (ex.status === 401) {
      alert(`Usuário não autorizado. \n É necessário realizar o login.`);
      router.navigate(['/login']);
      return;
    } else if (ex.status === 403) {
        alert("Usuário não autorizado");
        return;
    }
    else if (ex.status === 404) {
      alert('o recurso URI não foi encontrado.');
      return;
    } else if (ex.status === 500) {
      alert('Houve um erro interno na aplicação, por favor tente novamente mais tarde ou consulte o suporte');
      return;
    } else {
      alert('Serviço indisponível.');
    }
  }