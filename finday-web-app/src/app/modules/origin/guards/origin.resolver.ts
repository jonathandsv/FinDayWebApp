import { ResolveFn } from '@angular/router';
import { OriginService } from '../services/origin.service';
import { inject } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { Origin } from '../interfaces/origin.interface';

export const originResolver: ResolveFn<Observable<Origin>> = (route, state) => {
  const originService = inject(OriginService);

  if (route.params && route.params['id']) {
    return originService.getOriginById(route.params['id'])
      .pipe(
        switchMap((resp) => of(resp.data as Origin)), 
        tap((resp) => console.log('valor da origin: ', resp)));
  }

  const origin: Origin = {
    id: 0,
    name: '',
    description: ''
  };

  return of(origin);
};
