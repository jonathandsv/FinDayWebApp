import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { CategoryService } from '../services/category.service';

export const categoryResolver: ResolveFn<Observable<Category>> = (route, state) => {
  const categoryService = inject(CategoryService);

  if (route.params && route.params['id']) {
    return categoryService.getCategoryById(route.params['id'])
      .pipe(
        switchMap((resp) => of(resp.data as Category)), 
        tap((resp) => console.log('valor da categoriaa: ', resp)));
  }

  const category: Category = {};

  return of(category);
};
