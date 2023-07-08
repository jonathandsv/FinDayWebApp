import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { LaunchListComponent } from './components/launch-list/launch-list.component';
import { LaunchFormComponent } from './containers/launch-form/launch-form.component';
import { LaunchComponent } from './containers/launch/launch.component';
import { LaunchRoutingModule } from './launch-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LaunchComponent,
    LaunchFormComponent,
    LaunchListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    LaunchRoutingModule,
    AppMaterialModule,
    SharedModule,
  ]
})
export class LaunchModule { }
