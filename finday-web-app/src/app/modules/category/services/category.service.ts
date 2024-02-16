import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiOutput } from '../../../interfaces/api-output.interface';
import { Category } from '../interfaces/category.interface';

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
}