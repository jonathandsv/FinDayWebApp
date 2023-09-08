import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/services/loading-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _loading: LoadingService,
    private router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
        this.tratarMensagemRetornoErro(error);
        this._loading.setLoading(false, req.url);
        return throwError(error);
      })
    );
  }

  tratarMensagemRetornoErro(ex: any) {

    if (ex.status === 400) {
      if (!!ex.error) {
        if (typeof ex.error === 'object') {
          if (Array.isArray(ex.error?.messages)) {
            // emitirMensagem(this.messageService, 'warn', ex.error.messages.join('\n'));
            console.log('erro: ', ex.error);
          } else {
            // emitirMensagem(this.messageService, 'warn', ex.error.message);
            console.log('erro: ', ex.error);
          }
        } else {
          // emitirMensagem(this.messageService, 'warn', ex.error);
          console.log('erro: ', ex.error);
        }
      }
      return;
    }
    else if (ex.status === 401) {
      // emitirMensagem(
      //   this.messageService,
      //   'warn',
      //   `Usuário não autorizado. \n É necessário realizar o login.`
      // );
      console.log('não autorizado ')
      this.router.navigate(['/login']);
      return;
    } else if (ex.status === 403) {
        // emitirMensagem(this.messageService, "error", "Usuário não autorizado");
        console.log('Usuário não autorizado"');
        return;
    }
    else if (ex.status === 404) {
      // emitirMensagem(
      //   this.messageService,
      //   'warn',
      //   'o recurso URI não foi encontrado.'
      // );
      console.log('o recurso URI não foi encontrado.');
      return;
    } else if (ex.status === 500) {
      // emitirMensagem(
      //   this.messageService,
      //   'error',
      //   'Houve um erro interno na aplicação, por favor tente novamente mais tarde ou consulte o suporte'
      // );
      console.log('Houve um erro interno na aplicação, por favor tente novamente mais tarde ou consulte o suporte');
      return;
    } else {
      // emitirMensagem(this.messageService, 'error', 'Serviço indisponível.');
      console.log('Serviço indisponível.');
    }
  }
}
