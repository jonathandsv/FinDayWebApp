import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';


export function requestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn)
    : Observable<HttpEvent<unknown>> {
    const tokenService = inject(TokenService);
    const expired = tokenService.tokenExpired();
  
      if (!expired) {
        req = req.clone({
          headers: req.headers.append('Authorization', 'Bearer ' + tokenService.getToken()),
        });
      }
  
      return next(req).pipe(
        // map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        //   if (evt instanceof HttpResponse) {
        //     //this._loading.setLoading(false, req.url);
        //   }
        //   return evt;
        // })
      );
}