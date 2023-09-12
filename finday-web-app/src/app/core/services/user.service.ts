import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from 'src/app/shared/models/user';
import { TokenService } from './token.service';

const KEY = 'usuario';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usuario: Usuario = {};

  public usuarioSubject = new BehaviorSubject<Usuario>({});
  constructor(private router: Router, private tokenService: TokenService) {

  }

  get $usuario(): Observable<Usuario> {
    const usuario = this.tokenService.decryptToken();
    this.usuarioSubject.next(usuario);
    this.usuario = usuario;
    return this.usuarioSubject.asObservable();
  }

  sair() {
    this.usuarioSubject.next({});
    this.tokenService.removeToken();
    window.localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  verificarPermissaoAcao(nomefuncionalidade: string, acao: string): boolean {
    // var funcionalidade = this.usuario.perfil.funcionalidades.find(x => this.removeAcento(x.nome) == this.removeAcento(nomefuncionalidade));
    // if (funcionalidade) {
    //   var acao = funcionalidade.acoes.find(x => x == acao);
    //   return acao ? true : false;
    // }
    // return false;
    return true;
  }

  verificarPermissaoFuncionalidade(nomefuncionalidade: string): boolean {
    // var funcionalidade = this.usuario.perfil.funcionalidades.find(x => this.removeAcento(x.nome) == this.removeAcento(nomefuncionalidade));
    // return funcionalidade ? true : false;
    return true;
  }

  removeAcento(text: string): string {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    return text;
  }
}
