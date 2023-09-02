import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';

import { ComentarioService } from './comentario.service';
import { IEtiqueta } from './components/etiquetas/interfaces/etiqueta.interface';
import { IComentador, IComentario, IComentarioOutput } from './interfaces/comentario.interface';
import { ApiOutput } from 'src/app/core/interfaces/api-output.inteface';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  @Input() codigoTarefa: number = 0;
  @Input() podeAdicionar: boolean = false;
  listaEtiquetas: IEtiqueta[];
  comentarios: IComentario[] = [];
  comentadores: IComentador[] = [];
  codigoUsuario: number;
  nomeUsuario: string;
  primeiraIteracao = true;

  constructor(
    private userService: UserService,
    private comentarioService: ComentarioService
  ) {
    this.userService.$usuario.subscribe({
      next: (resp) => {
        this.codigoUsuario = resp.codigo;
        this.nomeUsuario = resp.nome;
      }
    })
  }

  ngOnInit(): void {
    const result$ = this.comentarioService
      .obterEtiquetasPadrao()
      .pipe(
        switchMap(value => {
          this.listaEtiquetas = value.data;
        return this.comentarioService.obterComentarioPorCodigoTarefa(this.codigoTarefa);
      }));

      result$.subscribe({
        next: (resp) => {
          this.formatarComentarios(resp);
      }});
  }

  private formatarComentarios(resp: ApiOutput<IComentarioOutput>) {
    this.primeiraIteracao = true;
    this.comentarios = resp.data?.comentarios;
    this.comentadores = resp.data?.comentadores;

    this.obterComentador(this.comentarios);
    this.marcarRespostas(this.comentarios);
    this.comentarios.map(x => x.eResposta = false);
  }

  marcarRespostas(comentarios: IComentario[]) {
    
    comentarios.map(x => {
      
      x.eResposta = true;
      
      if (x.respostaComentario) {
        x.temResposta = true;
        this.marcarRespostas(x.respostaComentario);
      }
    })
  }

  obterComentador(comentarios: any) {
    comentarios.map(x => {
      var comentador = this.comentadores.find(y => y.codigo == x.codigoProfissional);
      x.comentador = comentador;

      if (x.respostaComentario) {
        this.obterComentador(x.respostaComentario);
      }
    })
  }

  obterComentarios() {
    this.comentarioService.obterComentarioPorCodigoTarefa(this.codigoTarefa)
    .subscribe({
      next: (resp) => {
        this.formatarComentarios(resp);
      },
      error: (error) => {

      }
    })
  }
}
