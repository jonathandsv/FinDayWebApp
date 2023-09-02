import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { ProfissionalService } from 'src/app/modules/private/profissional/profissional.service';
import { Usuario } from 'src/app/shared/models/user';
import { IFiltro, limparFiltroSalvo } from 'src/app/shared/ngrx/reducers/filtro.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  usuario$: Observable<Usuario>;
  imagemPerfil: string = '';

  constructor(private userService: UserService, private store: Store<{ filtro: IFiltro }>,
    private profissionalService: ProfissionalService,) {
    this.usuario$ = this.userService.$usuario;

  }

  ngOnInit(): void {
    // this.profissionalService.obterMeusDados().subscribe({
    //   next: (resp) => {
    //     if (resp.data.base64) {
    //       this.imagemPerfil = resp.data.base64
    //     }
    //   }
    // })
  }

  toogleMenu() {
    if ($('#content').hasClass('col-sm-12')) {
      $('#content').addClass('col-sm-10');
      $('#content').removeClass('col-sm-12');
    } else {
      $('#content').removeClass('col-sm-10');
      $('#content').addClass('col-sm-12');
    }
  }

  sair(){
    this.store.dispatch(limparFiltroSalvo());
    this.userService.sair();
  }
  helpNavegation() {
    window.open('/manual/', '_blank');
  }
}
