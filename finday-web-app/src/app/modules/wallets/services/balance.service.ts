import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ApiOutput } from 'src/app/core/interfaces/api-output.inteface';
import { environment } from 'src/environments/environment';
import { balanceMonth } from '../interfaces/balance.interface';

@Injectable({
    providedIn: 'root'
  })
  export class BalanceService {
  
    url = `${environment.API_FINDAY}/balance`;
  
    constructor(protected http: HttpClient, protected router: Router) {}
  
    getBalancesByMonth(month: number): Observable<ApiOutput<balanceMonth[]>> {
        let params = new HttpParams();
        params = params.set('month', month ? month : 1);
      return this.http.get<ApiOutput<balanceMonth[]>>(`${this.url}/${month}`).pipe(take(1));
    }
  }
  