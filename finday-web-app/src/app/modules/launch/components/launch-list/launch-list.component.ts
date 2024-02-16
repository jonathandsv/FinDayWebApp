import { Component, OnInit } from '@angular/core';
import { LaunchService } from '../../services/launch.service';
import { LaunchTypeEnum, launch } from '../../interfaces/launch.interface';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ColumnTable } from '../../../../shared/components/table/container/table/table.component';
import { Router } from '@angular/router';
import { Paged } from '../../../../interfaces/paged.interface';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrl: './launch-list.component.scss'
})
export class LaunchListComponent implements OnInit {
  launchs$: Observable<launch[]>;
  public value = 1;
  public totalPages = 10;
  public visibleRangeLength = 5;
  public visiblePages: number[] = [];
  columns: ColumnTable[] = [];

  constructor(private router: Router,
    private launchService: LaunchService) {
    
    this.launchs$ = this.launchService
      .getLaunchList()
      .pipe(
        switchMap((resp) => of(resp.data as Paged<launch>)),
        tap((resp) => this.totalPages = resp.total),
        tap((resp) => this.updateVisiblePages()),
        switchMap((resp) => of(resp.records)),
        tap((resp) => console.log(`valor da lista de lancamentos: `, resp))

      );
  }

  ngOnInit(): void {
    this.buildColumnsTable();
  }

  buildColumnsTable() {
    this.columns = [
      { id: 1, field: 'valueFormated', order: '', header: 'Valor', width: 10},
      { id: 2, field: 'description', order: '', header: 'Descrição', width: 65},
      { id: 3, field: 'categoryName', order: '', header: 'Categoria', width: 20}
    ]
  }

  edit(launch: launch): void  {
    this.router.navigate([`launch/edit/${launch.id}`]);
  }

  private updateVisiblePages(): void {
    const length = Math.min(this.totalPages, this.visibleRangeLength);
    const startIndex = Math.max(
      Math.min(
        this.value - Math.ceil(length / 2),
        this.totalPages - length
      ),
      0
    );
    this.visiblePages = Array.from(
      new Array(length).keys(),
      (item) => item + startIndex + 1
    );
  }
}