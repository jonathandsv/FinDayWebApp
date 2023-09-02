import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ComentarioService } from '../comentario.service';
import { IEtiqueta } from '../components/etiquetas/interfaces/etiqueta.interface';
import { IComentario, IRespostaComentario } from '../interfaces/comentario.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {
  @Input() comentario: IComentario | IRespostaComentario;
  @Input() listaEtiquetas: IEtiqueta[];
  @Input() mostraEtiqueta: boolean = true;
  @Output() atualizarListaComentarios = new EventEmitter<any[]>();
  listaEtiquetasCompleta: IEtiqueta[] = [];
  descricao: string = '';
  tamanhoGrande: boolean = false;
  stylesEditor: any;
  mostrarPopover = false;
  mostrarFormRespostaComentario = false;
  codigoRespostaComentarioPai: number = 0;
  codigoUsuario: number;
  nomeUsuario: string;
  nomeUsuarioSeraRespondido: string;
  isOpen: boolean = false;

  constructor(private comentarioService: ComentarioService,
    public fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.$usuario.subscribe({
      next: (resp) => {
        this.codigoUsuario = resp.codigo;
        this.nomeUsuario = resp.nome;
      }
    })
    this.descricao = this.comentario?.descricao;
    this.tamanhoGrande = this.comentario?.descricao.includes('img src="data:image/png;base64');

    if (this.tamanhoGrande) {
      this.stylesEditor = {
        'min-height':'100px',
        'box-shadow': 'rgba(0, 0, 0, 0.15) 0px 2px 6px'
      }
    }
    else {
      this.stylesEditor = {
        'min-height':'40px',
        'box-shadow': 'rgba(0, 0, 0, 0.15) 0px 2px 6px'
      }
    }

    this.listaEtiquetas.map(x => this.listaEtiquetasCompleta.push({
      codigo: x.codigo,
      nome:  x.nome,
      nomeClasse: x.nomeClasse,
      marcado: x.marcado
    }));

    this.listaEtiquetasCompleta.map(x => {
      const etiqueta = this.comentario?.etiquetas?.find(etiq => etiq.codigo == x.codigo)
      if (etiqueta) {
        x.marcado = etiqueta.marcado
      }
    })
  }

  fecharPopoverEtiquetas() {
    this.mostrarPopover = false;
  }

  mostrarPopoverEtiquetas() {
    this.mostrarPopover = true;
  }

  adicionarEtiqueta(etiqueta: IEtiqueta): void {
    this.comentarioService.adicionarEtiqueta(this.comentario.codigo, etiqueta.codigo)
    .subscribe({
      next: (resp) => {
        this.obterEtiquetas();
        this.isOpen = false;
      },
      error: (error) => {

      }
    });
  }

  obterEtiquetas(): void {
    this.comentarioService.obterEtiquetasPorComentario(this.comentario.codigo)
    .subscribe({
      next: (resp) => {this.comentario.etiquetas = resp.data},
      error: (error) => {}
    })
  }

  excluirEtiqueta(etiqueta: IEtiqueta): void {
    this.comentarioService.excluirEtiqueta(this.comentario.codigo, etiqueta.codigo)
    .subscribe({
      next: (resp) => {
        this.obterEtiquetas();
        this.isOpen = false;
      },
      error: (error) => {

      }
    });
  }

  mostrarResponderComentario(codigoComentario: number, codigoRepostaComentarioPai: number, respComentario: any = null): void {
    //mostrar caixa de resposta de comentario
    respComentario.mostrarResponderComentario = true;
    this.codigoRespostaComentarioPai = codigoComentario
    this.mostrarFormRespostaComentario = true;
    this.nomeUsuarioSeraRespondido = `@${this.comentario.nome}`;
  }

  cancelarAdicaoDeComentario(respComentario: any = null) {
    this.codigoRespostaComentarioPai = 0;
    this.mostrarFormRespostaComentario = false;
    respComentario.mostrarResponderComentario = false;
  }

  obterComentariosResposta() {
    this.atualizarListaComentarios.emit();
  }

  mostrarFormResponderComentario(comentario: IComentario | IRespostaComentario) {
    comentario.mostrarResponderComentario = true;
  }

  cancelarAdicaoDeComentarioFechar(comentario: IComentario | IRespostaComentario): void {
    comentario.mostrarResponderComentario = false;
  }
}
