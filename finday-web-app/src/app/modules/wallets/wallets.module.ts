import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletsComponent } from './wallets.component';
import { BalanceComponent } from './components/balance/balance.component';



@NgModule({
  declarations: [
    WalletsComponent,
    BalanceComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BalanceComponent
  ]
})
export class WalletsModule { }
