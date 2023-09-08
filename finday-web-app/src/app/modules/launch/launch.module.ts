import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchComponent } from './launch.component';
import { RevenueCardComponent } from './components/revenue-card/revenue-card.component';
import { ExpensesComponent } from './components/expenses/expenses.component';



@NgModule({
  declarations: [
    LaunchComponent,
    RevenueCardComponent,
    ExpensesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RevenueCardComponent,
    ExpensesComponent
  ]
})
export class LaunchModule { }
