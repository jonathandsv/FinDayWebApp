import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApiOutput } from 'src/app/core/interfaces/api-output.inteface';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { IArquivo } from '../interfaces/IArquivo';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService extends BaseService {

  url = `${environment.API_OASIS}/arquivo`;

  constructor(protected http: HttpClient, protected router: Router) {
    super(http, router, 'arquivo');
  }

  obterArquivoPorCodigo(codigo: number): Observable<ApiOutput<IArquivo>> {
    return this.http.get<ApiOutput<IArquivo>>(`${this.url}/${codigo}`).pipe(take(1));
  }

  obterArquivosPorNumeroDemanda(numeroDemanda: number, numeroDemandaAno: number): Observable<ApiOutput<IArquivo[]>> {
    return this.http.get<ApiOutput<IArquivo[]>>(`${this.url}/${numeroDemanda}/${numeroDemandaAno}`).pipe(take(1));
  }
  obterArquivosPorNumeroTarefa(numeroTarefa: number): Observable<ApiOutput<IArquivo[]>> {
    return this.http.get<ApiOutput<IArquivo[]>>(`${this.url}/${numeroTarefa}`).pipe(take(1));
  }

  excluir(codigo: number): Observable<ApiOutput<boolean>> {
    return this.http.post<ApiOutput<boolean>>(`${environment.API_OASIS}/${this.entidade}/excluir`, codigo).pipe(take(1));
  }
}
