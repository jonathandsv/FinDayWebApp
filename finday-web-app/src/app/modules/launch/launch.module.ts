import { CommonModule, JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { LaunchRoutingModule } from './launch-routing.module';
import { LaunchListComponent } from './components/launch-list/launch-list.component';
import { LaunchFormComponent } from './containers/launch-form/launch-form.component';
import { LaunchComponent } from './launch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule, NgbAlertModule, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDatepickerModule, NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from '../../services/datepicker-adapter.service';
import { CustomDatepickerI18n, I18n } from '../../services/datepicker-i18n.service';

@NgModule({
  declarations: [
    LaunchComponent,
    LaunchListComponent,
    LaunchFormComponent
  ],
  imports: [
    CommonModule,
    LaunchRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbAlertModule,
    NgbAccordionModule,
    NgbPopoverModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    JsonPipe,
  ],
  providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
	],
})
export class LaunchModule { }
