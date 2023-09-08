import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ApiOutput } from 'src/app/core/interfaces/api-output.inteface';
import { environment } from 'src/environments/environment';
import { planBase } from '../interfaces/plan.interface';

@Injectable({
    providedIn: 'root'
  })
  export class PlanService {
  
    url = `${environment.API_FINDAY}/plans`;
  
    constructor(protected http: HttpClient, protected router: Router) {}
  
    getPlans(): Observable<ApiOutput<planBase[]>> {
      return this.http.get<ApiOutput<planBase[]>>(`${this.url}`).pipe(take(1));
    }
  }
  