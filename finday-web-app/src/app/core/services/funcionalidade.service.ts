import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  FuncionalidadeAlterarDTO,
  FuncionalidadeIncluirDTO,
  FuncionalidadeListaDTO,
  FuncionalidadeListaOutput,
  FuncionalidadeObterDTO,
} from 'src/app/modules/private/funcionalidade/funcionalidade.interface';
import { montaHttpParams } from 'src/app/shared/utils/montaHttpParams';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class FuncionalidadeService extends BaseService {
  entidade = 'funcionalidade';
  url = `${environment.API_OASIS}/${this.entidade}`;

  constructor(protected http: HttpClient, protected router: Router) {
    super(http, router, 'funcionalidade');
  }

  obterTodosPorFiltro(filtro: FuncionalidadeListaDTO) {
    const params = montaHttpParams(filtro);
    return this.http.get<FuncionalidadeListaOutput[]>(this.url, {
      params,
    });
  }

  incluir(obj: FuncionalidadeIncluirDTO) {
    return this.http.post(this.url, obj);
  }

  alterar(id: number, obj: FuncionalidadeAlterarDTO) {
    return this.http.put(`${this.url}/${id}`, obj);
  }

  obterPorId(id: number) {
    return this.http.get<FuncionalidadeObterDTO>(
      `${environment.API_OASIS}/${this.entidade}/${id}`
    );
  }
}
