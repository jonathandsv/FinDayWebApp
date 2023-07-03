import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ApiOutput } from 'src/app/core/interfaces/api-output.interface';
import { IPagination } from 'src/app/core/interfaces/pagination.interface';
import { mountHttpParams } from 'src/app/utils/mountHttpParams';
import { environment } from 'src/environments/environment';

import { ILaunchFilter, ILaunchInput } from './interfaces/launch.interface';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {
  entity = 'launch';
  url = `${environment.API}/${this.entity}`;

  constructor(protected http: HttpClient, protected router: Router) {
    
  }

  getByFilter(filter: ILaunchFilter): Observable<ApiOutput<IPagination<any>>> {
    const params = mountHttpParams(filter);
    return this.http.get<ApiOutput<IPagination<any>>>(this.url, { params }).pipe(take(1));
  }

  add(input: ILaunchInput): Observable<ApiOutput<boolean>> {
    return this.http.post<ApiOutput<boolean>>(`${environment.API}/${this.entity}`, input).pipe(take(1));
  }

  getBalance(): Observable<ApiOutput<any>> {
    return this.http.get<ApiOutput<IPagination<any>>>(`${this.url}/balance`).pipe(take(1));
  }
}

