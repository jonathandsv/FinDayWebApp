import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';

import { ColumnTable } from '../../../../shared/components/table/container/table/table.component';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';
import { Paged } from '../../../../interfaces/paged.interface';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  categories$: Observable<Category[]>;
  public value = 1;
  public totalPages = 10;
  public visibleRangeLength = 5;
  public visiblePages: number[] = [];
  columns: ColumnTable[] = [];

  constructor(private router: Router, 
    private categoriesService: CategoryService) {

    this.categories$ = this.categoriesService
        .getCategoryList()
        .pipe(
          switchMap((resp) => of(resp.data as Paged<Category>)),
          tap((resp) => this.totalPages = resp.total),
          // tap((resp) => this.updateVisiblePages()),
          switchMap((resp) => of(resp.records)),
          tap((resp) => console.log(`valor da lista de categorias: `, resp))
  
    );
  }

  ngOnInit(): void {
    this.buildColumnsTable();
  }

  buildColumnsTable() {
    this.columns = [
      { id: 1, field: 'launchTypeFormated', order: '', header: 'Tipo', width: 10},
      { id: 3, field: 'name', order: '', header: 'Nome', width: 20},
      { id: 2, field: 'description', order: '', header: 'Descrição', width: 65}
    ]
  }

  edit(category: Category): void  {
    this.router.navigate([`category/edit/${category.id}`]);
  }
}