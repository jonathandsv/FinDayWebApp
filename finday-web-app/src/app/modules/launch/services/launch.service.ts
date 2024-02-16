import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiOutput } from '../../../interfaces/api-output.interface';
import { launch, launchInput } from '../interfaces/launch.interface';
import { Paged } from '../../../interfaces/paged.interface';
import { LaunchTypeEnum } from '../../../enums/launch.enum';
import { Category } from '../../category/interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {
  url = `${environment.API}/launch`;
  
    constructor(protected http: HttpClient, protected router: Router) {}

    getLaunchList(): Observable<ApiOutput<Paged<launch>>> {
      // let params = new HttpParams();
      // params = params.set('launchTypeEnum', launchTypeEnum ? launchTypeEnum : 1);
      return this.http.get<ApiOutput<Paged<launch>>>(`${this.url}/list`).pipe(take(1));
    }
  
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
    
    update(input: launchInput): Observable<ApiOutput<boolean>> {
      return this.http.put<ApiOutput<boolean>>(`${this.url}`, input).pipe(take(1))
    }

    getCategoriesByType(launchTypeEnum: LaunchTypeEnum): Observable<ApiOutput<Category[]>> {
      let params = new HttpParams();
      params = params.set('launchTypeEnum', launchTypeEnum ? launchTypeEnum : 1);
      return this.http.get<ApiOutput<Category[]>>(`${environment.API}/category/by-type`, { params }).pipe(take(1));
    }
}
