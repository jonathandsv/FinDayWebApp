import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiOutput } from '../../../interfaces/api-output.interface';
import { Category } from '../interfaces/category.interface';
import { launch, launchInput, LaunchTypeEnum } from '../interfaces/launch.interface';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {
  url = `${environment.API}/launch`;
  
    constructor(protected http: HttpClient, protected router: Router) {}
  
    getLaunchByType(launchTypeEnum: LaunchTypeEnum): Observable<ApiOutput<launch[]>> {
        let params = new HttpParams();
        params = params.set('launchTypeEnum', launchTypeEnum ? launchTypeEnum : 1);
      return this.http.get<ApiOutput<launch[]>>(`${this.url}/by-type`, { params }).pipe(take(1));
    }
    getLaunchById(id: string): Observable<ApiOutput<launch>> {
        let params = new HttpParams();
        params = params.set('id', id ? id : '');
      return this.http.get<ApiOutput<launch>>(`${this.url}/by-id`, { params })
        .pipe(take(1));
    }

    add(input: launchInput): Observable<ApiOutput<boolean>> {
      return this.http.post<ApiOutput<boolean>>(`${this.url}`, input).pipe(take(1))
    }

    getCategoriesByType(launchTypeEnum: LaunchTypeEnum): Observable<ApiOutput<Category[]>> {
      let params = new HttpParams();
      params = params.set('launchTypeEnum', launchTypeEnum ? launchTypeEnum : 1);
      return this.http.get<ApiOutput<Category[]>>(`${environment.API}/category/by-type`, { params }).pipe(take(1));
    }
}
