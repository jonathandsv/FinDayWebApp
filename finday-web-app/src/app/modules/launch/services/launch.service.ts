import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ApiOutput } from 'src/app/core/interfaces/api-output.inteface';
import { environment } from 'src/environments/environment';

import { LaunchTypeEnum, launch, launchInput } from '../interfaces/launch.interface';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
    providedIn: 'root'
  })
  export class LaunchService {
  
    url = `${environment.API_FINDAY}/launch`;
  
    constructor(protected http: HttpClient, protected router: Router) {}
  
    getLaunchByType(launchTypeEnum: LaunchTypeEnum): Observable<ApiOutput<launch[]>> {
        let params = new HttpParams();
        params = params.set('launchTypeEnum', launchTypeEnum ? launchTypeEnum : 1);
      return this.http.get<ApiOutput<launch[]>>(`${this.url}/by-type`, { params }).pipe(take(1));
    }

    add(input: launchInput): Observable<ApiOutput<boolean>> {
      return this.http.post<ApiOutput<boolean>>(`${this.url}`, input).pipe(take(1))
    }

    getCategoriesByType(launchTypeEnum: LaunchTypeEnum): Observable<ApiOutput<ICategory[]>> {
      let params = new HttpParams();
      params = params.set('launchTypeEnum', launchTypeEnum ? launchTypeEnum : 1);
      return this.http.get<ApiOutput<ICategory[]>>(`${environment.API_FINDAY}/category/by-type`, { params }).pipe(take(1));
    }
  }
  