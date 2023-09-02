import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

import { ComentarioService } from '../comentario.service';
import { IComentarioInput, IRespostaComentarioInput } from '../interfaces/comentario.interface';
import { IEtiqueta } from '../components/etiquetas/interfaces/etiqueta.interface';

@Component({
  selector: 'app-comentario-form',
  templateUrl: './comentario-form.component.html',
  styleUrls: ['./comentario-form.component.scss']
})
export class ComentarioFormComponent implements OnInit {
  @Input() codigoTarefa: number = 0;
  @Input() codigoComentario: number = 0;
  @Input() codigoRespostaComentarioPai: number = 0;
  @Input() eRespostaComentario: boolean = false;
  @Input() cadastrarComentarioComEtiqueta: boolean = false;
  @Input() listaEtiquetas: IEtiqueta[];
  @Output() atualizarListaComentarios = new EventEmitter<any[]>();
  @Output() cancelarAdicaoDeComentario = new EventEmitter<any[]>();
  formComentario: FormGroup;
  codigoUsuario: number;
  nomeUsuario: string;
  modoEdicao: boolean = false;
  listaEtiquetasParaCadastrar: IEtiqueta[] = [];

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private comentarioService: ComentarioService) {
    this.userService.$usuario.subscribe({
      next: (resp) => {
        this.codigoUsuario = resp.codigo;
        this.nomeUsuario = resp.nome;
      }
    })
  }


  ngOnInit(): void {
    this.formComentario = this.fb.group({
      descricao: ['', Validators.required]
    })

  }

  adicionar(): void {
    if (this.formComentario.invalid) {
      return
    }
    const descricao = this.formComentario.get('descricao').value;
    //buscar do usuario logado
    const objeto: IComentarioInput = {
      descricao: descricao,
      codigoProfissional: this.codigoUsuario,
      codigoTarefa: this.codigoTarefa,
      listaEtiquetas: this.listaEtiquetasParaCadastrar
    }

    this.comentarioService.adicionar(objeto).subscribe({
      next: (resp) => {
        this.atualizarListaComentarios.emit();
        this.limpar();
      }
    })
  }
  adicionarRespostaComentario(): void {
    if (this.formComentario.invalid) {
      return
    }
    
    const descricao = this.formComentario.get('descricao').value;
    
    const objeto: IRespostaComentarioInput = {
      descricao: descricao,
      codigoProfissional: this.codigoUsuario,
      codigoTarefa: this.codigoTarefa,
      codigoComentario: this.codigoComentario,
      codigoRespostaComentarioPai: this.codigoRespostaComentarioPai,
    }

    this.comentarioService.adicionarRespostaComentario(objeto).subscribe({
      next: (resp) => {
        this.atualizarListaComentarios.emit();
        this.limpar();
      }
    })
  }

  modoDeEdicao() {
    this.modoEdicao = true;
  }

  limpar() {
    this.formComentario.reset();
    this.listaEtiquetasParaCadastrar = [];
  }

  cancelarComentario() {
    this.modoEdicao = false;
    this.formComentario.get('descricao').setValue('');
    this.cancelarAdicaoDeComentario.emit();
  }

  fecharPopoverEtiquetas() {

  }

  adicionarEtiqueta(etiqueta): void {
    this.listaEtiquetasParaCadastrar.push(etiqueta);
    this.listaEtiquetas.map(x => {
      if (x.codigo == etiqueta.codigo) {
        x.marcado = true;
      }
    })
  }

  excluirEtiqueta(etiqueta): void {
    const etiquetaSelecionadoIndex = 
      this.listaEtiquetasParaCadastrar.findIndex(x => x.codigo == etiqueta.codigo);
    if (etiquetaSelecionadoIndex !== -1) {
      this.listaEtiquetasParaCadastrar.splice(etiquetaSelecionadoIndex, 1);
    }
    
    this.listaEtiquetas.map(x => {
      if (x.codigo == etiqueta.codigo) {
        x.marcado = false;
      }
    })
  }
}
