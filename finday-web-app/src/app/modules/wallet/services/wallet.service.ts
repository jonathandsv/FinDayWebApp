import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiOutput } from '../../../interfaces/api-output.interface';
import { Wallet } from '../interfaces/wallet.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  url = `${environment.API}/wallet`;

  constructor(protected http: HttpClient, protected router: Router) { }

  getWalletsForUser(month: number): Observable<ApiOutput<Wallet[]>> {
    return this.http.get<ApiOutput<Wallet[]>>(`${this.url}/user`).pipe(take(1));
  }
}