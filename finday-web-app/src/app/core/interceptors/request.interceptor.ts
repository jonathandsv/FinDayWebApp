import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/services/loading-service.service';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private _loading: LoadingService,
    private tokenService: TokenService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, req.url);

    const expired = this.tokenService.tokenExpired();

    if (!expired) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.tokenService.getToken()),
      });
    }

    return next.handle(req).pipe(
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this._loading.setLoading(false, req.url);
        }
        return evt;
      })
    );
  }
}