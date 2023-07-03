import { HttpParams } from '@angular/common/http';

export function mountHttpParams(filtro: any): HttpParams {
  var httpParams = new HttpParams();
  Object.keys(filtro).forEach(function (key) {
    httpParams = httpParams.set(key, filtro[key] !== null ? filtro[key] : '');
  });
  return httpParams;
}
