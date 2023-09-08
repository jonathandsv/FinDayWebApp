import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { WalletsModule } from '../wallets/wallets.module';
import { PlanModule } from '../plan/plan.module';
import { LaunchModule } from '../launch/launch.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    WalletsModule,
    PlanModule,
    LaunchModule
  ]
})
export class HomeModule { }
