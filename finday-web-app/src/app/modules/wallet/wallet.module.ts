import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { WalletFormComponent } from './containers/wallet-form/wallet-form.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule, NgbAlertModule, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDatepickerModule, NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from '../../shared/components/table/container/table/table.component';
import { NgxCurrencyDirective } from 'ngx-currency';
import { WalletListComponent } from './components/wallet-list/wallet-list.component';
import { CustomAdapter, CustomDateParserFormatter } from '../../services/datepicker-adapter.service';
import { CustomDatepickerI18n, I18n } from '../../services/datepicker-i18n.service';



@NgModule({
  declarations: [
    WalletFormComponent,
    WalletListComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    WalletRoutingModule,
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
export class WalletModule { }