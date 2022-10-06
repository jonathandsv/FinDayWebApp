import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchComponent } from './containers/launch/launch.component';
import { LaunchRoutingModule } from './launch-routing.module';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LaunchFormComponent } from './containers/launch-form/launch-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LaunchListComponent } from './components/launch-list/launch-list.component';


@NgModule({
  declarations: [
    LaunchComponent,
    LaunchFormComponent,
    LaunchListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LaunchRoutingModule,
    AppMaterialModule,
    SharedModule,
  ]
})
export class LaunchModule { }
