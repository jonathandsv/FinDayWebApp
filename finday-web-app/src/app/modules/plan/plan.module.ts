import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanComponent } from './plan.component';
import { PlansCardComponent } from './components/plans-card/plans-card.component';



@NgModule({
  declarations: [
    PlanComponent,
    PlansCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlansCardComponent
  ]
})
export class PlanModule { }
