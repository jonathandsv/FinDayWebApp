import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() field: string;
  @Input() fieldFiltro: string;
  @Input() messageFildInvalid: string;
  @Input() name: string;
  @Input() lista: any;
  @Input() disabled: boolean = false;
  @Input() formSubmit: boolean;
  @Input() mostrarValid = true;
  @Output() Itemselecionado = new EventEmitter();
  @Input() isCampoNome = false;
  @Input() touched = false;

  arrayPorTipo: any;
  filtroComplete: any;
  constructor() { }
  ngOnInit() {
  }
  get f() { return this.formGroup.controls; }

  pesquisar(event) {
    this.arrayPorTipo = null;
    let query = '';
    if (event && event.query) {
      query = event.query;
    }
    setTimeout(() => {
      this.filtroComplete = this.removeAcento(query);
      if (!this.isCampoNome) {
        if (this.lista && this.lista.length > 0) {
            this.arrayPorTipo = this.lista.filter(option => this.removeAcento(String(option.codigo) + ' - ' + String(option.nome)).toLowerCase()
              .includes(this.filtroComplete.toLowerCase())).splice(0, 1000);
        } else {
          this.arrayPorTipo = [];
        }
        if (this.arrayPorTipo.length === 0) {
          this.arrayPorTipo = [{ codigo: null, nome: 'Registro não Encontrado!' }];
        }
      }
      else {
        if (this.lista && this.lista.length > 0) {
          this.arrayPorTipo = this.lista.filter(option => String(option.nome).toLowerCase()
            .includes(this.filtroComplete.toLowerCase())).splice(0, 1000);
        }
        if (this.arrayPorTipo.length === 0) {
          this.arrayPorTipo = [{ codigo: null, nome: 'Registro não Encontrado!' }];
        }
      }
    }, 1);
  }
  selecionar(item: any) {
    if (this.isCampoNome) {
      this.f[this.name].patchValue(item, { emit: false });
      this.Itemselecionado.emit(item);
    }
    else {
      if (item.codigo !== null) {
        this.f[this.name].patchValue(item, { emit: false });
        this.Itemselecionado.emit(item);
      } else {
        this.f[this.name].setValue('');
      }
    }
  }
  inTouched(el) {
    if (!this.isCampoNome) {
      if (!this.formGroup.get(this.name).value || !this.formGroup.get(this.field).value) {
        this.f[this.name].patchValue('', { emit: false });
        this.formGroup.get(this.field).setValue('')
        this.Itemselecionado.emit('');
        this.touched = true;
      }
    }
  }
  removeAcento(text: string): string {
    return text.replace(new RegExp('[áàâã]', 'gi'), 'a')
      .replace(new RegExp('[éèê]', 'gi'), 'e')
      .replace(new RegExp('[íìî]', 'gi'), 'i')
      .replace(new RegExp('[óòôõ]', 'gi'), 'o')
      .replace(new RegExp('[úùû]', 'gi'), 'u')
      .replace(new RegExp('[ç]', 'gi'), 'c')
      .replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'A')
      .replace(new RegExp('[ÉÈÊ]', 'gi'), 'E')
      .replace(new RegExp('[ÍÌÎ]', 'gi'), 'I')
      .replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'O')
      .replace(new RegExp('[ÚÙÛ]', 'gi'), 'U')
      .replace(new RegExp('[Ç]', 'gi'), 'C');
  }
}
