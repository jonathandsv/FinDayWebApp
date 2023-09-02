import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IColumnTable } from './column-table.interface';

@Component({
  selector: 'oasis-table',
  templateUrl: './oasis-table.component.html',
  styleUrls: ['./oasis-table.component.scss']
})
export class OasisTableComponent implements OnInit {

  @Input() page: number;
  @Input() pageSize: number;
  @Input() totalRecords: number;
  @Input() columns: Array<IColumnTable> = [];
  @Input() records: Array<any> = [];
  @Input() actions : Array<any> = [];

  @Input() activateNestedTable: boolean = false;
  @Input() nestedTableColumns: Array<any> = [];
  @Input() nestedTableRecordsProperty: string = '';

  @Input() sortable: boolean = true;



  @Input() selectable: boolean = false;

  @Input() tbodyTemplate: TemplateRef<any>;


  @Output() onPage = new EventEmitter<PageChangedEvent>();

  @Output() onSort = new EventEmitter<any>();

  @Output() onPageSize = new EventEmitter<number>();

  @Input() selectAllRecords: boolean = false;
  @Output() onSelectAll = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  sort(column: any) {
    if (column && column.field) {
      column.order = column.order === 'asc' ? 'desc' : 'asc';
      this.onSort.emit(column);
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.onPage.emit(event);
  }

  pageSizeChanged(event: number) {
    this.onPageSize.emit(event);
  }

  selectAll(event) {
    if(this.selectAllRecords){
      this.records.map(x => x.selected = true);
    } else {
      this.records.map(x => x.selected = false);
    }
    this.onSelectAll.emit(this.selectAllRecords);
  }
}
