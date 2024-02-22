import { CommonModule, JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbAccordionModule,
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyDirective } from 'ngx-currency';

import { TableComponent } from '../../shared/components/table/container/table/table.component';
import { OriginListComponent } from './components/origin-list/origin-list.component';
import { OriginFormComponent } from './containers/origin-form/origin-form.component';
import { OriginRoutingModule } from './origin-routing.module';

@NgModule({
  declarations: [
    OriginListComponent,
    OriginFormComponent
  ],
  imports: [
    CommonModule,
    OriginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbAlertModule,
    NgbAccordionModule,
    NgbPopoverModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    JsonPipe,
    TableComponent,
    NgxCurrencyDirective
  ]
})
export class OriginModule { }