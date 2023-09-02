import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApiOutput } from 'src/app/core/interfaces/api-output.inteface';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';

import { IEtiqueta } from './components/etiquetas/interfaces/etiqueta.interface';
import { IComentario, IComentarioInput, IComentarioOutput, IComentarioRetorno, IRespostaComentarioInput } from './interfaces/comentario.interface';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService extends BaseService {
  entidade = "comentario";
  url = `${environment.API_OASIS}/${this.entidade}`;

  constructor(protected http: HttpClient, protected router: Router) {
    super(http, router, "comentario");
  }

  adicionar(input: IComentarioInput): Observable<ApiOutput<IComentarioRetorno>> {
    return this.http.post<ApiOutput<IComentarioRetorno>>(`${environment.API_OASIS}/${this.entidade}`, input).pipe(take(1));
  }

  alterar(input: IComentarioInput): Observable<ApiOutput<IComentarioRetorno>> {
    return this.http.put<ApiOutput<IComentarioRetorno>>(`${environment.API_OASIS}/${this.entidade}`, input).pipe(take(1));
  }

  obterComentarioPorCodigo(codigo: number): Observable<ApiOutput<IComentario[]>> {
    return this.http.get<ApiOutput<IComentario[]>>(`${environment.API_OASIS}/${this.entidade}/${codigo}`).pipe(take(1));
  }

  obterComentarioPorCodigoTarefa(codigo: number): Observable<ApiOutput<IComentarioOutput>> {
    return this.http.get<ApiOutput<IComentarioOutput>>(`${environment.API_OASIS}/${this.entidade}/por-tarefa/${codigo}`).pipe(take(1));
  }

  obterEtiquetasPorComentario(codigo: number): Observable<ApiOutput<IEtiqueta[]>> {
    return this.http.get<ApiOutput<IEtiqueta[]>>(`${environment.API_OASIS}/${this.entidade}/obter-etiquetas/${codigo}`).pipe(take(1));
  }

  obterEtiquetasPadrao(): Observable<ApiOutput<IEtiqueta[]>> {
    return this.http.get<ApiOutput<IEtiqueta[]>>(`${environment.API_OASIS}/${this.entidade}/etiquetas`).pipe(take(1));
  }

  adicionarEtiqueta(codigoComentario: number, codigoEtiqueta: number) {
    return this.http.post<ApiOutput<IComentarioRetorno>>(`${environment.API_OASIS}/${this.entidade}/etiquetas`, {codigoComentario, codigoEtiqueta}).pipe(take(1));
  }

  excluirEtiqueta(codigoComentario: number, codigoEtiqueta: number) {
    return this.http.put<ApiOutput<IComentarioRetorno>>(`${environment.API_OASIS}/${this.entidade}/etiquetas`, {codigoComentario, codigoEtiqueta}).pipe(take(1));
  }

  adicionarRespostaComentario(input: IRespostaComentarioInput): Observable<ApiOutput<IComentarioRetorno>> {
    return this.http.post<ApiOutput<IComentarioRetorno>>(`${environment.API_OASIS}/${this.entidade}/resposta-comentario`, input).pipe(take(1));
  }
}