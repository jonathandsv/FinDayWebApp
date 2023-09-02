import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthLoginGuard } from './guards/auth.login.guard';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { PermissaoGuard } from './guards/permissao.guard';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    AuthGuard,
    AuthLoginGuard,
    PermissaoGuard
  ],
  bootstrap: [],
})
export class CoreModule {}
