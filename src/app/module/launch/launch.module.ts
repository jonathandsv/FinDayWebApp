import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchComponent } from './launch/launch.component';
import { LaunchRoutingModule } from './launch-routing.module';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LaunchComponent,
  ],
  imports: [
    CommonModule,
    LaunchRoutingModule,
    AppMaterialModule,
    SharedModule,
  ]
})
export class LaunchModule { }
