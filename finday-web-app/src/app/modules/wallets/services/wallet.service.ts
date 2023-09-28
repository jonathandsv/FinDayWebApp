import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ApiOutput } from 'src/app/core/interfaces/api-output.inteface';
import { environment } from 'src/environments/environment';
import { IWallet } from '../interfaces/wallet.interface';

@Injectable({
    providedIn: 'root'
  })
  export class WalletService {
  
    url = `${environment.API_FINDAY}/wallet`;
  
    constructor(protected http: HttpClient, protected router: Router) {}
  
    getWalletsForUser(month: number): Observable<ApiOutput<IWallet[]>> {
      return this.http.get<ApiOutput<IWallet[]>>(`${this.url}/user`).pipe(take(1));
    }
  }