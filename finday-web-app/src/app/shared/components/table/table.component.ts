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
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { ColsTable } from '../../models/colsTable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() cols: ColsTable[] = [];
  @Input() registros: any[] = [];
  @Input() isExisteAtivaInativar: boolean = false;
  @Input() isExisteAlterar: boolean = false;
  @Input() isExisteDetalhar: boolean = false;
  @Input() isExisteAnalisar: boolean = false;
  @Input() isExisteAjuste: boolean = false;
  @Input() isExisteAlterarPerfil: boolean = false;
  @Input() isExisteDocumento: boolean = false;
  @Input() isValidarAcoes: boolean = false;

  @Input() isLazy: boolean = false;

  @Input() pageSize: number = 10;

  @Input() onAtivarInativar: (args: any, rowData: any) => void;
  @Input() onAlterar: (args: any) => void;
  @Input() onDetalhar: (args: any) => void;
  @Input() onAnalisar: (args: any) => void;
  @Input() onAjuste: (args: any) => void;
  @Input() exibirAcoes: boolean = true;
  @Input() onAlterarPerfil: (args: any) => void;
  @Input() onDocumentos: (args: any) => void;




  @Output() onLazyLoadTable = new EventEmitter<LazyLoadEvent>();

  @Output() onPage = new EventEmitter<number>();



  @ViewChild('dt') dataTable: Table;

  @Input() totalRecords = 0;

  @Input() first = 0;


  last = 0;
  rows = 10;

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute) {
    const titulo = this.activatedRoute.routeConfig
      ? this.activatedRoute.routeConfig.data.titulo
      : '';
     
     switch(titulo) {

      case "Valor Atendimento":
        this.exibirAcoes = false;
        break;    
      default:
        break;
    }
  }

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

  handleAlterarPerfil(event){
    this.onAlterarPerfil(event);
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

  handleDocumentos(event): void {
    this.onDocumentos(event);
  }
}
