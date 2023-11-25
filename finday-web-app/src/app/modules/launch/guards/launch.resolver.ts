import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LaunchService } from '../services/launch.service';
import { Observable, of, switchMap, tap } from 'rxjs';
import { launch } from '../interfaces/launch.interface';

export const launchResolver: ResolveFn<Observable<launch>> = (route, state) => {
  const launchService = inject(LaunchService);

  if (route.params && route.params['id']) {
    return launchService.getLaunchById(route.params['id'])
      .pipe(
        switchMap((resp) => of(resp.data as launch)), 
        tap((resp) => console.log('valor do lancamento: ', resp)));
  }

  const launch: launch = {
    isInstallment: false,
    timesInstallment: 0
  };

  return of(launch);
};
