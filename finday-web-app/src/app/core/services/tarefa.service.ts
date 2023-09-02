import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TarefaService extends BaseService {
  entidade = 'tarefa';

  constructor(protected http: HttpClient, protected router: Router) {
    super(http, router, 'tarefa');
  }
}
