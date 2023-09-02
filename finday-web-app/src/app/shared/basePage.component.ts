import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { setarTituloPagina } from './utils/setarTituloPagina';

@Component({
  template: '',
})
export abstract class BasePageComponent implements OnInit {
  public isInclusao = false;


  constructor(public router: Router, public activatedRoute: ActivatedRoute) {
    this.isInclusao = this.getOperacao() === 'cadastrar';

    const titulo = this.activatedRoute.routeConfig
      ? this.activatedRoute.routeConfig.data?.titulo
      : '';

    setarTituloPagina(`Oasis Ágil ${titulo ? '- ' + titulo : ''}`);

  }

  ngOnInit() {}

  getOperacao() {
    return this.activatedRoute.routeConfig
      ? this.activatedRoute.routeConfig.data?.breadcrumb
      : '';
  }
}
