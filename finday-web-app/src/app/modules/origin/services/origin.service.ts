import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Origin, OriginInput } from '../interfaces/origin.interface';
import { ApiOutput } from '../../../interfaces/api-output.interface';
import { Observable, take } from 'rxjs';
import { Paged } from '../../../interfaces/paged.interface';

@Injectable({
  providedIn: 'root'
})
export class OriginService {
  url = `${environment.API}/origin`;

  constructor(protected http: HttpClient, protected router: Router) { }

  getOriginById(id: string): Observable<ApiOutput<Origin>> {
    let params = new HttpParams();
    params = params.set('id', id ? id : '');
    return this.http.get<ApiOutput<Origin>>(`${this.url}/by-id`, { params })
      .pipe(take(1));
  }

  getOriginList(): Observable<ApiOutput<Paged<Origin>>> {
    return this.http.get<ApiOutput<Paged<Origin>>>(`${this.url}/list`).pipe(take(1));
  }

  add(input: OriginInput): Observable<ApiOutput<boolean>> {
    return this.http.post<ApiOutput<boolean>>(`${this.url}`, input).pipe(take(1))
  }
  
  update(input: OriginInput): Observable<ApiOutput<boolean>> {
    return this.http.put<ApiOutput<boolean>>(`${this.url}`, input).pipe(take(1))
  }
}
