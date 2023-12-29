import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ColumnTable {
  id: number;
  field: string;
  displayField?: string;
  order?: string;
  header: string;
  width: number;
  css?: string;
  headerCss?: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalRecords: number = 0;
  @Input() columns: ColumnTable[] = [];
  @Input() records: any[] | null = [];
  @Input() sortable: boolean = false;

  @Output() onPage = new EventEmitter<any>();
  @Output() onSort = new EventEmitter<any>();
  @Output() onPageSize = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<any>();

  constructor() {

  }
  ngOnInit(): void {
    
  }

  sort(column: ColumnTable): void {
    if (column && column.field) {
      column.order = column.order == 'asc' ? 'desc' : 'asc';
      this.onSort.emit(column);
    }
  }

  pageChanged(event: any): void {
    this.onPage.emit(event);
  }

  pageSizeChanged(event: any): void {
    this.onPageSize.emit(event);
  }

  edit(record: any): void {
    this.onEdit.emit(record);
  }
}