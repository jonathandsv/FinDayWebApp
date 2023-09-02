import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { ApiOutput } from '../interfaces/api-output.inteface';
import { IMenu } from '../interfaces/menu.interface';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends BaseService {
  entidade = 'menu';

  constructor(protected http: HttpClient, protected router: Router) {
    super(http, router, 'menu');
  }


  obterMenu(): Observable<ApiOutput<IMenu[]>> {
    return this.http.get<ApiOutput<IMenu[]>>(`${environment.API_OASIS}/${this.entidade}`).pipe(take(1));
  }
}
