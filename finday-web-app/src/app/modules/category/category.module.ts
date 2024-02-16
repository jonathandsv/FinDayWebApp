import { CommonModule, JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbAccordionModule,
  NgbAlertModule,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyDirective } from 'ngx-currency';

import { CustomAdapter, CustomDateParserFormatter } from '../../services/datepicker-adapter.service';
import { CustomDatepickerI18n, I18n } from '../../services/datepicker-i18n.service';
import { TableComponent } from '../../shared/components/table/container/table/table.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './containers/category-form/category-form.component';



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
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
  ],
  providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
	],

})
export class CategoryModule { }
