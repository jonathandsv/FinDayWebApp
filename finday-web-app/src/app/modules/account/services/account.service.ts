import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { LoginUser } from '../models/login-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  protected urlAutentication: string = environment.urlAutentication;

  constructor(public http: HttpClient) { }

  login(user: LoginUser): Observable<LoginUser> {
    return this.http
        .post<LoginUser>(`${this.urlAutentication}/account/login`, user)
        .pipe(take(1));
  }
}