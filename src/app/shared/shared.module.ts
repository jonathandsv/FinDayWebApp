import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material/app-material.module';
import { PaymentPipe } from './pipes/payment.pipe';



@NgModule({
  declarations: [
    PaymentPipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    PaymentPipe
  ]
})
export class SharedModule { }
