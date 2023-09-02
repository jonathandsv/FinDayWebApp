import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { ColsTable } from '../../models/colsTable';

@Component({
  selector: 'app-table-with-expand',
  templateUrl: './table-with-expand.component.html',
  styleUrls: ['./table-with-expand.component.scss'],
})
export class TableWithExpandComponent implements OnInit, OnChanges {
  @Input() cols: ColsTable[] = [];
  @Input() registros: any[] = [];
  @Input() isExisteAtivaInativar: boolean = false;
  @Input() isExisteAlterar: boolean = false;
  @Input() isExisteDetalhar: boolean = false;
  @Input() isExisteAnalisar: boolean = false;
  @Input() isExisteAjuste: boolean = false;
  @Input() nameChildTable = [];
  @Input() childNameList = "";
  @Input() fieldChildTable = [];
  @Input() isValidarAcoes: boolean = false;

  @Input() isLazy: boolean = false;

  @Input() pageSize: number = 10;
  @Input() dataKey: string = 'codigo';

  @Input() onAtivarInativar: (args: any, rowData: any) => void;
  @Input() onAlterar: (args: any) => void;
  @Input() onDetalhar: (args: any) => void;
  @Input() onAnalisar: (args: any) => void;
  @Input() onAjuste: (args: any) => void;




  @Output() onLazyLoadTable = new EventEmitter<LazyLoadEvent>();

  @Output() onPage = new EventEmitter<number>();



  @ViewChild('dt') dataTable: Table;

  @Input() totalRecords = 0;

  @Input() first = 0;


  last = 0;
  rows = 10;

  constructor(public router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit() {
    this.totalRecords = this.registros.length;
  }

  handleAtivaInativar(event, rowData) {
    this.onAtivarInativar(event, rowData);
  }

  handleAlterar(event) {
    this.onAlterar(event);
  }

  handleDetalhar(event) {
    this.onDetalhar(event);
  }

  handleAnalisar(event) {
    this.onAnalisar(event);
  }

  handleAjuste(event) {
    this.onAjuste(event);
  }

  handleLazyLoad(event: LazyLoadEvent) {
    this.onLazyLoadTable.emit(event);
  }

  paginando(event: number){
    this.onPage.emit(event);
  }

  resetSort() {
    this.dataTable.sortOrder = 0;
    this.dataTable.sortField = '';
    this.dataTable.reset();
  }
}
