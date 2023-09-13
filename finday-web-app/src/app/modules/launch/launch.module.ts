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

const icons: IconDefinition[] = [MenuFoldOutline, MenuUnfoldOutline];



@NgModule({
  declarations: [
    LaunchComponent,
    RevenueCardComponent,
    ExpensesComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzIconModule.forChild(icons)
  ],
  exports: [
    RevenueCardComponent,
    ExpensesComponent
  ]
})
export class LaunchModule { }
