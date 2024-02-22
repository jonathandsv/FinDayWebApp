import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { Wallet } from '../interfaces/wallet.interface';
import { WalletService } from '../services/wallet.service';

export const walletResolver: ResolveFn<Observable<Wallet>> = (route, state) => {
  const walletService = inject(WalletService);

  if (route.params && route.params['id']) {
    return walletService.getWalletById(route.params['id'])
      .pipe(
        switchMap((resp) => of(resp.data as Wallet)), 
        tap((resp) => console.log('valor da wallet: ', resp)));
  }

  const wallet: Wallet = {};

  return of(wallet);
};