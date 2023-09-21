import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import { MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SharedModule } from 'src/app/shared/shared.module';

import { ExpensesComponent } from './components/expenses/expenses.component';
import { RevenueCardComponent } from './components/revenue-card/revenue-card.component';
import { LaunchComponent } from './launch.component';

const icons: IconDefinition[] = [MenuFoldOutline, MenuUnfoldOutline];



@NgModule({
  declarations: [
    LaunchComponent,
    RevenueCardComponent,
    ExpensesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NzModalModule,
    NzIconModule.forChild(icons),
    SharedModule,
    NzDatePickerModule
  ],
  exports: [
    RevenueCardComponent,
    ExpensesComponent
  ]
})
export class LaunchModule { }
