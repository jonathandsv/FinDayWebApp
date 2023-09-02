import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private menuService: MenuService) {
    this.obterMenu();
  }

  currentPage = '';
  currentMenu = '';
  currentSubMenu = '';
  items: any[] = [];

  ngOnInit(): void {
    this.currentPage = this.router.url;
    this.formatarMenu(this.currentPage);

    this.router.events.subscribe((rota) => {
      if (rota['url']) {
        this.currentPage = rota['url'];
        this.formatarMenu(this.currentPage);
      }
    });

  }

  obterMenu() {
    this.items = [
      { rota: '/', nome: 'Início', subTitle: '', id: 'início', icone: 'fa fa-home icon', ordem: 0 }
    ];

    this.menuService.obterMenu().subscribe({
      next: (resp: any) => {
        if (resp) {
          resp.data.forEach((x: any) => {
            if (x.nome) {
              let agrupadorFuncionalidade = {
                nome: x.nome,
                icone: x.icone,
                ordem: x.ordem,
                funcionalidades: [],
                isExpanded: false
              };

              x.funcionalidades.forEach((f: any) => {
                let funcionalidade: any = {
                  rota: f.rota,
                  nome: f.nome,
                  icone: f.icone,
                  ordem: f.ordem,
                  isSubitem: true
                };

                agrupadorFuncionalidade.funcionalidades.push((funcionalidade as never));
              });

              agrupadorFuncionalidade.funcionalidades.sort((a, b) => a.ordem - b.ordem);
              this.items.push(agrupadorFuncionalidade);
            } else {
              x.funcionalidades.forEach((f) => {
                let funcionalidade = {
                  rota: f.rota,
                  nome: f.nome,
                  icone: f.icone,
                  ordem: f.ordem
                };

                this.items.push(funcionalidade);
              });
            }
          });

          this.items.sort((a, b) => a.ordem - b.ordem);
        }
      }
    });

  }

  toggleSubitems(item: any) {
    if (item.funcionalidades) {
      item.isExpanded = !item.isExpanded;
    } else {
      this.navigateTo(item);
    }
  }

  navigateTo(item: any) {
    if (!item.isSubitem) {
      this.items.forEach((el) => {
        if (el !== item) {
          el.isExpanded = false;
        }
      });
    }
    this.router.navigate([item.rota]);
  }

  isItemActive(item: any) {
    return this.currentPage === item.rota && !item.isSubitem;
  }

  isSubitemActive(item: any) {
    return this.currentPage === item.rota && item.isSubitem;
  }


  formatarMenu(menu: string) {
    this.currentMenu = `/${menu.split('/')[1]}`;
    this.currentSubMenu =
      menu.split('/').length > 2 ? `/${menu.split('/')[2]}` : '';
  }
  verificarPermissao(funcionalidade: string): boolean {
    if (funcionalidade == 'home') {
      return true;
    }
    return this.userService.verificarPermissaoFuncionalidade(funcionalidade)
  }

}
