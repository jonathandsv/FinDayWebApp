import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePageComponent } from './basePage.component';

@Component({
  template: '',
})
export abstract class BaseFormComponent
  extends BasePageComponent
  implements OnInit
{
  constructor(public router: Router, public activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }

  ngOnInit() {}
}
