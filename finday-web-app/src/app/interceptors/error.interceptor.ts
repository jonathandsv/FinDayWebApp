import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { ToastService } from '../components/toast/toast.service';


export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn)
    : Observable<HttpEvent<unknown>> {
    const tokenService = inject(TokenService);
    const expired = tokenService.tokenExpired();
    const router: Router = inject(Router);
    const toastService = inject(ToastService);

      return next(req).pipe(
        catchError((error: any) => {
            errorMessage(error, router, toastService);
            //this._loading.setLoading(false, req.url);
            return throwError(() => error);
        })
      );
}

function errorMessage(ex: any, router: Router, toastService: ToastService) {
    if (ex.status === 400) {
      if (!!ex.error) {
        if (typeof ex.error === 'object') {
          if (Array.isArray(ex.error?.messages)) {
            toastService.show({ message: ex.error.messages.join('\n'), classname: 'bg-info text-light', delay: 10000 });
          } else {
            toastService.show({ message: ex.error.message, classname: 'bg-info text-light', delay: 10000 });
          }
        } else {
          toastService.show({ message: ex.error, classname: 'bg-danger text-light', delay: 10000 });
        }
      }
      return;
    }
    else if (ex.status === 401) {
      toastService.show({ message: `Usuário não autorizado. \n É necessário realizar o login.`, classname: 'bg-danger text-light', delay: 10000 });
      router.navigate(['/login']);
      return;
    } else if (ex.status === 403) {
        toastService.show({ message: `Usuário não autorizado.`, classname: 'bg-danger text-light', delay: 10000 });
        return;
    }
    else if (ex.status === 404) {
      toastService.show({ message: `o recurso URI não foi encontrado.`, classname: 'bg-danger text-light', delay: 10000 });
      return;
    } else if (ex.status === 500) {
      toastService.show({ message: 'Houve um erro interno na aplicação, por favor tente novamente mais tarde ou consulte o suporte', classname: 'bg-danger text-light', delay: 10000 });
      return;
    } else {
      toastService.show({ message: 'Serviço indisponível.', classname: 'bg-danger text-light', delay: 10000 });
    }
  }