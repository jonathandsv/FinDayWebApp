import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IEtiqueta } from './interfaces/etiqueta.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { removeAcento } from 'src/app/shared/utils/removeAcentos';

@Component({
  selector: 'app-etiquetas-popover',
  templateUrl: './etiquetas.component.html',
  styleUrls: ['./etiquetas.component.scss']
})
export class EtiquetasComponent implements OnInit {
  @Input() mostrarListarEtiquetas: boolean;
  @Input() listaEtiquetas: IEtiqueta[];
  @Output() adicionarEtiquetaComentario = new EventEmitter<IEtiqueta>();
  @Output() excluirEtiquetaComentario = new EventEmitter<IEtiqueta>();
  mostrarPopover = false;
  listarEtiquetas = true;
  cadastrarEtiquetas = false;
  listaEtiquetasFiltradas: IEtiqueta[] = [];
  form: FormGroup;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      pesquisa: ['']
    });
  }

  manipularEtiqueta(etiqueta: IEtiqueta): void {
    if (etiqueta.marcado) {
      this.adicionarEtiqueta(etiqueta);
    }
    else {
      this.excluirEtiqueta(etiqueta);
    }
  }

  adicionarEtiqueta(etiqueta: IEtiqueta): void {
    debugger
    this.listaEtiquetasFiltradas.map(x => { if (x.codigo == etiqueta.codigo) x.marcado = true })
    this.adicionarEtiquetaComentario.emit(etiqueta);
  }

  excluirEtiqueta(etiqueta: IEtiqueta): void {
    debugger
    this.listaEtiquetasFiltradas.map(x => { if (x.codigo == etiqueta.codigo) x.marcado = false })
    this.excluirEtiquetaComentario.emit(etiqueta);
  }

  filtrarEtiquetas(): void  {
    const pesquisa = this.form.get('pesquisa').value;

    this.listaEtiquetas = this.listaEtiquetas
      .filter(x => removeAcento(x.nome)
      .toLowerCase().includes(removeAcento(pesquisa).toLowerCase()));
  }
}