import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiOutput } from '../../../interfaces/api-output.interface';
import { Category, categoryInput } from '../interfaces/category.interface';
import { Paged } from '../../../interfaces/paged.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  url = `${environment.API}/category`;

  constructor(protected http: HttpClient, protected router: Router) { }

  getCategoryById(id: string): Observable<ApiOutput<Category>> {
    let params = new HttpParams();
    params = params.set('id', id ? id : '');
    return this.http.get<ApiOutput<Category>>(`${this.url}/by-id`, { params })
      .pipe(take(1));
  }

  getCategoryList(): Observable<ApiOutput<Paged<Category>>> {
    return this.http.get<ApiOutput<Paged<Category>>>(`${this.url}/list`).pipe(take(1));
  }

  add(input: categoryInput): Observable<ApiOutput<boolean>> {
    return this.http.post<ApiOutput<boolean>>(`${this.url}`, input).pipe(take(1))
  }
  
  update(input: categoryInput): Observable<ApiOutput<boolean>> {
    return this.http.put<ApiOutput<boolean>>(`${this.url}`, input).pipe(take(1))
  }
}