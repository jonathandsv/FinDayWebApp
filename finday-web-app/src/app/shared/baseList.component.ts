import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { adicionarFiltro, IFiltro, limparFiltroSalvo } from './ngrx/reducers/filtro.reducer';

@Component({
  template: '',
})
export abstract class BaseListComponent {
  filtroPesquisaSalvo: any;

  nomeComponente: string;
  page = 1;
  pageSize = 10;
  first = 0;
  sortField?: string = '';
  sortOrder?: string = '';
  totalRecords: number = 0;
  last: number = 0;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public store?: Store<{ filtro: IFiltro }>) {
    this.nomeComponente = this.activatedRoute.routeConfig.component.name;
    this.obterFiltroPesquisaSalvo(this.nomeComponente)
  }

  obterFiltroPesquisaSalvo(nomeComponente: string) {
    this.store.select(state => state).pipe(take(1)).subscribe({
      next: (resp) => {
        if (resp.filtro.nome === nomeComponente) {
          this.filtroPesquisaSalvo = resp.filtro.filtro
          this.page = resp.filtro.paginacao.page;
          this.pageSize = resp.filtro.paginacao.pageSize;
          this.first = resp.filtro.paginacao.first;
          this.sortField = resp.filtro.paginacao.sortField;
          this.sortOrder = resp.filtro.paginacao.sortOrder;
        } else {
          if (resp.filtro.nome) {
            this.store.dispatch(limparFiltroSalvo());
          }
        }
      }
    })
  }

  salvarFiltroPesquisa(form: FormGroup) {

    const filtroNovo: IFiltro = {
      nome: this.nomeComponente,
      filtro: form.value,
      paginacao: {
        page: this.page,
        pageSize: this.pageSize,
        first: this.first,
        sortField: this.sortField,
        sortOrder: this.sortOrder
      }
    }
    this.store.dispatch(adicionarFiltro(filtroNovo));
  }

  preencherFiltroPaginacaoOnInit() {
    this.page = this.page;
    this.pageSize = this.pageSize;
    this.sortField = this.sortField;
    this.sortOrder = this.sortOrder;
    this.first = (this.page - 1) * this.pageSize;
  }

  limparFiltroPesquisa() {
    this.store.dispatch(limparFiltroSalvo());
  }
}
