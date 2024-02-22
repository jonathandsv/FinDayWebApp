import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';

import { Paged } from '../../../../interfaces/paged.interface';
import { ColumnTable } from '../../../../shared/components/table/container/table/table.component';
import { Origin } from '../../interfaces/origin.interface';
import { OriginService } from '../../services/origin.service';

@Component({
  selector: 'app-origin-list',
  templateUrl: './origin-list.component.html',
  styleUrl: './origin-list.component.scss'
})
export class OriginListComponent {
  origins$: Observable<Origin[]>;
  public value = 1;
  public totalPages = 10;
  public visibleRangeLength = 5;
  public visiblePages: number[] = [];
  columns: ColumnTable[] = [];

  constructor(private router: Router, 
    private originService: OriginService) {

    this.origins$ = this.originService
        .getOriginList()
        .pipe(
          switchMap((resp) => of(resp.data as Paged<Origin>)),
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
      { id: 3, field: 'name', order: '', header: 'Nome', width: 20},
      { id: 2, field: 'description', order: '', header: 'Descrição', width: 65}
    ]
  }

  edit(origin: Origin): void  {
    this.router.navigate([`origin/edit/${origin.id}`]);
  }
}