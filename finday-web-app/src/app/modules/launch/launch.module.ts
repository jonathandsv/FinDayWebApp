import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchComponent } from './launch.component';
import { RevenueCardComponent } from './components/revenue-card/revenue-card.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  exports: [
    RevenueCardComponent,
    ExpensesComponent
  ]
})
export class LaunchModule { }
