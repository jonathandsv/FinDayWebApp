import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiOutput } from '../../../interfaces/api-output.interface';
import { Paged } from '../../../interfaces/paged.interface';
import { Wallet, WalletInput } from '../interfaces/wallet.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  url = `${environment.API}/wallet`;

  constructor(protected http: HttpClient, protected router: Router) { }

  getWalletsForUser(): Observable<ApiOutput<Wallet[]>> {
    return this.http.get<ApiOutput<Wallet[]>>(`${this.url}/user`).pipe(take(1));
  }

  getWalletById(id: string): Observable<ApiOutput<Wallet>> {
    let params = new HttpParams();
    params = params.set('id', id ? id : '');
    return this.http.get<ApiOutput<Wallet>>(`${this.url}/by-id`, { params })
      .pipe(take(1));
  }

  getWalletList(): Observable<ApiOutput<Paged<Wallet>>> {
    return this.http.get<ApiOutput<Paged<Wallet>>>(`${this.url}/list`).pipe(take(1));
  }

  add(input: WalletInput): Observable<ApiOutput<boolean>> {
    debugger
    return this.http.post<ApiOutput<boolean>>(`${this.url}`, input).pipe(take(1))
  }
  
  update(input: WalletInput): Observable<ApiOutput<boolean>> {
    return this.http.put<ApiOutput<boolean>>(`${this.url}`, input).pipe(take(1))
  }
}