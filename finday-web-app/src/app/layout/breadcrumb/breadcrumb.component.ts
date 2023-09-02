import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { formatarBreadcrumb } from 'src/app/shared/utils/formatarBreadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbPage = '';

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    this.breadcrumbPage = formatarBreadcrumb(this.router.url);

    this.router.events.subscribe((rota) => {
      if (rota['url']) {
        this.breadcrumbPage = formatarBreadcrumb(rota['url']);
      }
    });
  }

  handleVoltar() {
    this.location.back();
  }
}
