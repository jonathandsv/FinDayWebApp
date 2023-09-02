import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-titulo-novo',
  templateUrl: './titulo-novo.component.html',
  styleUrls: ['./titulo-novo.component.scss'],
})
export class TituloNovoComponent implements OnInit {
  @Input() mostrarBotao = false;
  @Input() mostrarBotaoVincularRespons = false;
  tituloPage = '';
  routerLink = '';
  isListar = false;

  @Input() botaoLabel: string = '';
  @Input() botaoAcao: string = '';
  @Input() botaoRota: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.tituloPage = this.activatedRoute.routeConfig
      ? this.activatedRoute.routeConfig.data.titulo
      : '';

    this.routerLink = this.router.url;

    this.isListar = this.activatedRoute.routeConfig
      ? this.activatedRoute.routeConfig.data.breadcrumb === 'listar'
        ? true
        : false
      : false;

      if(this.isListar && !this.botaoLabel && !this.botaoAcao && !this.botaoRota) {
        this.botaoLabel = 'Novo';
        this.botaoAcao = "adicionar";
        this.botaoRota = 'cadastrar';
      }
  }

  redirecionar() {
    this.router.navigate([`${this.routerLink}/${this.botaoRota}`]);
  }

  redirectPageVincularResponsavel() {
    this.router.navigate([`/responsavel-sistema`]);
  }
}
