import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Autocomplete } from '../../shared/models/autocomplete';
import { ApiOutput } from '../interfaces/api-output.inteface';
import { IFiltroAutocomplete } from '../interfaces/filtro-auto-complete.interface';

@Injectable()
export class BaseService {
  constructor(
    protected http: HttpClient,
    protected router: Router,
    protected entidade: string
  ) { }

  autoComplete(filtro?: IFiltroAutocomplete) {

    let params = new HttpParams();
    if (filtro) {
      params = params.set('nome', filtro.nome ? filtro.nome : '')
        .set('descricao', filtro.descricao ? filtro.descricao : '')
        .set('ativo', filtro.ativo ? filtro.ativo : '')
        .set('semCadastroPorUsuarioPadrao', filtro.semCadastroPorUsuarioPadrao ? filtro.semCadastroPorUsuarioPadrao : '')
        .set('ehParaConterCelulas', filtro.ehParaConterCelulas ? filtro.ehParaConterCelulas : false )
        .set('timesSemCelulasVinculadas', filtro.timesSemCelulasVinculadas? filtro.timesSemCelulasVinculadas: false)
        .set('ehPraFiltrarPorPapelProfissional', filtro.ehPraFiltrarPorPapelProfissional ? filtro.ehPraFiltrarPorPapelProfissional : false)
        .set('tipoAtendimento', filtro.tipoAtendimento ? filtro.tipoAtendimento : null)
        .set('comDemandasConcluidas', filtro.comDemandasConcluidas ? filtro.comDemandasConcluidas : false)
        .set('mes', filtro.mes ? filtro.mes : null)
        .set('ano', filtro.ano ? filtro.ano : null)
        .set('areaTiVinculadaSistema', filtro.areaTiVinculadaSistema ? filtro.areaTiVinculadaSistema : false );
    }

    return this.http
      .get<ApiOutput<Autocomplete[]>>(
        `${environment.API_OASIS}/${this.entidade}/autocomplete`,
        {
          params,
        }
      )
      .pipe(take(1));
  }
}
