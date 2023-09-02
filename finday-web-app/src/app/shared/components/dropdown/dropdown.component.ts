import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
  })
  export class DropdownComponent implements OnInit { 
    
    @Output() exportar = new EventEmitter();

    ngOnInit() {
    }

    exportarRelatorio(tipo: string) {
        this.exportar.emit(tipo);
    }
  }