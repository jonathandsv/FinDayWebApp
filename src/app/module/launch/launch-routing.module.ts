import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchFormComponent } from './containers/launch-form/launch-form.component';
import { LaunchComponent } from './containers/launch/launch.component';

const routes: Routes = [
  {
    path: '',
    component: LaunchComponent
  },
  {
    path: 'new',
    component: LaunchFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaunchRoutingModule { }